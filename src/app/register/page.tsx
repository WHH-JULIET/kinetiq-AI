"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, User, Users, Lock, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function RegisterPage() {
  const router = useRouter();
  const { setRole } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"patient" | "therapist">("patient");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    if (selectedRole === "patient") {
      router.push("/dashboard/patient");
    } else {
      router.push("/dashboard/therapist");
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

      <div className="w-full max-w-[480px] bg-card border border-border rounded-3xl p-8 shadow-xl shadow-primary/5">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Create an account</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign up to start your guided AI recovery journey.
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setSelectedRole("patient")}
            className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 transition-all ${
              selectedRole === "patient"
                ? "border-primary bg-primary/5 text-primary font-bold shadow-md shadow-primary/5"
                : "border-border bg-card/60 text-slate-500 hover:bg-card/95"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">I am a Patient</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole("therapist")}
            className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 transition-all ${
              selectedRole === "therapist"
                ? "border-secondary bg-secondary/5 text-secondary font-bold shadow-md shadow-secondary/5"
                : "border-border bg-card/60 text-slate-500 hover:bg-card/95"
            }`}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs">I am a Therapist</span>
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Johnson"
              required
              className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
            />
          </div>

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
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5" htmlFor="password">
              Password
            </label>
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
              Sign Up <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
