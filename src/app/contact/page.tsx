"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Phone, Mail, Clock, Send, 
  CheckCircle, Cpu, Users, Award, Target, User
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const contactInfo = [
  { icon: User, label: "Responsable", value: "Patrick Kouadio" },
  { icon: MapPin, label: "Adresse", value: "Abidjan, Côte d'Ivoire" },
  { icon: Phone, label: "Téléphone", value: "0586973027" },
  { icon: Mail, label: "Email", value: "patrikouadio10@gmail.com" },
  { icon: Clock, label: "Horaires", value: "Lun-Ven: 9h-18h" },
];

const values = [
  { icon: Target, title: "Innovation", desc: "Toujours à la pointe de la technologie" },
  { icon: Users, title: "Proximité", desc: "Un accompagnement personnalisé" },
  { icon: Award, title: "Excellence", desc: "Des standards de qualité élevés" },
  { icon: Cpu, title: "Expertise", desc: "10 ans d'expérience dans le secteur" },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormState({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Contactez-<span className="text-[#00d4ff]">Nous</span>
            </h1>
            <p className="text-xl text-gray-300 font-rajdhani max-w-2xl mx-auto">
              Une question ? Un projet ? Notre équipe est à votre écoute
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-[#f0f7ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-orbitron text-3xl font-bold text-[#0a1628] mb-6">
                Envoyez-nous un <span className="text-[#0066ff]">Message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                  <input
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani"
                    placeholder="Objet de votre message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#0066ff] focus:ring-2 focus:ring-[#0066ff]/20 outline-none transition-all font-rajdhani resize-none"
                    placeholder="Décrivez votre demande..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-tech w-full py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Message envoyé !
                    </>
                  ) : isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-orbitron text-3xl font-bold text-[#0a1628] mb-6">
                  Nos <span className="text-[#0066ff]">Coordonnées</span>
                </h2>
                
                <div className="space-y-4">
                  {contactInfo.map((info, i) => (
                    <div key={i} className="card-tech p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0066ff] to-[#00d4ff] flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{info.label}</p>
                        <p className="font-rajdhani text-[#0a1628] font-medium">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-tech p-6 bg-gradient-to-br from-[#0066ff]/5 to-[#00d4ff]/5">
                <h3 className="font-orbitron text-xl font-semibold text-[#0a1628] mb-4">
                  À Propos de Tech Dream
                </h3>
                  <p className="text-gray-600 font-rajdhani mb-6 leading-relaxed">
                    Sous la direction de Patrick Kouadio, Tech Dream accompagne les professionnels et particuliers dans leurs projets informatiques. 
                    Notre équipe d&apos;experts passionnés s&apos;engage à fournir des solutions innovantes et un service client d&apos;exception.
                  </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {values.map((value, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <value.icon className="w-5 h-5 text-[#0066ff] mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#0a1628] text-sm">{value.title}</p>
                        <p className="text-gray-500 text-xs">{value.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
