"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Monitor, Laptop, Gamepad2, Briefcase, Package, 
  Search, Filter, ShoppingCart, Check, X
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Product } from "@/lib/supabase";

const categories = [
  { id: "all", label: "Tous", icon: Package },
  { id: "pc", label: "PC Bureau", icon: Monitor },
  { id: "laptop", label: "Laptops", icon: Laptop },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "professionnel", label: "Pro", icon: Briefcase },
];

export default function BoutiquePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "all" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-24 pb-16 bg-gradient-to-br from-[#0a1628] via-[#0d2847] to-[#0a1628] overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-30" />
        <div className="absolute inset-0 hex-pattern opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-4">
              Notre <span className="text-[#00d4ff]">Boutique</span>
            </h1>
            <p className="text-xl text-gray-300 font-rajdhani max-w-2xl mx-auto">
              Découvrez notre sélection de PC, laptops et équipements informatiques haute performance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-[#0066ff]/30 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00d4ff] transition-colors font-rajdhani text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-tech">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-[#0066ff] to-[#0099ff] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-[#0066ff]/10 hover:text-[#0066ff]"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-[#f0f7ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#0066ff]/30 border-t-[#0066ff] rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-600 font-rajdhani">
                  <span className="font-semibold text-[#0066ff]">{filteredProducts.length}</span> produits trouvés
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-orbitron text-xl text-gray-600 mb-2">Aucun produit trouvé</h3>
                  <p className="text-gray-500">Essayez une autre recherche ou catégorie</p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card-tech group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden rounded-t-xl">
        <img
          src={product.image || ""}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/30 to-transparent" />
        
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#0066ff] text-white text-xs font-bold uppercase">
            {product.category}
          </span>
          {product.in_stock ? (
            <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold flex items-center gap-1">
              <Check className="w-3 h-3" /> En stock
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center gap-1">
              <X className="w-3 h-3" /> Rupture
            </span>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <div className="flex flex-wrap gap-2">
            {product.specs?.slice(0, 3).map((spec, i) => (
              <span key={i} className="px-2 py-1 rounded bg-[#00d4ff]/20 text-[#00d4ff] text-xs font-medium">
                {spec}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="font-orbitron text-xl font-semibold text-[#0a1628] mb-2 group-hover:text-[#0066ff] transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 font-rajdhani mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="font-orbitron text-3xl font-bold text-[#0066ff]">
              {product.price}€
            </span>
          </div>
          <button 
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
              product.in_stock 
                ? "bg-gradient-to-r from-[#0066ff] to-[#0099ff] text-white hover:shadow-lg hover:shadow-[#0066ff]/30"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!product.in_stock}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.in_stock ? "Ajouter" : "Indisponible"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
