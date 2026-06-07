"use client";

import React, { useState } from "react";
import { 
  Lock, Settings, Activity, ShieldCheck, Database, HardDrive, 
  Cpu, Users, Server, AlertTriangle, RefreshCw, CheckCircle 
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  CartesianGrid, LineChart, Line, BarChart, Bar 
} from "recharts";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"users" | "logs">("users");

  // Mock server load metric data
  const serverMetrics = [
    { time: "09:00", cpu: 34, gpu: 58, latency: 12 },
    { time: "09:30", cpu: 42, gpu: 62, latency: 14 },
    { time: "10:00", cpu: 48, gpu: 76, latency: 18 },
    { time: "10:30", cpu: 55, gpu: 82, latency: 22 },
    { time: "11:00", cpu: 40, gpu: 60, latency: 13 },
    { time: "11:30", cpu: 38, gpu: 56, latency: 11 }
  ];

  // User Accounts
  const usersDb = [
    { id: "usr_1", name: "Alex Johnson", email: "alex.johnson@kinetiq.ai", role: "Patient", status: "Active", rom: "92%" },
    { id: "usr_2", name: "Dr. Sarah Mitchell", email: "sarah.mitchell@kinetiq.ai", role: "Physiotherapist", status: "Active", rom: "N/A" },
    { id: "usr_3", name: "Marcus Brody", email: "marcus.brody@kinetiq.ai", role: "Patient", status: "Active", rom: "41%" },
    { id: "usr_4", name: "Emily Chen", email: "emily.chen@kinetiq.ai", role: "Patient", status: "Active", rom: "91%" },
    { id: "usr_5", name: "Admin Console", email: "admin@kinetiq.ai", role: "Administrator", status: "Active", rom: "N/A" }
  ];

  // Mock Audit Logs
  const auditLogs = [
    { id: "1", action: "User Role Update", user: "Admin Console", details: "Assigned role 'Physiotherapist' to Dr. Sarah Mitchell", time: "10m ago" },
    { id: "2", action: "Model Deployment", user: "System Auto", details: "Finalized update for Pose Estimation Engine v2.1.0", time: "45m ago" },
    { id: "3", action: "Data Encryption Check", user: "Security Suite", details: "All patient database read/writes encrypted (AES-256)", time: "2h ago" },
    { id: "4", action: "API Limit Warning", user: "Cloud Monitor", details: "Endpoint /api/v1/pose spikes to 22ms latency during session peak", time: "4d ago" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase text-slate-800 dark:text-slate-200 tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          Infrastructure Administration
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground mt-2">
          Administrator Console
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">Audit system security logs, API latency metrics, active server nodes, and user accounts.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono block mb-1">API Node Latency</span>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-primary flex items-center justify-center">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-foreground">13.2ms</h3>
              <p className="text-[9px] text-success font-semibold flex items-center gap-0.5 mt-0.5">
                <CheckCircle className="h-3 w-3" /> Nominal
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono block mb-1">Model Inference Speed</span>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-secondary flex items-center justify-center">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-foreground">14ms</h3>
              <p className="text-[9px] text-slate-400 font-mono mt-0.5">60 FPS skeletal parse</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono block mb-1">Database storage</span>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-foreground">14.8 GB</h3>
              <p className="text-[9px] text-slate-400 font-mono mt-0.5">Encrypted backups ok</p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
          <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono block mb-1">Infrastructure Load</span>
          <div className="flex items-center gap-3 mt-2">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-success flex items-center justify-center">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-foreground">42.4%</h3>
              <p className="text-[9px] text-slate-400 font-mono mt-0.5">CPU/GPU Load scale-in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recharts Analytics Panel */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-foreground">Cloud Inference & API Metrics</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Tracking GPU processing loads and API response latencies during active training feeds.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* CPU / GPU utilization */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase font-mono">Infrastructure Resource Loads %</p>
            <div className="h-48 w-full bg-background/40 rounded-2xl border border-border p-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={serverMetrics} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gpuGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" tick={{ fontSize: 9 }} stroke="rgba(156, 163, 175, 0.5)" />
                  <YAxis tick={{ fontSize: 9 }} stroke="rgba(156, 163, 175, 0.5)" />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8, background: "#111827", border: "1px solid #1f2937", color: "#fff" }} />
                  <Area type="monotone" dataKey="cpu" name="CPU Load %" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#cpuGrad)" />
                  <Area type="monotone" dataKey="gpu" name="GPU ROM Engine Load %" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#gpuGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* API Endpoint Latency */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase font-mono">Endpoint /api/v1/pose Latency (ms)</p>
            <div className="h-48 w-full bg-background/40 rounded-2xl border border-border p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={serverMetrics} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="time" tick={{ fontSize: 9 }} stroke="rgba(156, 163, 175, 0.5)" />
                  <YAxis tick={{ fontSize: 9 }} stroke="rgba(156, 163, 175, 0.5)" />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8, background: "#111827", border: "1px solid #1f2937", color: "#fff" }} />
                  <Line type="monotone" dataKey="latency" name="Latency (ms)" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* USER DATABASE & AUDIT LOGS SWITCH PANEL */}
      <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
        <div className="flex border-b border-border mb-6">
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-3 text-xs font-bold transition-all px-4 ${
              activeTab === "users" 
                ? "border-b-2 border-primary text-primary font-black" 
                : "text-slate-500 hover:text-foreground"
            }`}
          >
            User Database
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`pb-3 text-xs font-bold transition-all px-4 ${
              activeTab === "logs" 
                ? "border-b-2 border-primary text-primary font-black" 
                : "text-slate-500 hover:text-foreground"
            }`}
          >
            Audit System Logs
          </button>
        </div>

        {activeTab === "users" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-border/80 text-muted-foreground font-mono text-[10px] uppercase">
                  <th className="pb-3 font-semibold">User Account</th>
                  <th className="pb-3 font-semibold">System Access</th>
                  <th className="pb-3 font-semibold">Caseload Score</th>
                  <th className="pb-3 font-semibold">Account Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-foreground">
                {usersDb.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="py-3">
                      <p className="font-bold">{user.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{user.email}</p>
                    </td>
                    <td className="py-3 font-semibold text-slate-600 dark:text-slate-400">{user.role}</td>
                    <td className="py-3 font-mono font-bold text-secondary">{user.rom}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-success text-[10px] font-bold border border-emerald-500/10">
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-4 font-mono text-[11px] leading-normal text-slate-600 dark:text-slate-400">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-border/40 flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[9px] tracking-wide uppercase text-slate-500">
                      {log.action}
                    </span>
                    <span>| Triggered by: {log.user}</span>
                  </p>
                  <p className="mt-1 opacity-90 text-[10px] leading-relaxed">{log.details}</p>
                </div>
                <span className="text-[9px] text-slate-400 shrink-0 mt-0.5">{log.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
