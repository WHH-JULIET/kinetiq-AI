"use client";

import React, { useState } from "react";
import { 
  Brain, Activity, ShieldCheck, Zap, Award, Sparkles, 
  HelpCircle, ChevronRight, CornerDownRight, Heart, BarChart2
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, LineChart, Line, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar 
} from "recharts";

export default function AIInsightsPage() {
  const [selectedJoint, setSelectedJoint] = useState<"shoulder" | "knee" | "back" | "ankle">("shoulder");

  // Joint diagnostic database
  const jointDiagnostics = {
    shoulder: {
      name: "Right Shoulder (Rotator Cuff)",
      status: "Progressing",
      rom: "92° (Target: 120°)",
      accuracy: "94.1%",
      risk: "Low (12%)",
      confidence: "98.2%",
      notes: "Rotator cuff impingement risk is mitigated. Range of motion (ROM) is expanding steadily. Lateral stability remains intact.",
      recommendations: "Continue shoulder abduction exercises caps at 120°. Avoid active overhead lift past 140° for another 10 days."
    },
    knee: {
      name: "Left Knee (Post-op ACL)",
      status: "Needs Review",
      rom: "76° (Target: 140°)",
      accuracy: "88.4%",
      risk: "Moderate (48%)",
      confidence: "96.5%",
      notes: "Exhibits slight valgus drift (knee bending inward) during eccentric squat phase. Quad activation is stabilizing but fatigued.",
      recommendations: "Focus on terminal extension quadriceps sets. Use lateral guide overlays in AR screen to correct knee drift."
    },
    back: {
      name: "Lumbar Spine (L4-L5 Herniation)",
      status: "High Risk",
      rom: "N/A (Stabilizing)",
      accuracy: "79.2%",
      risk: "High (78%)",
      confidence: "92.1%",
      notes: "Severe lumbar compression warning. Discontinue lumbar flexion or twisting. Compensatory lateral trunk sway observed.",
      recommendations: "Discontinue all load bearing flexion. Focus on isometric bird-dog stabilization and neutral pelvic tilts."
    },
    ankle: {
      name: "Right Ankle (Grade II Sprain)",
      status: "Near Recovery",
      rom: "38° (Target: 45°)",
      accuracy: "95.6%",
      risk: "Minimal (5%)",
      confidence: "98.9%",
      notes: "Lateral ankle stability is restored. Balance tracking shows solid center of gravity alignment during single-leg stance.",
      recommendations: "Progress to plyometric stabilization drills. Gradual return to light athletic load bearing."
    }
  };

  const activeJoint = jointDiagnostics[selectedJoint];

  // Mock radar datasets for joint ranges of motion
  const radarData = [
    { subject: "Abduction", A: 92, B: 120, fullMark: 150 },
    { subject: "Adduction", A: 45, B: 50, fullMark: 150 },
    { subject: "Int Rotation", A: 54, B: 60, fullMark: 150 },
    { subject: "Ext Rotation", A: 68, B: 80, fullMark: 150 },
    { subject: "Flexion", A: 110, B: 180, fullMark: 150 },
    { subject: "Extension", A: 42, B: 50, fullMark: 150 }
  ];

  // Recovery Prediction Curve (ROM vs Days)
  const recoveryPredictionData = [
    { day: "Day 0", score: 45, pain: 7 },
    { day: "Day 7", score: 55, pain: 6 },
    { day: "Day 14", score: 68, pain: 4 },
    { day: "Day 21", score: 82, pain: 2 },
    { day: "Day 28 (Est)", score: 95, pain: 1 },
    { day: "Day 35 (Full)", score: 100, pain: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase text-primary tracking-wider px-2 py-0.5 rounded-full bg-primary/10 border border-primary/10">
          AI Bio-Mechanic Diagnostic Engine
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground mt-2">
          AI Insights & Digital Twin
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">Explore your interactive body digital twin and predictive recovery curves compiled by computer vision telemetry.</p>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* INTERACTIVE DIGITAL TWIN VECTOR (5 cols) */}
        <div className="lg:col-span-5 bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between items-center text-center">
          <div className="w-full text-left">
            <h3 className="text-sm font-bold text-foreground">Interactive Digital Twin Model</h3>
            <p className="text-[10px] text-muted-foreground">Click on the glowing joint targets to review telemetry reports.</p>
          </div>

          {/* Body SVG Vector */}
          <div className="my-8 relative w-56 h-[380px] bg-slate-900/15 dark:bg-slate-900/35 rounded-2xl flex items-center justify-center p-4">
            
            <svg 
              className="w-full h-full text-slate-300 dark:text-slate-700" 
              viewBox="0 0 100 200" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Human Outline silhouette mockup */}
              {/* Head */}
              <circle cx="50" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
              {/* Neck */}
              <line x1="50" y1="32" x2="50" y2="40" stroke="currentColor" strokeWidth="1.5" />
              {/* Shoulders */}
              <line x1="32" y1="40" x2="68" y2="40" stroke="currentColor" strokeWidth="1.5" />
              {/* Spine */}
              <line x1="50" y1="40" x2="50" y2="95" stroke="currentColor" strokeWidth="1.5" />
              {/* Left Arm */}
              <line x1="32" y1="40" x2="22" y2="70" stroke="currentColor" strokeWidth="1.5" />
              <line x1="22" y1="70" x2="16" y2="95" stroke="currentColor" strokeWidth="1.5" />
              {/* Right Arm */}
              <line x1="68" y1="40" x2="78" y2="70" stroke="currentColor" strokeWidth="1.5" />
              <line x1="78" y1="70" x2="84" y2="95" stroke="currentColor" strokeWidth="1.5" />
              {/* Hips */}
              <line x1="38" y1="95" x2="62" y2="95" stroke="currentColor" strokeWidth="1.5" />
              {/* Left Leg */}
              <line x1="38" y1="95" x2="35" y2="140" stroke="currentColor" strokeWidth="1.5" />
              <line x1="35" y1="140" x2="33" y2="185" stroke="currentColor" strokeWidth="1.5" />
              {/* Right Leg */}
              <line x1="62" y1="95" x2="65" y2="140" stroke="currentColor" strokeWidth="1.5" />
              <line x1="65" y1="140" x2="67" y2="185" stroke="currentColor" strokeWidth="1.5" />

              {/* INTERACTIVE GLOWING JOINT BUTTONS */}
              
              {/* Right Shoulder (selectedJoint === 'shoulder') */}
              <g className="cursor-pointer" onClick={() => setSelectedJoint("shoulder")}>
                <circle 
                  cx="68" 
                  cy="40" 
                  r="6" 
                  fill={selectedJoint === "shoulder" ? "#2563EB" : "rgba(37, 99, 235, 0.4)"} 
                  className={selectedJoint === "shoulder" ? "joint-pulse" : ""}
                />
                <circle cx="68" cy="40" r="10" stroke="#2563EB" strokeWidth="1" fill="none" opacity="0.3" />
              </g>

              {/* Spine/Back */}
              <g className="cursor-pointer" onClick={() => setSelectedJoint("back")}>
                <circle 
                  cx="50" 
                  cy="68" 
                  r="6" 
                  fill={selectedJoint === "back" ? "#EF4444" : "rgba(239, 68, 68, 0.4)"} 
                  className={selectedJoint === "back" ? "joint-pulse" : ""}
                />
                <circle cx="50" cy="68" r="10" stroke="#EF4444" strokeWidth="1" fill="none" opacity="0.3" />
              </g>

              {/* Left Knee */}
              <g className="cursor-pointer" onClick={() => setSelectedJoint("knee")}>
                <circle 
                  cx="35" 
                  cy="140" 
                  r="6" 
                  fill={selectedJoint === "knee" ? "#F59E0B" : "rgba(245, 158, 11, 0.4)"} 
                  className={selectedJoint === "knee" ? "joint-pulse" : ""}
                />
                <circle cx="35" cy="140" r="10" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.3" />
              </g>

              {/* Right Ankle */}
              <g className="cursor-pointer" onClick={() => setSelectedJoint("ankle")}>
                <circle 
                  cx="67" 
                  cy="185" 
                  r="6" 
                  fill={selectedJoint === "ankle" ? "#22C55E" : "rgba(34, 197, 94, 0.4)"} 
                  className={selectedJoint === "ankle" ? "joint-pulse" : ""}
                />
                <circle cx="67" cy="185" r="10" stroke="#22C55E" strokeWidth="1" fill="none" opacity="0.3" />
              </g>
            </svg>

            {/* Glowing Scan Box HUD corners */}
            <div className="absolute top-2 left-2 h-4 w-4 border-t-2 border-l-2 border-primary/40" />
            <div className="absolute top-2 right-2 h-4 w-4 border-t-2 border-r-2 border-primary/40" />
            <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-primary/40" />
            <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-primary/40" />
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border border-border/40 rounded-2xl w-full text-left">
            <span className="text-[9px] text-muted-foreground uppercase font-mono">Twin Sync Status</span>
            <p className="text-xs font-bold text-success flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-ping" />
              Medical Grade Vector Sync Active
            </p>
          </div>
        </div>

        {/* DIagnostics HUD Details panel (7 cols) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          
          {/* Joint Metrics Diagnostic Readout */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm space-y-4">
            <div>
              <span className="text-[10px] font-bold text-primary uppercase font-mono">Joint Telemetry Diagnostics</span>
              <h3 className="text-base font-bold text-foreground mt-1">
                {activeJoint.name}
              </h3>
            </div>

            {/* Diagnostic Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 border border-border rounded-2xl">
                <p className="text-[9px] text-muted-foreground uppercase font-mono">ROM Angle</p>
                <p className="text-sm font-black text-foreground mt-0.5 truncate">{activeJoint.rom}</p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 border border-border rounded-2xl">
                <p className="text-[9px] text-muted-foreground uppercase font-mono">Pose Accuracy</p>
                <p className="text-sm font-black text-foreground mt-0.5">{activeJoint.accuracy}</p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 border border-border rounded-2xl">
                <p className="text-[9px] text-muted-foreground uppercase font-mono">Injury Risk</p>
                <p className="text-sm font-black text-red-500 mt-0.5">{activeJoint.risk}</p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 border border-border rounded-2xl">
                <p className="text-[9px] text-muted-foreground uppercase font-mono">AI Confidence</p>
                <p className="text-sm font-black text-secondary mt-0.5">{activeJoint.confidence}</p>
              </div>
            </div>

            {/* Description & Plan recommendations */}
            <div className="space-y-3 font-sans text-xs">
              <div>
                <p className="text-[10px] font-bold text-slate-400">Clinical Telemetry Assessment</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-normal">
                  {activeJoint.notes}
                </p>
              </div>
              <div className="p-3 bg-blue-500/5 border border-primary/10 rounded-2xl flex items-start gap-2.5">
                <Zap className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-foreground">Smart AI Guidance Recommendation</p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 leading-normal">
                    {activeJoint.recommendations}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Predictive Recovery Curves (recharts charts) */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground">Predictive Recovery Curves</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Calculated by modeling your current ROM growth against clinical rehab databases.</p>
            </div>

            <div className="h-48 w-full bg-background/40 rounded-2xl border border-border p-2 mt-4 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={recoveryPredictionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tick={{ fontSize: 9 }} stroke="rgba(156, 163, 175, 0.5)" />
                  <YAxis tick={{ fontSize: 9 }} stroke="rgba(156, 163, 175, 0.5)" />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8, background: "#111827", border: "1px solid #1f2937", color: "#fff" }} />
                  <Line type="monotone" dataKey="score" name="ROM Score Prediction" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="pain" name="Pain Level Projection" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-slate-500 text-center mt-2 leading-relaxed">
              ML algorithms project that sticking to daily prescribed workouts will decrease pain score to <span className="font-bold text-success">0/10 in 35 days</span>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
