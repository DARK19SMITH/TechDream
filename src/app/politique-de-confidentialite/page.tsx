"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CircuitBackground } from "@/components/CircuitBackground";

export default function PolitiqueConfidentialite() {
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
              Politique de <span className="text-[#00d4ff]">Confidentialité</span>
            </h1>

            <div className="space-y-8 text-gray-300 font-rajdhani text-lg leading-relaxed">
              <section>
                <h2 className="text-[#00d4ff] font-orbitron text-xl mb-4">1. Introduction</h2>
                <p>
                  Chez Tech Dream, nous accordons une importance capitale à la protection de vos données personnelles. Cette politique de confidentialité détaille la manière dont nous collectons, utilisons et protégeons vos informations.
                </p>
              </section>

              <section>
                <h2 className="text-[#00d4ff] font-orbitron text-xl mb-4">2. Collecte des Données</h2>
                <p>
                  Nous collectons des informations lorsque vous utilisez notre formulaire de contact ou lorsque vous naviguez sur notre site. Les données collectées peuvent inclure votre nom, votre adresse e-mail, votre numéro de téléphone et vos données de navigation.
                </p>
              </section>

              <section>
                <h2 className="text-[#00d4ff] font-orbitron text-xl mb-4">3. Utilisation des Données</h2>
                <p>
                  Les informations que nous collectons sont utilisées pour :
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Répondre à vos demandes via le formulaire de contact</li>
                  <li>Améliorer l'expérience utilisateur sur notre site</li>
                  <li>Vous envoyer des informations relatives à nos services (si vous y avez consenti)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#00d4ff] font-orbitron text-xl mb-4">4. Protection des Données</h2>
                <p>
                  Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. Vos données ne sont jamais vendues, échangées ou transférées à des tiers sans votre consentement.
                </p>
              </section>

              <section>
                <h2 className="text-[#00d4ff] font-orbitron text-xl mb-4">5. Vos Droits</h2>
                <p>
                  Conformément aux réglementations sur la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, vous pouvez nous conctactez à l'adresse : patrikouadio10@gmail.com.
                </p>
              </section>

              <section>
                <h2 className="text-[#00d4ff] font-orbitron text-xl mb-4">6. Cookies</h2>
                <p>
                  Notre site utilise des cookies pour améliorer l'accès à notre site et identifier les visiteurs réguliers. L'utilisation des cookies est liée à des fins d'analyse de trafic uniquement.
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
