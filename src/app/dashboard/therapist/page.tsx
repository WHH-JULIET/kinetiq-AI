"use client";

import React, { useState } from "react";
import { 
  Users, Activity, ShieldAlert, Award, Search, Sparkles, 
  Send, User, Clock, CheckCircle, Plus, ChevronRight, X,
  FileText, MessageSquare, PlusCircle, AlertCircle, Phone, Mail
} from "lucide-react";
import { useApp, Patient } from "@/context/AppContext";
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, 
  CartesianGrid, BarChart, Bar 
} from "recharts";

export default function TherapistPortal() {
  const { 
    patients, setPatients, activeSession, messages, 
    sendMessage, addNotification 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  
  // Custom prescription inputs
  const [prescriptionInput, setPrescriptionInput] = useState("");
  const [newExerciseName, setNewExerciseName] = useState("");
  
  // Messaging inputs
  const [chatInput, setChatInput] = useState("");

  // Filter patients based on search
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendMessage("therapist", chatInput);
    setChatInput("");
  };

  const handlePrescribeExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExerciseName.trim() || !selectedPatient) return;

    setPatients(prev => 
      prev.map(p => {
        if (p.id === selectedPatient.id) {
          const updatedExercises = [...p.assignedExercises, newExerciseName.trim()];
          const updatedPatient = { ...p, assignedExercises: updatedExercises };
          // Keep local state updated
          setSelectedPatient(updatedPatient);
          return updatedPatient;
        }
        return p;
      })
    );

    addNotification(
      "Exercise Prescribed",
      `Prescribed ${newExerciseName} to ${selectedPatient.name}`,
      "recommendation"
    );

    setNewExerciseName("");
  };

  const handleUpdateTreatmentPlan = () => {
    if (!prescriptionInput.trim() || !selectedPatient) return;

    setPatients(prev => 
      prev.map(p => {
        if (p.id === selectedPatient.id) {
          const updatedPatient = { ...p, treatmentPlan: prescriptionInput.trim() };
          setSelectedPatient(updatedPatient);
          return updatedPatient;
        }
        return p;
      })
    );

    addNotification(
      "Treatment Plan Updated",
      `Saved clinical notes for ${selectedPatient.name}`,
      "recommendation"
    );

    setPrescriptionInput("");
  };

  // Metrics helper
  const totalPatients = patients.length;
  const avgRecovery = Math.round(patients.reduce((sum, p) => sum + p.recoveryScore, 0) / totalPatients);
  const highRiskCount = patients.filter(p => p.status === "High Risk").length;
  const activeCount = activeSession ? 1 : 0;

  return (
    <div className="space-y-6">
      {/* Clinician Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase text-secondary tracking-wider px-2 py-0.5 rounded-full bg-secondary/10 border border-secondary/10">
            Clinical Command Center
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground mt-2">
            Physiotherapy Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">Welcome, Dr. Sarah Mitchell. Manage your remote patients and active recovery compliance.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono block mb-1">Total Patients</span>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-primary flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-black text-foreground">{totalPatients}</h3>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono block mb-1">Active Live Sessions</span>
          <div className="flex items-center gap-3 mt-2">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${activeCount > 0 ? "bg-orange-500/10 text-orange-500" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
              <Activity className={`h-5 w-5 ${activeCount > 0 ? "animate-pulse" : ""}`} />
            </div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-2xl font-black text-foreground">{activeCount}</h3>
              {activeCount > 0 && <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />}
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono block mb-1">Avg recovery rate</span>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-success flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-black text-foreground">{avgRecovery}%</h3>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono block mb-1">High-Risk Patients</span>
          <div className="flex items-center gap-3 mt-2">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${highRiskCount > 0 ? "bg-red-500/10 text-red-500" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-black text-foreground">{highRiskCount}</h3>
          </div>
        </div>
      </div>

      {/* REAL-TIME SESSION MONITORING PANEL */}
      {activeSession && (
        <div className="bg-card border-2 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-card rounded-3xl p-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-orange-500 text-white font-mono text-[9px] px-3 py-1 rounded-bl-2xl uppercase tracking-wider flex items-center gap-1 animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
            Live Telemetry feed
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-6">
            {/* Session Stats */}
            <div className="lg:w-2/3 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-orange-500 uppercase font-mono">Real-time Patient Monitoring</span>
                <h3 className="text-lg font-black text-foreground mt-1">
                  Active Session: {activeSession.patientName}
                </h3>
                <p className="text-xs text-muted-foreground">Monitoring posture accuracy vectors for <span className="font-semibold text-foreground">{activeSession.exerciseName}</span>.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-background/60 border border-border rounded-2xl">
                  <p className="text-[9px] text-muted-foreground uppercase font-mono">Repetition</p>
                  <p className="text-base font-black text-foreground mt-0.5">{activeSession.repCount} / 10</p>
                </div>
                <div className="p-3 bg-background/60 border border-border rounded-2xl">
                  <p className="text-[9px] text-muted-foreground uppercase font-mono">Accuracy</p>
                  <p className={`text-base font-black mt-0.5 ${activeSession.accuracy > 85 ? "text-emerald-500" : "text-red-500 animate-pulse"}`}>
                    {activeSession.accuracy}%
                  </p>
                </div>
                <div className="p-3 bg-background/60 border border-border rounded-2xl">
                  <p className="text-[9px] text-muted-foreground uppercase font-mono">Joint Angle</p>
                  <p className="text-base font-black text-secondary mt-0.5">{activeSession.jointAngle}°</p>
                </div>
                <div className="p-3 bg-background/60 border border-border rounded-2xl">
                  <p className="text-[9px] text-muted-foreground uppercase font-mono">Posture Check</p>
                  <p className={`text-xs font-bold mt-1 ${activeSession.postureStatus === "Correct" ? "text-success" : "text-red-500 animate-pulse"}`}>
                    {activeSession.postureStatus === "Correct" ? "Correct ROM" : "CORRECTION WARNING"}
                  </p>
                </div>
              </div>

              {activeSession.alerts.length > 0 && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-2xl flex items-start gap-2">
                  <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Posture Deviation Alerts Logged</p>
                    <ul className="list-disc list-inside text-[10px] opacity-90 mt-1 font-mono">
                      {activeSession.alerts.map((al, idx) => (
                        <li key={idx}>{al}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Live Feedback Chat */}
            <div className="lg:w-1/3 border-t lg:border-t-0 lg:border-l border-border/80 pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block mb-2">Live Session Correction Notes</span>
                <div className="h-28 overflow-y-auto space-y-2 border border-border/60 bg-background/40 p-2.5 rounded-xl text-[10px] leading-relaxed">
                  {messages.slice(-3).map((msg) => (
                    <p key={msg.id}>
                      <span className={`font-bold ${msg.sender === "therapist" ? "text-secondary" : "text-primary"}`}>
                        {msg.sender === "therapist" ? "Sarah Mitchell: " : "Alex Johnson: "}
                      </span>
                      {msg.text}
                    </p>
                  ))}
                </div>
              </div>
              <form onSubmit={handleSendMessage} className="mt-3 flex gap-1.5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Send live posture note..."
                  className="flex-1 h-9 px-3 rounded-lg border border-border bg-card text-[11px] focus:outline-none text-foreground"
                />
                <button type="submit" className="h-9 w-9 bg-primary text-white rounded-lg flex items-center justify-center">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* PATIENT DIRECTORY & CASHELOAD VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Caseload list (7 cols) */}
        <div className="lg:col-span-7 bg-card border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-foreground">Patient Case Caseload</h3>
              <p className="text-xs text-muted-foreground">Select a patient to prescribe exercises and review records.</p>
            </div>
            
            {/* Search */}
            <div className="flex items-center gap-2 px-3 h-10 w-full sm:w-56 rounded-xl border border-border bg-background/40 text-slate-400">
              <Search className="h-4 w-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name/diagnosis..."
                className="bg-transparent text-xs w-full focus:outline-none text-foreground"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredPatients.map((p) => {
              // Status Badge styling
              const badgeStyle = {
                "Stable": "border-emerald-500/20 bg-emerald-500/5 text-success",
                "Needs Review": "border-amber-500/20 bg-amber-500/5 text-warning",
                "High Risk": "border-red-500/20 bg-red-500/5 text-red-500 animate-pulse"
              }[p.status];

              return (
                <div 
                  key={p.id}
                  onClick={() => setSelectedPatient(p)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md ${
                    selectedPatient?.id === p.id 
                      ? "border-primary bg-primary/5 shadow-sm shadow-primary/5" 
                      : "border-border bg-card/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="h-10 w-10 rounded-full border border-border object-cover"
                    />
                    <div className="overflow-hidden max-w-[200px]">
                      <h4 className="text-xs font-bold text-foreground truncate">{p.name}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{p.diagnosis}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="hidden sm:block w-32 shrink-0">
                    <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono mb-1">
                      <span>ROM Score</span>
                      <span className="font-bold text-foreground">{p.recoveryScore}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full" 
                        style={{ width: `${p.recoveryScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold ${badgeStyle}`}>
                      {p.status}
                    </span>
                    <ChevronRight className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Patient Details (5 cols) */}
        <div className="lg:col-span-5">
          {selectedPatient ? (
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-6">
              
              {/* Header profile info */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPatient.avatar}
                    alt={selectedPatient.name}
                    className="h-12 w-12 rounded-full border border-border object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{selectedPatient.name}</h3>
                    <p className="text-[10px] text-muted-foreground">Age {selectedPatient.age} | {selectedPatient.gender}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="p-1 rounded-lg border border-border hover:bg-slate-50 text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Contacts info */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-border/40 grid grid-cols-2 gap-3 text-[10px] text-slate-600 dark:text-slate-400">
                <p className="flex items-center gap-1.5 truncate">
                  <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{selectedPatient.phone}</span>
                </p>
                <p className="flex items-center gap-1.5 truncate">
                  <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{selectedPatient.email}</span>
                </p>
              </div>

              {/* Treatment details tab items */}
              <div className="space-y-4 font-sans text-xs">
                
                {/* Medical History */}
                <div>
                  <h4 className="font-bold text-foreground text-xs border-b border-border pb-1 mb-2">Medical History & Diagnosis</h4>
                  <p className="text-[10px] text-slate-500 font-bold mb-1.5">{selectedPatient.diagnosis}</p>
                  <ul className="list-disc list-inside text-[10px] text-slate-600 dark:text-slate-400 space-y-1">
                    {selectedPatient.medicalHistory.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Treatment plan description */}
                <div>
                  <h4 className="font-bold text-foreground text-xs border-b border-border pb-1 mb-2">Prescribed Plan Summary</h4>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/30 p-2.5 rounded-xl border border-border/40">
                    {selectedPatient.treatmentPlan}
                  </p>
                </div>

                {/* Prescribed exercises list */}
                <div>
                  <h4 className="font-bold text-foreground text-xs border-b border-border pb-1 mb-2">Prescribed Active Sets</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPatient.assignedExercises.map((ex) => (
                      <span key={ex} className="px-2 py-1 bg-blue-500/10 text-primary border border-primary/10 rounded-lg text-[9px] font-bold">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Prescribe new exercise form */}
                <form onSubmit={handlePrescribeExercise} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-border/40 space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase font-mono block">Prescribe New Exercise</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newExerciseName}
                      onChange={(e) => setNewExerciseName(e.target.value)}
                      placeholder="e.g. Quad Sets, External Rotation"
                      required
                      className="flex-1 h-9 px-3 rounded-lg border border-border bg-card text-[10px] focus:outline-none text-foreground"
                    />
                    <button
                      type="submit"
                      className="h-9 px-3 bg-primary text-white rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0"
                    >
                      <Plus className="h-3.5 w-3.5" /> Assign
                    </button>
                  </div>
                </form>

                {/* Edit Clinical notes plan */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-border/40 space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase font-mono block">Update Clinical Treatment Plan</label>
                  <textarea
                    value={prescriptionInput}
                    onChange={(e) => setPrescriptionInput(e.target.value)}
                    placeholder="Write clinical recommendations or limits..."
                    className="w-full h-16 p-2 rounded-lg border border-border bg-card text-[10px] focus:outline-none text-foreground resize-none"
                  />
                  <button
                    type="button"
                    onClick={handleUpdateTreatmentPlan}
                    className="w-full h-8 bg-card border border-border text-foreground hover:bg-slate-50 rounded-lg text-[10px] font-bold"
                  >
                    Save Clinical Plan
                  </button>
                </div>

              </div>

            </div>
          ) : (
            <div className="bg-card border border-dashed border-border rounded-3xl p-8 text-center text-slate-400 h-full flex flex-col justify-center items-center">
              <User className="h-10 w-10 text-slate-300 dark:text-slate-700 mb-3" />
              <h4 className="font-bold text-xs text-foreground mb-1">No Patient Selected</h4>
              <p className="text-[10px] max-w-[200px] leading-relaxed">Click on a patient to inspect medical records and update their treatment protocols.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
