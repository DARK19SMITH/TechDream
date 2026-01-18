"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Cpu, Monitor, Laptop, Gamepad2, Shield, Zap, 
  ChevronRight, ArrowRight, Star, Clock, Users,
  Sparkles, CircuitBoard, Server, Cloud
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CircuitBackground } from "@/components/CircuitBackground";
import { ParticleEffect } from "@/components/ParticleEffect";
import { getProducts, getArticles } from "@/lib/store";

const features = [
  { icon: Monitor, title: "PC Haute Performance", desc: "Configurations sur mesure pour tous vos besoins" },
  { icon: Laptop, title: "Laptops Premium", desc: "Mobilité et puissance réunies" },
  { icon: Gamepad2, title: "Gaming Elite", desc: "Setup gaming de compétition" },
  { icon: Shield, title: "Sécurité Maximale", desc: "Protection avancée de vos données" },
];

const stats = [
  { value: "10K+", label: "Clients satisfaits", icon: Users },
  { value: "500+", label: "Produits vendus", icon: Monitor },
  { value: "24/7", label: "Support technique", icon: Clock },
  { value: "5★", label: "Note moyenne", icon: Star },
];

export default function HomePage() {
  const products = getProducts().slice(0, 3);
  const articles = getArticles().slice(0, 3);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <CircuitBackground />
        <ParticleEffect />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-20 pointer-events-none" />

        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0066ff]/20 border border-[#0066ff]/30 mb-8">
              <Sparkles className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-[#00d4ff] text-sm font-medium">Innovation technologique 2026</span>
            </div>

            <h1 className="font-orbitron text-5xl md:text-7xl font-bold text-white mb-6 text-glow">
              <span className="block">Bienvenue chez</span>
              <span className="bg-gradient-to-r from-[#0066ff] via-[#00d4ff] to-[#0066ff] bg-clip-text text-transparent">
                Tech Dream
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-rajdhani">
              Votre destination ultime pour des solutions informatiques innovantes.
              Performance, fiabilité et expertise au service de votre réussite.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/boutique" className="btn-tech text-lg px-8 py-4 flex items-center gap-2">
                Découvrir la boutique
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/conseils" 
                className="px-8 py-4 rounded-lg border border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all font-semibold flex items-center gap-2"
              >
                Nos conseils
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <div key={i} className="glass-dark rounded-xl p-6 text-center">
                <stat.icon className="w-8 h-8 text-[#00d4ff] mx-auto mb-3" />
                <div className="font-orbitron text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-[#0a1628] mb-4">
              Nos <span className="text-[#0066ff]">Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-rajdhani">
              Des solutions technologiques adaptées à tous vos besoins
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-tech p-8 group"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0066ff] to-[#00d4ff] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-orbitron text-xl font-semibold text-[#0a1628] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-rajdhani text-lg">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#f0f7ff] to-white relative overflow-hidden">
        <div className="absolute inset-0 hex-pattern opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="font-orbitron text-4xl font-bold text-[#0a1628] mb-2">
                Produits <span className="text-[#0066ff]">Vedettes</span>
              </h2>
              <p className="text-gray-600 font-rajdhani text-lg">Notre sélection du moment</p>
            </div>
            <Link href="/boutique" className="btn-tech hidden sm:flex items-center gap-2">
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-tech group overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#0066ff] text-white text-xs font-medium uppercase">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-orbitron text-xl font-semibold text-[#0a1628] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 font-rajdhani mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-orbitron text-2xl font-bold text-[#0066ff]">
                      {product.price}€
                    </span>
                    <Link 
                      href="/boutique"
                      className="px-4 py-2 rounded-lg bg-[#0066ff]/10 text-[#0066ff] hover:bg-[#0066ff] hover:text-white transition-colors font-medium"
                    >
                      Voir détails
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Link href="/boutique" className="btn-tech mt-8 mx-auto sm:hidden flex items-center gap-2 w-fit">
            Voir tous les produits
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-24 tech-gradient relative overflow-hidden">
        <div className="absolute inset-0 data-grid opacity-30" />
        <ParticleEffect />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
                Pourquoi choisir <span className="text-[#00d4ff]">Tech Dream</span> ?
              </h2>
              <p className="text-xl text-gray-300 mb-8 font-rajdhani leading-relaxed">
                Nous combinons expertise technique et passion pour l&apos;innovation afin de vous offrir 
                les meilleures solutions informatiques du marché.
              </p>

              <div className="space-y-6">
                {[
                  { icon: CircuitBoard, text: "Composants de dernière génération" },
                  { icon: Zap, text: "Performance optimale garantie" },
                  { icon: Server, text: "Support technique expert 24/7" },
                  { icon: Cloud, text: "Solutions cloud intégrées" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#0066ff]/20 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-[#00d4ff]" />
                    </div>
                    <span className="text-white font-rajdhani text-lg">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <Link href="/services" className="btn-tech mt-10 inline-flex items-center gap-2">
                Découvrir nos services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden blue-glow">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"
                  alt="Tech Innovation"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0066ff]/30 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-xl bg-gradient-to-br from-[#0066ff] to-[#00d4ff] flex items-center justify-center animate-float">
                <Cpu className="w-16 h-16 text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="font-orbitron text-4xl font-bold text-[#0a1628] mb-2">
                Derniers <span className="text-[#0066ff]">Conseils</span>
              </h2>
              <p className="text-gray-600 font-rajdhani text-lg">Restez informé des dernières tendances</p>
            </div>
            <Link href="/conseils" className="btn-tech hidden sm:flex items-center gap-2">
              Tous les articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-tech group overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#00d4ff] text-[#0a1628] text-xs font-bold uppercase">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Clock className="w-4 h-4" />
                    {new Date(article.date).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                  <h3 className="font-orbitron text-lg font-semibold text-[#0a1628] mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <Link 
                    href="/conseils"
                    className="text-[#0066ff] hover:text-[#00d4ff] font-medium flex items-center gap-1 transition-colors"
                  >
                    Lire plus
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-[#0066ff] to-[#00d4ff] relative overflow-hidden">
        <div className="absolute inset-0 hex-pattern opacity-20" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">
              Prêt à transformer votre expérience tech ?
            </h2>
            <p className="text-xl text-white/90 mb-10 font-rajdhani">
              Contactez-nous dès aujourd&apos;hui et découvrez comment nous pouvons vous aider
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white text-[#0066ff] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Nous contacter
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/boutique" 
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Voir nos produits
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
