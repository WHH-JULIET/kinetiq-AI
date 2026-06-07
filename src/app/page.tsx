"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Activity, Video, Brain, TrendingUp, Sparkles, User, 
  ArrowRight, ShieldCheck, Camera, CheckCircle2, ChevronRight,
  Sun, Moon, Users, Lock, Award, HeartHandshake, Zap
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function LandingPage() {
  const router = useRouter();
  const { setRole } = useApp();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Default to light for clean healthcare feel, but checks preferences
    const isDarkStored = localStorage.getItem("theme") === "dark";
    setIsDark(isDarkStored);
    if (isDarkStored) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    if (nextDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  const handleRoleSelect = (selectedRole: "patient" | "therapist" | "admin") => {
    setRole(selectedRole);
    router.push("/login");
  };

  return (
    <div className="min-h-screen grid-bg relative overflow-x-hidden transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none dark:bg-blue-600/5" />
      <div className="absolute top-[20%] right-[-10%] w-[45%] h-[55%] rounded-full bg-cyan-400/10 blur-[120px] pointer-events-none dark:bg-cyan-600/5" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-md shadow-primary/20">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Kinetiq AI
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#why-kinetiq" className="hover:text-primary transition-colors">Why Kinetiq</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#demo" className="hover:text-primary transition-colors">Demo Portals</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-lg border border-border bg-card/60 hover:bg-card/90 transition-colors text-foreground"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-4.5 w-4.5 text-amber-500" /> : <Moon className="h-4.5 w-4.5 text-slate-700" />}
            </button>
            <Link 
              href="/login"
              className="hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-xl bg-primary text-white font-medium hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/15 transition-all text-sm"
            >
              Access System
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Hackathon Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold mb-6"
            >
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>National Hackathon Demo 2026</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6"
            >
              Next-Gen <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">
                AR Physiotherapy
              </span> <br />
              Monitoring Platform
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mb-8 leading-relaxed"
            >
              AI-Powered AR Physiotherapy Monitoring, Real-Time Posture Correction, and Recovery Intelligence Platform. Train at home with instant medical-grade pose feedback.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 w-full sm:w-auto"
            >
              <a 
                href="#demo"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center h-12 px-6 rounded-xl bg-primary text-white font-medium hover:bg-primary/95 hover:shadow-lg hover:shadow-primary/15 transition-all text-sm gap-2"
              >
                Launch Demo Portal <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#how-it-works"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center h-12 px-6 rounded-xl border border-border bg-card/60 hover:bg-card/90 transition-colors text-foreground text-sm font-medium"
              >
                Learn How It Works
              </a>
            </motion.div>
          </div>

          {/* Graphic Simulator */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl border border-border bg-card overflow-hidden shadow-2xl shadow-primary/5 flex flex-col"
            >
              {/* Camera header */}
              <div className="h-10 bg-slate-900 flex items-center justify-between px-4 text-slate-400 text-xs font-mono border-b border-slate-800">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                  AR_FEED: ACTIVE
                </span>
                <span>ROM: 112° / 120°</span>
              </div>

              {/* simulated webcam */}
              <div className="flex-1 bg-slate-950 relative flex items-center justify-center overflow-hidden">
                {/* Scanner line */}
                <div className="absolute top-0 left-0 w-full h-[30%] scanner-line pointer-events-none" />

                {/* Simulated Pose Grid */}
                <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid Lines */}
                  <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.08)" strokeDasharray="5,5" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.08)" strokeDasharray="5,5" />
                  
                  {/* Bone links */}
                  {/* Torso */}
                  <line x1="200" y1="120" x2="200" y2="240" stroke="#22C55E" strokeWidth="3" />
                  {/* Left arm */}
                  <line x1="200" y1="120" x2="110" y2="150" stroke="#22C55E" strokeWidth="3" />
                  <line x1="110" y1="150" x2="60" y2="220" stroke="#22C55E" strokeWidth="3" />
                  {/* Right arm (impinged/warning red skeletal lines) */}
                  <line x1="200" y1="120" x2="290" y2="90" stroke="#F59E0B" strokeWidth="3" />
                  <line x1="290" y1="90" x2="350" y2="35" stroke="#EF4444" strokeWidth="3" />
                  {/* Legs */}
                  <line x1="200" y1="240" x2="160" y2="340" stroke="#22C55E" strokeWidth="3" />
                  <line x1="200" y1="240" x2="240" y2="340" stroke="#22C55E" strokeWidth="3" />
                  
                  {/* Joints */}
                  <circle cx="200" cy="80" r="16" fill="rgba(255,255,255,0.1)" stroke="#22C55E" strokeWidth="2" />
                  <circle cx="200" cy="120" r="7" fill="#22C55E" className="joint-pulse" />
                  
                  {/* Left Shoulder & Elbow */}
                  <circle cx="110" cy="150" r="5" fill="#22C55E" />
                  <circle cx="60" cy="220" r="5" fill="#22C55E" />
                  
                  {/* Right Shoulder (Warning) */}
                  <circle cx="290" cy="90" r="6" fill="#F59E0B" />
                  {/* Right Elbow (Incorrect angle joint) */}
                  <circle cx="350" cy="35" r="6" fill="#EF4444" className="joint-pulse" />
                </svg>

                {/* Digital overlay text boxes */}
                <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-[10px] font-mono leading-tight max-w-[150px]">
                  <p className="text-secondary font-bold">SHOULDER ABDUCTION</p>
                  <p className="mt-1">R-Angle: <span className="text-red-400">142°</span></p>
                  <p>Target: &lt;120°</p>
                </div>

                <div className="absolute bottom-4 right-4 bg-red-950/90 border border-red-500/50 text-red-200 px-3 py-1.5 rounded-lg text-[10px] font-mono leading-tight max-w-[150px]">
                  <p className="font-bold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                    POSTURE WARNING
                  </p>
                  <p className="mt-1">Drift detected. Lower right arm to protect rotator cuff.</p>
                </div>

                {/* Skeleton mockup silhouette */}
                <div className="w-44 h-72 rounded-full border border-dashed border-slate-800/40 absolute pointer-events-none" />
              </div>

              {/* Camera footer stats */}
              <div className="h-14 bg-slate-900 border-t border-slate-800 flex items-center justify-around text-center text-white text-xs px-2">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Accuracy</p>
                  <p className="text-sm font-bold text-secondary">92.4%</p>
                </div>
                <div className="border-l border-slate-800 h-8" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Repetition</p>
                  <p className="text-sm font-bold text-success">8 / 10</p>
                </div>
                <div className="border-l border-slate-800 h-8" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Feedback</p>
                  <p className="text-xs text-amber-500 font-medium font-sans">Lower Arm</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Advanced Clinical AR Intelligence
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Kinetiq AI bridges the gap between home workouts and medical oversight by deploying advanced computer vision directly in the browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* feature 1 */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-primary flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Camera className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Real-time Pose Detection</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Detect 33 key physical skeletal coordinates instantly through standard mobile or desktop webcams.
              </p>
            </div>

            {/* feature 2 */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 text-secondary flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Video className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Augmented Reality Guidance</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Visual alignment overlays project vector lines, target angles, and boundaries directly onto your camera stream.
              </p>
            </div>

            {/* feature 3 */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Recovery Prediction</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                ML analytics forecast ranges of motion and pain scores to construct a personalized rehabilitation timeline.
              </p>
            </div>

            {/* feature 4 */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-success flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Personalized Training Plans</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Dynamic rehab curriculums that calibrate and scale automatically based on joint ROM improvements.
              </p>
            </div>

            {/* feature 5 */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-warning flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Digital Twin Body Analysis</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Generate an interactive 3D joint representation of the patient to chart structural asymmetry and range variations.
              </p>
            </div>

            {/* feature 6 */}
            <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Remote Physiotherapy Monitoring</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Enable medical therapists to monitor live sessions, review skeletal compliance graphs, and tweak plans remotely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY KINETIQ AI SECTION */}
      <section id="why-kinetiq" className="py-20 bg-background transition-colors relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-bold text-xs uppercase tracking-widest mb-2"
            >
              Why Kinetiq AI?
            </motion.div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Advanced Clinical Outcomes, Guided At Home
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Unlike traditional video tutorials or static exercise printouts, Kinetiq AI creates an intelligent loop between the patient, AI pose corrections, and clinical therapists.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Feature Callouts */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-border bg-card/60 flex flex-col justify-between hover:shadow-md hover:border-primary/10 transition-all">
                <div>
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-primary flex items-center justify-center mb-4">
                    <Video className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-base mb-2">AR Guidance</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Interactive overlays guide physical boundaries in 3D. Prevents excessive extension, rotation errors, or incorrect weight loading during active reps.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card/60 flex flex-col justify-between hover:shadow-md hover:border-primary/10 transition-all">
                <div>
                  <div className="h-10 w-10 rounded-lg bg-cyan-500/10 text-secondary flex items-center justify-center mb-4">
                    <Brain className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-base mb-2">AI Recovery Prediction</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    ML models analyze weeks of ranges of motion and pain scores to construct a realistic timeline forecasting the day pain hits zero.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card/60 flex flex-col justify-between hover:shadow-md hover:border-primary/10 transition-all">
                <div>
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-success flex items-center justify-center mb-4">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-base mb-2">Remote Physiotherapy</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Allows therapists to monitor exercise performance metrics, view video frames remotely, and write customized recovery plans directly.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card/60 flex flex-col justify-between hover:shadow-md hover:border-primary/10 transition-all">
                <div>
                  <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-warning flex items-center justify-center mb-4">
                    <Activity className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-base mb-2">Digital Twin Analysis</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Transforms structural skeleton points into an interactive body heat map. Highlights muscles under high strain or experiencing asymmetric fatigue.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Big Callout */}
            <div className="lg:col-span-2 p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-secondary/5 to-card flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/10">
                  Featured Innovation
                </span>
                <h4 className="text-xl font-bold mt-4 mb-2">Personalized Training Plans</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Say goodbye to generic PDF worksheets. Kinetiq AI dynamically updates your reps, range targets, and rest intervals after each session.
                </p>
                
                <ul className="mt-6 space-y-2.5">
                  <li className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Real-time calibration based on joint thresholds</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Injury avoidance controls dynamically integrated</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Direct API link to medical record systems</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <div className="p-4 rounded-xl bg-card border border-border flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-success/15 flex items-center justify-center text-success text-xs font-bold">
                    95%
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Rehab Compliance Rate</p>
                    <p className="text-[10px] text-muted-foreground">Compared to 30% national average for paper programs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              The Path to Recovery
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Five simple steps connecting advanced browser vision with medical-grade physiotherapy.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Line connector for steps */}
            <div className="absolute top-[35px] left-[40px] right-[40px] h-0.5 bg-border hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="h-16 w-16 rounded-full bg-card border-2 border-primary text-primary flex items-center justify-center font-bold text-lg shadow-sm">
                  <Camera className="h-6 w-6" />
                </div>
                <h4 className="font-bold mt-4 mb-2 text-sm">1. Open Camera</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                  Log in to Kinetiq and activate the camera feed directly in your browser. No downloads needed.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="h-16 w-16 rounded-full bg-card border-2 border-primary text-primary flex items-center justify-center font-bold text-lg shadow-sm">
                  <Activity className="h-6 w-6" />
                </div>
                <h4 className="font-bold mt-4 mb-2 text-sm">2. AI Detects Pose</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                  AI scans 33 joints instantly to map your body skeleton accurately.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="h-16 w-16 rounded-full bg-card border-2 border-primary text-primary flex items-center justify-center font-bold text-lg shadow-sm">
                  <Video className="h-6 w-6" />
                </div>
                <h4 className="font-bold mt-4 mb-2 text-sm">3. AR Guidance</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                  AR overlay projections trace targets, extension limits, and safety margins.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="h-16 w-16 rounded-full bg-card border-2 border-primary text-primary flex items-center justify-center font-bold text-lg shadow-sm">
                  <Zap className="h-6 w-6" />
                </div>
                <h4 className="font-bold mt-4 mb-2 text-sm">4. Live Corrections</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                  Receive instant voice feedback and visual alerts for bad alignment.
                </p>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="h-16 w-16 rounded-full bg-card border-2 border-primary text-primary flex items-center justify-center font-bold text-lg shadow-sm">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h4 className="font-bold mt-4 mb-2 text-sm">5. Track Progress</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                  Sync data to dashboards to unlock recovery trophies and log therapist reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Dashboard Switcher Section */}
      <section id="demo" className="py-20 bg-background transition-colors relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">Interactive Console</span>
            <h2 className="text-3xl font-bold tracking-tight mt-2 mb-4">
              Explore Role-Specific Dashboards
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              For evaluation, select one of the preloaded demo roles to explore the specialized dashboards and simulated AR environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Patient Role Card */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-primary/30"
            >
              <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                Demo Patient
              </div>
              <div>
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-primary flex items-center justify-center mb-6">
                  <User className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Patient Dashboard</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Check recovery streaks, track gamified achievements, request guidance via the AI chatbot, and initiate AR-monitored exercises.
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl mb-6">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Sample Credentials</p>
                  <p className="text-xs font-medium text-foreground mt-1">Role: Patient</p>
                  <p className="text-xs font-mono text-muted-foreground text-[10px]">Preloaded: Alex Johnson</p>
                </div>
              </div>
              <button 
                onClick={() => handleRoleSelect("patient")}
                className="w-full h-11 rounded-xl bg-primary text-white font-medium hover:bg-primary/95 transition-all text-xs flex items-center justify-center gap-1.5"
              >
                Launch Patient View <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>

            {/* Therapist Role Card */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-secondary/30"
            >
              <div className="absolute top-0 right-0 bg-secondary/10 text-secondary text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                Demo Clinician
              </div>
              <div>
                <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 text-secondary flex items-center justify-center mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Therapist Portal</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Search patient files, monitor real-time exercise telemetry, assess movement safety, and send chat instructions/prescriptions.
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl mb-6">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Sample Credentials</p>
                  <p className="text-xs font-medium text-foreground mt-1">Role: Physiotherapist</p>
                  <p className="text-xs font-mono text-muted-foreground text-[10px]">Preloaded: Dr. Sarah Mitchell</p>
                </div>
              </div>
              <button 
                onClick={() => handleRoleSelect("therapist")}
                className="w-full h-11 rounded-xl bg-secondary text-white font-medium hover:bg-secondary/95 transition-all text-xs flex items-center justify-center gap-1.5"
              >
                Launch Therapist View <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>

            {/* Admin Role Card */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-slate-400/30"
            >
              <div className="absolute top-0 right-0 bg-slate-100 dark:bg-slate-800 text-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                Demo Administrator
              </div>
              <div>
                <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-foreground flex items-center justify-center mb-6">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Admin Dashboard</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Manage user roles, audit API latency, inspect active server storage bounds, and review AI model classification confidence rates.
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl mb-6">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Sample Credentials</p>
                  <p className="text-xs font-medium text-foreground mt-1">Role: Administrator</p>
                  <p className="text-xs font-mono text-muted-foreground text-[10px]">Preloaded: Admin Console</p>
                </div>
              </div>
              <button 
                onClick={() => handleRoleSelect("admin")}
                className="w-full h-11 rounded-xl bg-slate-800 dark:bg-slate-700 text-white font-medium hover:bg-slate-900 transition-all text-xs flex items-center justify-center gap-1.5"
              >
                Launch Admin View <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card py-12 text-slate-500 dark:text-slate-400 transition-colors">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Activity className="h-4 w-4" />
            </div>
            <span className="font-bold text-foreground">Kinetiq AI</span>
          </div>
          <p className="text-xs">
            © 2026 Kinetiq AI. Designed for National Hackathon Rehabilitation Innovation Showcase.
          </p>
          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
