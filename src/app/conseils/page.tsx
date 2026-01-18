"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, Lightbulb, Newspaper, Clock, Search, 
  ChevronRight, Tag, Calendar
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Article } from "@/lib/supabase";

const categories = [
  { id: "all", label: "Tous", icon: BookOpen },
  { id: "conseil", label: "Conseils", icon: Lightbulb },
  { id: "actualite", label: "Actualités", icon: Newspaper },
  { id: "astuce", label: "Astuces", icon: Tag },
];

export default function ConseilsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
      .then(res => res.json())
      .then(data => {
        const published = data.filter((a: Article) => a.published);
        setArticles(published);
        setIsLoading(false);
      });
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles[0];
  const otherArticles = filteredArticles.slice(1);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-24 pb-16 bg-gradient-to-br from-[#0a1628] via-[#0d2847] to-[#0a1628] overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-30" />
        <div className="absolute inset-0 data-grid opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-4">
              Conseils <span className="text-[#00d4ff]">Informatiques</span>
            </h1>
            <p className="text-xl text-gray-300 font-rajdhani max-w-2xl mx-auto">
              Articles, astuces et actualités pour optimiser votre expérience technologique
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
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-[#0066ff]/30 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#00d4ff] transition-colors font-rajdhani text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
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
              {featuredArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-16"
                >
                  <div className="card-tech overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative h-64 lg:h-auto">
                        <img
                          src={featuredArticle.image || ""}
                          alt={featuredArticle.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/50 to-transparent lg:bg-gradient-to-t" />
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-2 rounded-full bg-[#00d4ff] text-[#0a1628] text-sm font-bold uppercase">
                            À la une
                          </span>
                        </div>
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="px-3 py-1 rounded-full bg-[#0066ff]/10 text-[#0066ff] text-sm font-medium capitalize">
                            {featuredArticle.category}
                          </span>
                          <span className="flex items-center gap-1 text-gray-500 text-sm">
                            <Calendar className="w-4 h-4" />
                            {new Date(featuredArticle.created_at).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <h2 className="font-orbitron text-2xl lg:text-3xl font-bold text-[#0a1628] mb-4">
                          {featuredArticle.title}
                        </h2>
                        <p className="text-gray-600 font-rajdhani text-lg mb-6 line-clamp-3">
                          {featuredArticle.content}
                        </p>
                        <button className="btn-tech w-fit flex items-center gap-2">
                          Lire l&apos;article
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherArticles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} />
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-orbitron text-xl text-gray-600 mb-2">Aucun article trouvé</h3>
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

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const categoryColors: Record<string, string> = {
    conseil: "bg-[#0066ff] text-white",
    actualite: "bg-[#00d4ff] text-[#0a1628]",
    astuce: "bg-purple-500 text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card-tech group overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image || ""}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${categoryColors[article.category] || categoryColors.conseil}`}>
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <Clock className="w-4 h-4" />
          {new Date(article.created_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </div>
        <h3 className="font-orbitron text-lg font-semibold text-[#0a1628] mb-3 line-clamp-2 group-hover:text-[#0066ff] transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 font-rajdhani mb-4 line-clamp-2">
          {article.content}
        </p>
        <button className="text-[#0066ff] hover:text-[#00d4ff] font-medium flex items-center gap-1 transition-colors">
          Lire plus
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
