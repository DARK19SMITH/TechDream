"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Image as ImageIcon, Lightbulb, CheckCircle2 } from "lucide-react";
import { Product } from "@/lib/supabase";

interface ProductDetailsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onOrder: () => void;
}

export function ProductDetailsModal({ product, isOpen, onClose, onOrder }: ProductDetailsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100 transition-colors shadow-sm"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="overflow-y-auto flex-1 scrollbar-tech">
              <div className="relative h-72 md:h-96">
                <img src={product.image || ""} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-2">{product.name}</h2>
                  <p className="font-orbitron text-2xl font-bold text-[#00d4ff]">{product.price} FCFA</p>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-12">
                {/* Description & Specs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-orbitron text-xl font-bold text-[#0a1628] mb-4 flex items-center gap-2">
                      Description
                    </h3>
                    <p className="text-gray-600 font-rajdhani text-lg leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-orbitron text-xl font-bold text-[#0a1628] mb-4">Caractéristiques</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {product.specs?.map((spec, i) => (
                        <div key={i} className="flex items-center gap-3 text-gray-700">
                          <CheckCircle2 className="w-5 h-5 text-[#0066ff]" />
                          <span className="font-rajdhani text-lg">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Gallery */}
                {product.gallery && product.gallery.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="font-orbitron text-xl font-bold text-[#0a1628] flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-[#0066ff]" /> Galerie Photos
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {product.gallery.map((img, i) => (
                        <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                          <img 
                            src={img} 
                            alt={`${product.name} gallery ${i}`} 
                            className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Videos */}
                {product.videos && product.videos.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="font-orbitron text-xl font-bold text-[#0a1628] flex items-center gap-2">
                      <Play className="w-5 h-5 text-[#0066ff]" /> Vidéos de démonstration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.videos.map((video, i) => (
                        <div key={i} className="aspect-video rounded-xl overflow-hidden bg-gray-100 relative group">
                           {/* Using iframe for youtube/vimeo or video tag for direct files */}
                           {video.includes('youtube.com') || video.includes('youtu.be') ? (
                             <iframe 
                               src={video.replace('watch?v=', 'embed/')} 
                               className="w-full h-full" 
                               allowFullScreen
                             />
                           ) : (
                             <video src={video} controls className="w-full h-full object-cover" />
                           )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {product.recommendations && (
                  <div className="p-6 md:p-8 bg-[#0066ff]/5 rounded-2xl border border-[#0066ff]/10">
                    <h3 className="font-orbitron text-xl font-bold text-[#0a1628] mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500" /> Recommandations d&apos;utilisation
                    </h3>
                    <p className="text-gray-700 font-rajdhani text-lg whitespace-pre-wrap">
                      {product.recommendations}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="text-center md:text-left">
                <p className="text-gray-500 font-rajdhani">Besoin de ce PC ?</p>
                <p className="font-orbitron text-2xl font-bold text-[#0066ff]">{product.price} FCFA</p>
              </div>
              <button
                onClick={() => {
                  onOrder();
                  onClose();
                }}
                className="w-full md:w-auto px-12 py-4 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#0099ff] text-white font-bold text-lg hover:shadow-lg hover:shadow-[#0066ff]/30 transition-all"
              >
                Commander maintenant
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
