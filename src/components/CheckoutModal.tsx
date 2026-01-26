"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, User, CheckCircle2, Loader2 } from "lucide-react";
import { Product } from "@/lib/supabase";

interface CheckoutModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    nom: "",
    prenoms: "",
    telephone: "",
    lieu: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: product.id,
          customer_name: `${formData.nom} ${formData.prenoms}`,
          customer_phone: formData.telephone,
          delivery_location: formData.lieu,
          total_price: product.price,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setFormData({ nom: "", prenoms: "", telephone: "", lieu: "" });
        }, 3000);
      }
    } catch (error) {
      console.error("Erreur lors de la commande:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {isSuccess ? (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </motion.div>
                <h2 className="font-orbitron text-2xl font-bold text-[#0a1628] mb-2">
                  Commande Confirmée !
                </h2>
                <p className="text-gray-600 font-rajdhani text-lg">
                  Merci {formData.nom}. Votre commande pour le {product.name} a été enregistrée. 
                  Nous vous contacterons sous peu.
                </p>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
                    <img src={product.image || ""} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="font-orbitron text-xl font-bold text-[#0a1628]">Confirmer la commande</h2>
                    <p className="text-[#0066ff] font-bold text-lg">{product.price} FCFA</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4" /> Nom
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0066ff] transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <User className="w-4 h-4" /> Prénoms
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.prenoms}
                        onChange={(e) => setFormData({ ...formData, prenoms: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0066ff] transition-colors"
                        placeholder="Vos prénoms"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Numéro de téléphone
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0066ff] transition-colors"
                      placeholder="01 02 03 04 05"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Lieu de livraison
                    </label>
                    <textarea
                      required
                      value={formData.lieu}
                      onChange={(e) => setFormData({ ...formData, lieu: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0066ff] transition-colors h-24 resize-none"
                      placeholder="Adresse exacte de livraison..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#0099ff] text-white font-bold text-lg hover:shadow-lg hover:shadow-[#0066ff]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Traitement...
                      </>
                    ) : (
                      "Confirmer la commande"
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
