"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Activity, Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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

      <div className="w-full max-w-[440px] bg-card border border-border rounded-3xl p-8 shadow-xl shadow-primary/5">
        {!submitted ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight mb-2">Reset Password</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter your email address and we will send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-primary text-white font-medium hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/10 transition-all text-sm flex items-center justify-center gap-1.5"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="h-12 w-12 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold mb-2">Check your email</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              We have sent a password reset link to <span className="font-semibold">{email}</span>. Please check your inbox.
            </p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-border/60 text-center">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary font-semibold transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
