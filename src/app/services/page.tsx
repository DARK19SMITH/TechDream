"use client";

import { motion } from "framer-motion";
import { 
  Wrench, Shield, Zap, Cloud, Monitor, Headphones,
  CheckCircle, Phone, Mail, Palette, Video, Printer
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Infographie & Design",
    description: "Création visuelle professionnelle pour votre communication de marque.",
    features: ["Adobe Photoshop", "Adobe Illustrator", "Logos & Identité visuelle", "Supports publicitaires"],
    color: "from-[#ff0099] to-[#ff6600]",
  },
  {
    icon: Video,
    title: "Montage Vidéo",
    description: "Production et montage vidéo professionnel pour vos projets.",
    features: ["Adobe Premiere Pro", "Colorimétrie", "Transitions dynamiques", "Export haute résolution"],
    color: "from-[#6600ff] to-[#0066ff]",
  },
  {
    icon: Printer,
    title: "Sérigraphie",
    description: "Services de marquage et d'impression sur divers supports.",
    features: ["Impression textile", "Personnalisation", "Petites séries", "Qualité durable"],
    color: "from-[#00cc66] to-[#0066ff]",
  },
  {
    icon: Wrench,
    title: "Maintenance Informatique",
    description: "Réparation, mise à jour et entretien de vos équipements pour une performance optimale.",
    features: ["Diagnostic complet", "Réparation matérielle", "Mise à jour logicielle", "Nettoyage système"],
    color: "from-[#0066ff] to-[#0099ff]",
  },
  {
    icon: Shield,
    title: "Sécurité & Protection",
    description: "Solutions de cybersécurité avancées pour protéger vos données et systèmes.",
    features: ["Antivirus professionnel", "Firewall configuration", "Backup automatique", "Audit sécurité"],
    color: "from-[#00d4ff] to-[#0066ff]",
  },
  {
    icon: Zap,
    title: "Optimisation Performance",
    description: "Boostez les performances de vos ordinateurs et réseaux.",
    features: ["Upgrade composants", "Optimisation SSD", "Configuration RAM", "Overclocking sécurisé"],
    color: "from-[#0099ff] to-[#00d4ff]",
  },
  {
    icon: Cloud,
    title: "Solutions Cloud",
    description: "Migration et gestion de vos données dans le cloud en toute sécurité.",
    features: ["Migration données", "Synchronisation", "Stockage sécurisé", "Accès distant"],
    color: "from-[#0066ff] to-[#00d4ff]",
  },
  {
    icon: Monitor,
    title: "Installation & Configuration",
    description: "Installation complète de vos systèmes informatiques professionnels.",
    features: ["Setup PC/Laptop", "Configuration réseau", "Installation logiciels", "Formation utilisateur"],
    color: "from-[#00d4ff] to-[#0099ff]",
  },
  {
    icon: Headphones,
    title: "Support Technique 24/7",
    description: "Assistance technique disponible à tout moment pour résoudre vos problèmes.",
    features: ["Support téléphonique", "Télémaintenance", "Intervention rapide", "Suivi personnalisé"],
    color: "from-[#0099ff] to-[#0066ff]",
  },
];

const stats = [
  { value: "98%", label: "Satisfaction client" },
  { value: "< 2h", label: "Temps de réponse" },
  { value: "500+", label: "Interventions/mois" },
  { value: "10 ans", label: "D'expérience" },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative pt-24 pb-20 bg-gradient-to-br from-[#0a1628] via-[#0d2847] to-[#0a1628] overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-30" />
        <div className="absolute inset-0 hex-pattern opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-white mb-4">
              Nos <span className="text-[#00d4ff]">Services</span>
            </h1>
            <p className="text-xl text-gray-300 font-rajdhani max-w-2xl mx-auto mb-12">
              Des solutions informatiques complètes pour les professionnels et particuliers
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass-dark rounded-xl p-6 text-center"
                >
                  <div className="font-orbitron text-3xl font-bold text-[#00d4ff] mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm font-rajdhani">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-[#f0f7ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-[#0a1628] mb-4">
              Expertise <span className="text-[#0066ff]">Complète</span>
            </h2>
            <p className="text-gray-600 font-rajdhani text-lg max-w-2xl mx-auto">
              Découvrez notre gamme complète de services informatiques
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-tech p-8 group"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="font-orbitron text-xl font-semibold text-[#0a1628] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-rajdhani mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#00d4ff] flex-shrink-0" />
                      <span className="font-rajdhani">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 tech-gradient relative overflow-hidden">
        <div className="absolute inset-0 data-grid opacity-30" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-6">
              Besoin d&apos;un <span className="text-[#00d4ff]">Devis Personnalisé</span> ?
            </h2>
            <p className="text-xl text-gray-300 font-rajdhani mb-10">
              Notre équipe d&apos;experts est prête à vous accompagner dans tous vos projets informatiques
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="tel:+2250586973027"
                className="flex items-center gap-3 px-8 py-4 bg-white text-[#0066ff] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                +225 0586973027
              </a>
              <a 
                href="mailto:patrikouadio10@gmail.com"
                className="flex items-center gap-3 px-8 py-4 border-2 border-[#00d4ff] text-[#00d4ff] rounded-lg font-semibold hover:bg-[#00d4ff]/10 transition-colors"
              >
                <Mail className="w-5 h-5" />
                patrikouadio10@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
