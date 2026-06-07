"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, ShieldCheck, User, Users, Lock, Sparkles, Sun, Moon } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { role, setRole } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.body.classList.contains("dark"));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect based on current active role state
    if (role === "patient") {
      router.push("/dashboard/patient");
    } else if (role === "therapist") {
      router.push("/dashboard/therapist");
    } else {
      router.push("/dashboard/admin");
    }
  };

  const handleDemoLogin = (demoRole: "patient" | "therapist" | "admin") => {
    setRole(demoRole);
    if (demoRole === "patient") {
      router.push("/dashboard/patient");
    } else if (demoRole === "therapist") {
      router.push("/dashboard/therapist");
    } else {
      router.push("/dashboard/admin");
    }
  };

  return (
    <div className="min-h-screen grid-bg relative flex flex-col justify-center items-center px-6 py-12 transition-colors duration-300">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-400/5 blur-[120px] pointer-events-none" />

      {/* Brand logo */}
      <Link href="/" className="flex items-center gap-2 mb-8 select-none">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-md shadow-primary/20">
          <Activity className="h-5 w-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Kinetiq AI
        </span>
      </Link>

      <div className="w-full max-w-[460px] bg-card border border-border rounded-3xl p-8 shadow-xl shadow-primary/5 relative">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome back</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter your credentials or use the Hackathon Demo shortcuts.
          </p>
        </div>

        {/* Regular Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              required
              className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400" htmlFor="password">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-primary text-white font-medium hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/10 transition-all text-sm flex items-center justify-center gap-1.5"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="relative my-8 text-center text-xs">
          <div className="absolute inset-y-1/2 left-0 right-0 h-[1px] bg-border" />
          <span className="relative bg-card px-3 text-slate-400 font-mono text-[10px]">HACKATHON QUICK LOGIN</span>
        </div>

        {/* Demo Fast Access Buttons */}
        <div className="space-y-3">
          {/* Patient demo button */}
          <button
            onClick={() => handleDemoLogin("patient")}
            className="w-full h-11 border border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-xl px-4 flex items-center justify-between text-left text-xs font-semibold text-primary transition-colors group"
          >
            <span className="flex items-center gap-2">
              <User className="h-4 w-4 shrink-0" />
              <span>Login as Patient <span className="font-normal text-slate-500 text-[10px] block">Alex Johnson (Shoulder Rehab)</span></span>
            </span>
            <Sparkles className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Therapist demo button */}
          <button
            onClick={() => handleDemoLogin("therapist")}
            className="w-full h-11 border border-secondary/20 bg-secondary/5 hover:bg-secondary/10 rounded-xl px-4 flex items-center justify-between text-left text-xs font-semibold text-secondary transition-colors group"
          >
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0" />
              <span>Login as Therapist <span className="font-normal text-slate-500 text-[10px] block">Dr. Sarah Mitchell (Clinician)</span></span>
            </span>
            <Sparkles className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Admin demo button */}
          <button
            onClick={() => handleDemoLogin("admin")}
            className="w-full h-11 border border-slate-400/20 bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-800/20 dark:hover:bg-slate-800 rounded-xl px-4 flex items-center justify-between text-left text-xs font-semibold text-foreground transition-colors group"
          >
            <span className="flex items-center gap-2">
              <Lock className="h-4 w-4 shrink-0" />
              <span>Login as Administrator <span className="font-normal text-slate-500 text-[10px] block">System Console / Infrastructure</span></span>
            </span>
            <Sparkles className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Footnote */}
        <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline font-semibold">
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}
