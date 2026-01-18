"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, ShoppingCart, BookOpen, Wrench, Info, LogIn } from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil", icon: Cpu },
  { href: "/boutique", label: "Boutique", icon: ShoppingCart },
  { href: "/conseils", label: "Conseils", icon: BookOpen },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/contact", label: "Contact", icon: Info },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0066ff] to-[#00d4ff] flex items-center justify-center pulse-glow">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-[#0066ff] to-[#00d4ff] opacity-0 group-hover:opacity-30 blur transition-opacity" />
            </div>
            <span className="font-orbitron font-bold text-xl bg-gradient-to-r from-[#0066ff] to-[#00d4ff] bg-clip-text text-transparent">
              Tech Dream
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-[#0a1628] font-medium text-sm hover:text-[#0066ff] transition-colors group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#0066ff]/10 to-[#00d4ff]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="ml-4 btn-tech text-sm flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Admin
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#0066ff] hover:bg-[#0066ff]/10 rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-light border-t border-[rgba(0,102,255,0.15)]"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-[#0a1628] hover:bg-[#0066ff]/10 rounded-lg transition-colors"
                >
                  <link.icon className="w-5 h-5 text-[#0066ff]" />
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#0066ff] to-[#0099ff] text-white rounded-lg"
              >
                <LogIn className="w-5 h-5" />
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
