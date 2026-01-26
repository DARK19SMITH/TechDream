"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, Search, Clock, CheckCircle2, XCircle, 
  MapPin, Phone, User, Package, Trash2, ExternalLink
} from "lucide-react";
import { Order, supabase } from "@/lib/supabase";

export default function AdminCommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setOrders(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: Order["status"]) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      alert("Erreur lors de la mise à jour du statut");
    } else {
      fetchOrders();
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (confirm("Supprimer cette commande ?")) {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);
      
      if (error) alert("Erreur lors de la suppression");
      else fetchOrders();
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.product?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-600";
      case "completed": return "bg-green-100 text-green-600";
      case "cancelled": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0066ff]/30 border-t-[#0066ff] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8 bg-gray-50/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-orbitron text-3xl font-bold text-[#0a1628] mb-2 flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-[#0066ff]" />
          Gestion des Commandes
        </h1>
        <p className="text-gray-600 font-rajdhani">
          {orders.length} commandes reçues au total
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-col sm:flex-row gap-4"
      >
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par client ou produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0066ff] outline-none transition-all font-rajdhani bg-white"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
                  <img src={order.product?.image || ""} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0a1628] flex items-center gap-2">
                    {order.product?.name || "Produit supprimé"}
                    <span className="text-xs font-normal text-gray-400">#{order.id.slice(0, 8)}</span>
                  </h3>
                  <p className="text-[#0066ff] font-bold">{order.total_price} FCFA</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                {order.status === "pending" ? "En attente" : order.status === "completed" ? "Livré" : "Annulé"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600 text-sm font-rajdhani">
                  <User className="w-4 h-4 text-[#0066ff]" />
                  <span className="font-semibold">{order.customer_name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm font-rajdhani">
                  <Phone className="w-4 h-4 text-[#0066ff]" />
                  <a href={`tel:${order.customer_phone}`} className="hover:text-[#0066ff] underline">{order.customer_phone}</a>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-gray-600 text-sm font-rajdhani">
                  <MapPin className="w-4 h-4 text-[#0066ff] mt-0.5" />
                  <span className="line-clamp-2">{order.delivery_location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <Clock className="w-4 h-4" />
                  {new Date(order.created_at).toLocaleString("fr-FR")}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateStatus(order.id, "completed")}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors text-sm font-medium"
                >
                  <CheckCircle2 className="w-4 h-4" /> Terminer
                </button>
                <button
                  onClick={() => updateStatus(order.id, "cancelled")}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  <XCircle className="w-4 h-4" /> Annuler
                </button>
              </div>
              <button
                onClick={() => deleteOrder(order.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-20">
          <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 font-rajdhani text-lg">Aucune commande trouvée</p>
        </div>
      )}
    </div>
  );
}
