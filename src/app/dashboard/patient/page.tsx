"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Flame, Award, CheckCircle, Calendar, MessageSquare, 
  ArrowRight, ShieldAlert, Zap, Send, Sparkles, BookOpen, 
  Video, Activity, PlusCircle, FileText, Bot, X
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, BarChart, Bar 
} from "recharts";

export default function PatientDashboard() {
  const { 
    patients, streakCount, weeklyGoal, achievements, 
    messages, sendMessage, addNotification 
  } = useApp();
  
  // Patient is preloaded as Alex Johnson (pat_1)
  const patient = patients[0];

  const [activeTab, setActiveTab] = useState<"overview" | "chat">("overview");
  const [chatInput, setChatInput] = useState("");
  
  // AI Chatbot State
  const [botMessages, setBotMessages] = useState([
    { sender: "bot", text: "Hello Alex! I am your Kinetiq AI Recovery Assistant. How can I help you with your rehabilitation exercises today?" }
  ]);
  const [botInput, setBotInput] = useState("");
  const [showBot, setShowBot] = useState(false);
  const [pdfReportOpen, setPdfReportOpen] = useState(false);

  // Quick Action - Contact Therapist Chat State
  const [therapistChatOpen, setTherapistChatOpen] = useState(false);
  const [therapistChatInput, setTherapistChatInput] = useState("");

  const handleSendBotMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!botInput.trim()) return;

    const userMsg = botInput;
    setBotMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setBotInput("");

    // Simulate AI response
    setTimeout(() => {
      let reply = "I'm analyzing that query. For your Right Shoulder Rotator Cuff Tendinitis, ensure you restrict overhead abduction past 90 degrees. Make sure your chest stays upright during the exercise.";
      if (userMsg.toLowerCase().includes("pain")) {
        reply = "A pain level of 2/10 is normal during early rehabilitation. However, if you experience sudden pinching pain (above 5/10), stop the shoulder abduction exercise immediately and send a note to Dr. Sarah Mitchell.";
      } else if (userMsg.toLowerCase().includes("abduction") || userMsg.toLowerCase().includes("shoulder")) {
        reply = "For Shoulder Abduction: Align your body sideways to the camera. Lift your arm slowly to the side up to 90 degrees. Hold for 2 seconds, then lower under control. Keep your torso straight without leaning.";
      } else if (userMsg.toLowerCase().includes("streak") || userMsg.toLowerCase().includes("badge")) {
        reply = "You currently have a 5-Day recovery streak! Complete 2 more daily sessions to unlock the '7-Day Streak Badge'. Check your achievements panel for details.";
      }

      setBotMessages(prev => [...prev, { sender: "bot", text: reply }]);
    }, 800);
  };

  const handleSendTherapistMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!therapistChatInput.trim()) return;

    sendMessage("patient", therapistChatInput);
    setTherapistChatInput("");
  };

  // Circular progress helper
  const radius = 50;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (patient.recoveryScore / 100) * circumference;

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="p-6 rounded-3xl border border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase text-primary tracking-wider px-2 py-0.5 rounded-full bg-primary/10 border border-primary/10">
              Patient Portal
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground mt-2">
              Welcome back, {patient.name}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-lg">
              You are doing excellent. Your recovery score is up by <span className="font-bold text-success">8%</span> this month. Keep stickin&apos; to your shoulder rehabilitation program!
            </p>
          </div>
          
          {/* Quick Stats Header */}
          <div className="flex items-center gap-6">
            <div className="p-3 rounded-2xl bg-card border border-border flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500 fill-orange-500/10 animate-bounce" />
              <div>
                <p className="text-[9px] text-muted-foreground uppercase font-mono leading-none">RECOVERY STREAK</p>
                <p className="text-sm font-black text-foreground mt-0.5">{streakCount} Days</p>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-card border border-border flex items-center gap-2">
              <Award className="h-5 w-5 text-success fill-success/10" />
              <div>
                <p className="text-[9px] text-muted-foreground uppercase font-mono leading-none">BADGES EARNED</p>
                <p className="text-sm font-black text-foreground mt-0.5">
                  {achievements.filter(a => a.unlocked).length} / {achievements.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN - STATS & CHEVRONS (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Circular Score & Goal stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Circular Gauge */}
            <div className="bg-card border border-border rounded-3xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
              <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono mb-2">Today&apos;s Recovery Score</span>
              <div className="relative h-28 w-28 flex items-center justify-center">
                <svg className="h-full w-full transform -rotate-90">
                  <circle
                    stroke="var(--border)"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />
                  <circle
                    stroke="#2563EB"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + " " + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-black text-foreground">{patient.recoveryScore}%</span>
                  <span className="text-[9px] text-muted-foreground block font-mono">predicted</span>
                </div>
              </div>
              <span className="text-[10px] text-success font-semibold mt-2 flex items-center gap-0.5">
                <Zap className="h-3 w-3" /> Peak ROM improved
              </span>
            </div>

            {/* Exercise Completion Percentage */}
            <div className="bg-card border border-border rounded-3xl p-5 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono block mb-1">Workout Compliance</span>
                <h3 className="text-3xl font-black text-foreground mt-2">{patient.exerciseCompletionRate}%</h3>
                <p className="text-[10px] text-slate-500 mt-1">Completion rate of prescribed reps over the last 14 days.</p>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-secondary h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${patient.exerciseCompletionRate}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-500 mt-1.5 block font-mono text-right">Target Rate: 85%</span>
              </div>
            </div>

            {/* Weekly Goal Progress */}
            <div className="bg-card border border-border rounded-3xl p-5 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono block mb-1">Weekly Exercise Goal</span>
                <div className="flex items-baseline gap-1 mt-2">
                  <h3 className="text-3xl font-black text-foreground">{weeklyGoal.completed}</h3>
                  <span className="text-slate-400 font-medium text-sm">/ {weeklyGoal.target} sets</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Complete 2 more workouts to hit this week&apos;s rehabilitation benchmark.</p>
              </div>

              <div className="mt-4">
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${(weeklyGoal.completed / weeklyGoal.target) * 100}%` }}
                  />
                </div>
                <span className="text-[9px] text-slate-500 mt-1.5 block font-mono text-right">
                  {Math.round((weeklyGoal.completed / weeklyGoal.target) * 100)}% Complete
                </span>
              </div>
            </div>

          </div>

          {/* Assigned Exercises Grid */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Assigned Active Exercises</h3>
                <p className="text-xs text-muted-foreground">Perform these with the AR skeletal tracker camera active.</p>
              </div>
              <span className="text-xs font-semibold text-primary flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-success" /> Prescribed by Dr. Sarah
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {patient.assignedExercises.map((exName, idx) => {
                // Determine exercise-specific metadata
                const romCap = exName.includes("Shoulder") ? "Cap: 120° ROM" : exName.includes("Internal") ? "Reps: 3x10" : "Reps: 3x8";
                const iconBg = idx === 0 ? "bg-blue-500/10 text-primary" : idx === 1 ? "bg-cyan-500/10 text-secondary" : "bg-purple-500/10 text-purple-500";
                
                return (
                  <div key={exName} className="p-4 rounded-2xl border border-border bg-card/60 flex flex-col justify-between hover:border-primary/20 transition-all">
                    <div>
                      <div className={`h-8 w-8 rounded-lg ${iconBg} flex items-center justify-center mb-3`}>
                        <Video className="h-4 w-4" />
                      </div>
                      <h4 className="text-xs font-bold text-foreground">{exName}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{romCap}</p>
                    </div>
                    <Link
                      href={`/training?exercise=${encodeURIComponent(exName)}`}
                      className="mt-4 w-full h-8 rounded-lg bg-primary text-white text-[11px] font-semibold flex items-center justify-center gap-1 hover:bg-primary/95 transition-colors"
                    >
                      Start Training <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Health Metrics & Predictive Recharts Graphs */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-foreground mb-4">Recovery Analytics & Predictions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Chart 1: Pain Reduction Tracker */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase font-mono">Pain Reduction Trend</p>
                <div className="h-48 w-full bg-background/40 rounded-2xl border border-border p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={patient.timeline} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="painGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="date" tick={{ fontSize: 9 }} stroke="rgba(156, 163, 175, 0.5)" />
                      <YAxis domain={[0, 10]} tick={{ fontSize: 9 }} stroke="rgba(156, 163, 175, 0.5)" />
                      <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8, background: "#111827", border: "1px solid #1f2937", color: "#fff" }} />
                      <Area type="monotone" dataKey="pain" name="Pain Level" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#painGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-slate-500 text-center">Lower values represent recovery progression (target: 0/10).</p>
              </div>

              {/* Chart 2: Recovery score forecasting */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase font-mono">Recovery Score Curve</p>
                <div className="h-48 w-full bg-background/40 rounded-2xl border border-border p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={patient.timeline} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="date" tick={{ fontSize: 9 }} stroke="rgba(156, 163, 175, 0.5)" />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} stroke="rgba(156, 163, 175, 0.5)" />
                      <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8, background: "#111827", border: "1px solid #1f2937", color: "#fff" }} />
                      <Area type="monotone" dataKey="score" name="ROM Score %" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#scoreGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-slate-500 text-center">Skeletal compliance tracking scores showing stable improvement.</p>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - GAMIFICATION JOURNEY & AI CHAT (4 cols) */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          {/* Recovery Challenge & Daily Streak */}
          <div className="bg-card border border-border rounded-3xl p-5 shadow-sm space-y-4">
            <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono block">Daily Recovery Challenge</span>
            <div className="p-3.5 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-amber-600 flex items-start gap-2.5">
              <Zap className="h-4.5 w-4.5 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-foreground">Hold 90° Shoulder Angle</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">
                  Perform Shoulder Abduction and hold active joint at 90° for 3 seconds. Earns 10 Recovery Points.
                </p>
              </div>
            </div>
          </div>

          {/* Gamified Achievement System Badges */}
          <div className="bg-card border border-border rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono block">Achievements & Badges</span>
              <span className="text-[9px] font-mono font-bold text-success bg-success/15 px-2 py-0.5 rounded-full">LEVEL 3</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {achievements.map((ach) => {
                const isUnlocked = ach.unlocked;
                return (
                  <div 
                    key={ach.id} 
                    className={`p-3 rounded-2xl border flex flex-col items-center text-center justify-center transition-all ${
                      isUnlocked 
                        ? "border-emerald-500/20 bg-card shadow-sm hover:scale-[1.02]" 
                        : "border-border/60 bg-slate-50/50 dark:bg-slate-900/10 opacity-55"
                    }`}
                  >
                    <div className={`h-9 w-9 rounded-full bg-gradient-to-tr ${isUnlocked ? ach.color : "from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800"} flex items-center justify-center text-white text-xs mb-2 shadow-sm`}>
                      <Award className="h-5.5 w-5.5" />
                    </div>
                    <p className="text-[10px] font-bold text-foreground leading-tight truncate w-full">{ach.title}</p>
                    <span className="text-[8px] text-muted-foreground mt-0.5 truncate w-full">{isUnlocked ? ach.unlockedAt : "Locked"}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Therapist chat toggle */}
          <div className="bg-card border border-border rounded-3xl p-5 shadow-sm space-y-3">
            <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono block">Therapist Feedback</span>
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces"
                alt="Therapist"
                className="h-10 w-10 rounded-full border border-border object-cover"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-foreground">Dr. Sarah Mitchell</p>
                <p className="text-[10px] text-muted-foreground truncate">Right Shoulder Rehab Lead</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl leading-normal border border-border/40">
              &quot;Keep exercises below 120° abduction to prevent joint pinching, Alex.&quot;
            </p>
            <button
              onClick={() => setTherapistChatOpen(true)}
              className="w-full h-9 rounded-xl bg-card border border-border text-foreground hover:bg-slate-50 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" /> Send direct message
            </button>
          </div>

          {/* Quick Action buttons */}
          <div className="bg-card border border-border rounded-3xl p-4 shadow-sm grid grid-cols-2 gap-2">
            <button
              onClick={() => setPdfReportOpen(true)}
              className="p-3 rounded-xl border border-border bg-card hover:bg-slate-50 flex flex-col items-center justify-center text-center text-[10px] font-semibold gap-1 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <FileText className="h-4 w-4 text-blue-500" />
              <span>View Reports</span>
            </button>
            
            <Link
              href="/dashboard/ai-insights"
              className="p-3 rounded-xl border border-border bg-card hover:bg-slate-50 flex flex-col items-center justify-center text-center text-[10px] font-semibold gap-1 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Activity className="h-4 w-4 text-cyan-500" />
              <span>Digital Twin</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Interactive AI Chatbot Float Button */}
      <button
        onClick={() => setShowBot(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center shadow-lg shadow-primary/20 z-40 hover:scale-105 transition-transform"
      >
        <Bot className="h-6 w-6 animate-pulse" />
      </button>

      {/* AI Bot Chat Drawer */}
      {showBot && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* backdrop */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowBot(false)} />
          
          <div className="relative w-full max-w-sm bg-card border-l border-border h-full flex flex-col shadow-2xl z-50">
            {/* Header */}
            <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-primary text-white flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">AI Recovery Assistant</h3>
                  <span className="text-[9px] text-success font-semibold flex items-center gap-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-ping" /> Online
                  </span>
                </div>
              </div>
              <button onClick={() => setShowBot(false)} className="p-1.5 rounded-lg border border-border hover:bg-slate-50 text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {botMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-[11px] leading-relaxed ${
                      msg.sender === "user" 
                        ? "bg-primary text-white" 
                        : "bg-slate-50 dark:bg-slate-900 border border-border/60 text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendBotMessage} className="p-4 border-t border-border flex gap-2">
              <input
                type="text"
                value={botInput}
                onChange={(e) => setBotInput(e.target.value)}
                placeholder="Ask about exercises, pain levels, ROM..."
                className="flex-1 h-10 px-3 rounded-xl border border-border bg-card text-xs focus:outline-none focus:border-primary text-foreground"
              />
              <button
                type="submit"
                className="h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/95 transition-colors"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Therapist Contact Chat Modal */}
      {therapistChatOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[500px]">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces"
                  alt="Therapist"
                  className="h-10 w-10 rounded-full border border-border object-cover"
                />
                <div>
                  <h3 className="text-xs font-bold text-foreground">Dr. Sarah Mitchell</h3>
                  <p className="text-[9px] text-muted-foreground">Active Clinician Partner</p>
                </div>
              </div>
              <button onClick={() => setTherapistChatOpen(false)} className="p-1 rounded-lg border border-border hover:bg-slate-50">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-3 rounded-2xl text-[11px] max-w-[80%] leading-relaxed ${
                    msg.sender === "patient"
                      ? "bg-primary text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-foreground"
                  }`}>
                    <p>{msg.text}</p>
                    <span className="text-[8px] opacity-70 block mt-1 text-right font-mono">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendTherapistMessage} className="p-3 border-t border-border flex gap-2">
              <input
                type="text"
                value={therapistChatInput}
                onChange={(e) => setTherapistChatInput(e.target.value)}
                placeholder="Type your message to Dr. Sarah..."
                className="flex-1 h-10 px-3 rounded-xl border border-border bg-card text-xs focus:outline-none focus:border-primary text-foreground"
              />
              <button type="submit" className="h-10 w-10 bg-primary text-white rounded-xl flex items-center justify-center">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PDF Clinical Report Drawer / Modal */}
      {pdfReportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90%]">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-slate-50 dark:bg-slate-900/60">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-500" />
                <h3 className="text-xs font-bold text-foreground">Clinical Report: Shoulder_ROM_Alex_Johnson.pdf</h3>
              </div>
              <button onClick={() => setPdfReportOpen(false)} className="p-1 rounded-lg border border-border hover:bg-slate-50">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Document view mock */}
            <div className="flex-1 p-8 overflow-y-auto space-y-6 text-xs text-foreground bg-white text-slate-800 font-sans leading-relaxed">
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <h1 className="text-lg font-black text-slate-900 uppercase tracking-tight">Kinetiq AI Health Systems</h1>
                  <p className="text-[10px] text-slate-400">Clinical Diagnostics and Recovery Analysis</p>
                </div>
                <div className="text-right text-[10px] text-slate-400 font-mono">
                  <p>DOC-ID: KNTQ-2026-081</p>
                  <p>Date: June 5, 2026</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[10px] bg-slate-50 p-4 rounded-xl text-slate-700">
                <div>
                  <p><span className="font-bold text-slate-900">Patient:</span> Alex Johnson (Age 28, Male)</p>
                  <p><span className="font-bold text-slate-900">Diagnosis:</span> Rotator Cuff Tendinitis (Right Shoulder)</p>
                </div>
                <div>
                  <p><span className="font-bold text-slate-900">Lead Therapist:</span> Dr. Sarah Mitchell (DPT, OCS)</p>
                  <p><span className="font-bold text-slate-900">Platform ID:</span> pat_1</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1 mb-2">1. Clinical Range of Motion Metrics</h3>
                <table className="w-full text-left text-[10px] text-slate-600">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-900">
                      <th className="py-1">Exercise Motion</th>
                      <th className="py-1">Initial (May 10)</th>
                      <th className="py-1">Current ROM</th>
                      <th className="py-1">Accuracy Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-1.5 font-bold">Right Shoulder Abduction</td>
                      <td className="py-1.5">45°</td>
                      <td className="py-1.5 text-blue-600 font-bold">92° / 120° target</td>
                      <td className="py-1.5 text-emerald-600 font-bold">94.1% (Excellent)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-1.5 font-bold">Internal Shoulder Rotation</td>
                      <td className="py-1.5">30°</td>
                      <td className="py-1.5 text-blue-600 font-bold">54° / 60° target</td>
                      <td className="py-1.5 text-emerald-600 font-bold">91.8% (Stable)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1 mb-2">2. Clinician Assessment Notes</h3>
                <p className="text-[10px] text-slate-600">
                  Patient exhibits stable progression in shoulder abduction capacity. Flexion boundary was restricted to 120° to limit right bicipital impingement risks. Movement tracking records show minimal lateral torso trunk sway, suggesting strong abdominal bracing during repetitions. Recommending continuation of current resistance band protocol.
                </p>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-slate-200 text-[9px] text-slate-400 font-mono">
                <p>Verified via Kinetiq Pose Estimation Engine 2.1</p>
                <div className="text-center">
                  <div className="h-6 w-24 border-b border-slate-300 mx-auto" />
                  <p className="mt-1 font-sans text-slate-950">Sarah Mitchell, DPT</p>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-3 border-t border-border bg-slate-50 dark:bg-slate-900/60 flex justify-end gap-2">
              <button 
                onClick={() => {
                  addNotification("Report Printed", "Report downloaded as PDF successfully.", "message");
                  setPdfReportOpen(false);
                }}
                className="h-9 px-4 rounded-xl bg-primary text-white text-[11px] font-semibold"
              >
                Print Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
