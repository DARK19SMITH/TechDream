"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Cpu, Lock, Eye, EyeOff, AlertCircle, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_auth") === "true";
    if (isAuth) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("admin_auth", "true");
        localStorage.setItem("admin_data", JSON.stringify(data.admin));
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Identifiants invalides");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 tech-gradient" />
      <div className="absolute inset-0 circuit-pattern opacity-30" />
      <div className="absolute inset-0 hex-pattern opacity-20" />
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066ff] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00d4ff] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au site
        </Link>

        <div className="glass-dark rounded-2xl p-8 border-glow">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-[#0066ff] to-[#00d4ff] flex items-center justify-center mb-6 pulse-glow">
              <Cpu className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
              Administration
            </h1>
            <p className="text-gray-400 font-rajdhani">
              Connectez-vous pour accéder au back-office
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#1a2d4a] border border-[#0066ff]/30 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors font-rajdhani"
                  placeholder="admin@techdream.fr"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-[#1a2d4a] border border-[#0066ff]/30 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00d4ff] transition-colors font-rajdhani"
                  placeholder="••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00d4ff] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-rajdhani">{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-tech py-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Se connecter
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 rounded-lg bg-[#0066ff]/10 border border-[#0066ff]/20">
            <p className="text-gray-400 text-sm text-center font-rajdhani">
              <span className="text-[#00d4ff]">Démo:</span> Email{" "}
              <code className="px-2 py-1 rounded bg-[#1a2d4a] text-[#00d4ff] text-xs">
                admin@techdream.fr
              </code>
              {" "}Mot de passe{" "}
              <code className="px-2 py-1 rounded bg-[#1a2d4a] text-[#00d4ff] text-xs">
                techdream2026
              </code>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
