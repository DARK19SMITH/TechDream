"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FileText, Lightbulb, TrendingUp, Eye, 
  Plus, ArrowRight, Calendar, Clock
} from "lucide-react";
import { getAllArticles } from "@/lib/store";

export default function AdminDashboard() {
  const articles = getAllArticles();
  const publishedCount = articles.filter(a => a.published).length;
  const conseilsCount = articles.filter(a => a.category === "conseil").length;
  const recentArticles = articles.slice(0, 5);

  const stats = [
    { 
      label: "Articles publiés", 
      value: publishedCount, 
      icon: FileText, 
      color: "from-[#0066ff] to-[#0099ff]",
      change: "+12%"
    },
    { 
      label: "Conseils", 
      value: conseilsCount, 
      icon: Lightbulb, 
      color: "from-[#00d4ff] to-[#0066ff]",
      change: "+8%"
    },
    { 
      label: "Vues totales", 
      value: "12.4K", 
      icon: Eye, 
      color: "from-[#0099ff] to-[#00d4ff]",
      change: "+24%"
    },
    { 
      label: "Croissance", 
      value: "+34%", 
      icon: TrendingUp, 
      color: "from-[#0066ff] to-[#00d4ff]",
      change: "Ce mois"
    },
  ];

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-orbitron text-3xl font-bold text-[#0a1628] mb-2">
          Tableau de bord
        </h1>
        <p className="text-gray-600 font-rajdhani">
          Bienvenue dans votre espace d&apos;administration Tech Dream
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-tech p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="font-orbitron text-3xl font-bold text-[#0a1628] mb-1">
              {stat.value}
            </div>
            <div className="text-gray-500 font-rajdhani">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 card-tech p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-orbitron text-xl font-semibold text-[#0a1628]">
              Articles récents
            </h2>
            <Link 
              href="/admin/articles" 
              className="text-[#0066ff] hover:text-[#00d4ff] font-medium text-sm flex items-center gap-1"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentArticles.map((article) => (
              <div 
                key={article.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-[#0066ff]/5 transition-colors"
              >
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#0a1628] truncate">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      article.category === "conseil" ? "bg-[#0066ff]/10 text-[#0066ff]" :
                      article.category === "actualite" ? "bg-[#00d4ff]/10 text-[#00d4ff]" :
                      "bg-purple-100 text-purple-600"
                    }`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  article.published 
                    ? "bg-green-100 text-green-600" 
                    : "bg-yellow-100 text-yellow-600"
                }`}>
                  {article.published ? "Publié" : "Brouillon"}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-tech p-6"
        >
          <h2 className="font-orbitron text-xl font-semibold text-[#0a1628] mb-6">
            Actions rapides
          </h2>

          <div className="space-y-4">
            <Link 
              href="/admin/articles"
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#0099ff] text-white hover:shadow-lg hover:shadow-[#0066ff]/30 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <span className="font-semibold">Nouvel article</span>
                <p className="text-xs text-white/80">Créer un nouveau contenu</p>
              </div>
            </Link>

            <Link 
              href="/admin/conseils"
              className="flex items-center gap-4 p-4 rounded-xl border border-[#0066ff]/20 text-[#0a1628] hover:bg-[#0066ff]/5 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-[#00d4ff]" />
              </div>
              <div>
                <span className="font-semibold">Gérer conseils</span>
                <p className="text-xs text-gray-500">Modifier les conseils IT</p>
              </div>
            </Link>

            <Link 
              href="/"
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 text-[#0a1628] hover:bg-gray-50 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Eye className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <span className="font-semibold">Voir le site</span>
                <p className="text-xs text-gray-500">Aperçu public</p>
              </div>
            </Link>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[#0066ff]/5 border border-[#0066ff]/10">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#0066ff]" />
              <span className="text-sm font-medium text-[#0a1628]">Dernière connexion</span>
            </div>
            <p className="text-xs text-gray-500">Aujourd&apos;hui à {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
