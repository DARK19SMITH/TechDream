"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Clock, Calendar, ChevronLeft, Share2, 
  BookOpen, Tag, MessageSquare
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Article } from "@/lib/supabase";

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setIsLoading(false);
        
        // Incrémenter les stats de lecture
        fetch("/api/stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stat_id: "articles_views", increment: 1 }),
        });
      });
  }, [id]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-[#0066ff]/30 border-t-[#0066ff] rounded-full animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="font-orbitron text-4xl font-bold text-[#0a1628] mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-8 font-rajdhani text-lg">L&apos;article que vous recherchez n&apos;existe pas ou a été déplacé.</p>
          <Link href="/conseils" className="btn-tech">
            Retour aux conseils
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-40 pb-16 bg-[#0a1628] overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/conseils"
            className="inline-flex items-center gap-2 text-[#00d4ff] hover:text-white transition-colors mb-8 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Retour aux conseils
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-1.5 rounded-full bg-[#0066ff] text-white text-sm font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(article.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </div>

              <h1 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-8 leading-tight flex flex-col md:flex-row md:items-center justify-between gap-4">
                {article.title}
                {article.price > 0 && (
                  <span className="text-[#00d4ff] text-3xl md:text-4xl font-bold whitespace-nowrap">
                    {article.price}€
                  </span>
                )}
              </h1>

            <div className="flex items-center justify-between border-t border-white/10 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066ff] to-[#00d4ff] flex items-center justify-center text-white font-bold">
                  TD
                </div>
                <div>
                  <div className="text-white font-medium">L&apos;équipe Tech Dream</div>
                  <div className="text-gray-400 text-sm">Experts Tech</div>
                </div>
              </div>
              <button className="p-2 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-[#00d4ff] transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {article.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl"
            >
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none prose-headings:font-orbitron prose-headings:text-[#0a1628] prose-p:text-gray-600 prose-p:font-rajdhani prose-p:text-xl prose-strong:text-[#0a1628]"
          >
            {article.content.split('\n').map((paragraph, i) => (
              paragraph.trim() && <p key={i} className="mb-6 leading-relaxed">{paragraph}</p>
            ))}
          </motion.div>

          <div className="mt-20 p-8 rounded-3xl bg-gray-50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-orbitron text-2xl font-bold text-[#0a1628] mb-2">Vous avez aimé cet article ?</h3>
              <p className="text-gray-600 font-rajdhani text-lg">Partagez vos impressions ou contactez nos experts.</p>
            </div>
            <Link href="/contact" className="btn-tech">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
