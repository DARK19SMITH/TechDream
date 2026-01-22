"use client";

import Link from "next/link";
import { Cpu, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#0a1628] text-white overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-30" />
      <div className="absolute inset-0 hex-pattern opacity-20" />
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0066ff] to-[#00d4ff] flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-white" />
                </div>
                <span className="font-orbitron font-bold text-2xl">Tech Dream</span>
              </div>
              <p className="text-gray-400 font-rajdhani text-lg leading-relaxed">
                Votre partenaire technologique pour des solutions informatiques innovantes et performantes.
              </p>
              <div className="flex gap-4 mt-6">
                {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-[#1a2d4a] flex items-center justify-center hover:bg-[#0066ff] transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-orbitron font-semibold text-lg mb-6 text-[#00d4ff]">Navigation</h3>
              <ul className="space-y-3">
                {["Accueil", "Boutique", "Conseils", "Services", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Accueil" ? "/" : `/${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-[#00d4ff] transition-colors font-rajdhani text-lg flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066ff]" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-orbitron font-semibold text-lg mb-6 text-[#00d4ff]">Services</h3>
              <ul className="space-y-3">
                {["Vente PC & Laptops", "Maintenance", "Conseils IT", "Sécurité", "Optimisation"].map((item) => (
                  <li key={item}>
                    <span className="text-gray-400 font-rajdhani text-lg flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-orbitron font-semibold text-lg mb-6 text-[#00d4ff]">Contact</h3>
              <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-400">
                    <div className="w-10 h-10 rounded-lg bg-[#1a2d4a] flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#0066ff]" />
                    </div>
                    <span className="font-rajdhani">Abidjan, Côte d'Ivoire</span>
                  </li>
                    <li className="flex items-center gap-3 text-gray-400">
                      <div className="w-10 h-10 rounded-lg bg-[#1a2d4a] flex items-center justify-center">
                        <Phone className="w-5 h-5 text-[#0066ff]" />
                      </div>
                      <span className="font-rajdhani">+225 0586973027</span>
                    </li>
                  <li className="flex items-center gap-3 text-gray-400">
                    <div className="w-10 h-10 rounded-lg bg-[#1a2d4a] flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#0066ff]" />
                    </div>
                    <span className="font-rajdhani">patrikouadio10@gmail.com</span>
                  </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(0,102,255,0.2)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 font-rajdhani text-sm">
                © 2026 Tech Dream. Tous droits réservés.
              </p>
              <div className="flex items-center gap-6">
                <Link href="#" className="text-gray-500 hover:text-[#00d4ff] text-sm font-rajdhani transition-colors">
                  Mentions légales
                </Link>
                <Link href="#" className="text-gray-500 hover:text-[#00d4ff] text-sm font-rajdhani transition-colors">
                  Politique de confidentialité
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
