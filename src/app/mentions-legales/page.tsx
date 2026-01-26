"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CircuitBackground } from "@/components/CircuitBackground";

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-[#0a1628]">
      <Navbar />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <CircuitBackground />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark p-8 md:p-12 rounded-2xl border border-[#00d4ff]/20"
          >
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-8 text-glow">
              Mentions <span className="text-[#00d4ff]">Légales</span>
            </h1>

            <div className="space-y-8 text-gray-300 font-rajdhani text-lg leading-relaxed">
                  <section>
                    <h2 className="text-[#00d4ff] font-orbitron text-xl mb-4">1. Éditeur du Site</h2>
                    <p>
                      Le site Tech Dream est édité par Patrick Kouadio.<br />
                      Siège social : Abidjan, Côte d'Ivoire.<br />
                      Téléphone : +225 0160010377<br />
                      Email : Koffreddy@gmail.com
                    </p>
                  </section>

                  <section>
                    <h2 className="text-[#00d4ff] font-orbitron text-xl mb-4">2. Responsable de Publication</h2>
                    <p>Patrick Kouadio</p>
                  </section>

                <section>
                  <h2 className="text-[#00d4ff] font-orbitron text-xl mb-4">3. Réalisation du Site</h2>
                  <p>Miguel Koffi</p>
                </section>

                <section>
                  <h2 className="text-[#00d4ff] font-orbitron text-xl mb-4">4. Hébergement</h2>
                  <p>
                    Ce site est hébergé par Vercel Inc.<br />
                    Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
                  </p>
                </section>

                <section>
                  <h2 className="text-[#00d4ff] font-orbitron text-xl mb-4">5. Propriété Intellectuelle</h2>
                  <p>
                    L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes) est la propriété exclusive de Patrick Kouadio (Tech Dream), sauf mentions contraires. Toute reproduction, distribution, modification ou adaptation de ces éléments est strictement interdite sans l'accord écrit préalable de l'éditeur.
                  </p>
                </section>

                <section>
                  <h2 className="text-[#00d4ff] font-orbitron text-xl mb-4">6. Limitation de Responsabilité</h2>
                  <p>
                    Tech Dream s'efforce de fournir des informations aussi précises que possible. Toutefois, l'éditeur ne pourra être tenu responsable des omissions ou des inexactitudes dans la mise à jour des informations, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                  </p>
                </section>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
