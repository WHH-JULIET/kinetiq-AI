"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Activity, User, Users, Lock, Sun, Moon, Bell, Search, 
  Menu, X, LogOut, Brain, Camera, Settings, MessageSquare, Award
} from "lucide-react";
import { useApp, UserRole } from "@/context/AppContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    role, setRole, notifications, markAllNotificationsRead, 
    activeSession, messages 
  } = useApp();

  const [isDark, setIsDark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    setIsDark(document.body.classList.contains("dark"));
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

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextRole = e.target.value as UserRole;
    setRole(nextRole);
    if (nextRole === "patient") {
      router.push("/dashboard/patient");
    } else if (nextRole === "therapist") {
      router.push("/dashboard/therapist");
    } else {
      router.push("/dashboard/admin");
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Define sidebar menu options based on active role
  const menuItems: Record<
    UserRole,
    { name: string; href: string; icon: React.ComponentType<any>; highlight?: boolean }[]
  > = {
    patient: [
      { name: "My Dashboard", href: "/dashboard/patient", icon: User },
      { name: "AR Training Screen", href: "/training", icon: Camera, highlight: true },
      { name: "AI Insights & Twin", href: "/dashboard/ai-insights", icon: Brain },
    ],
    therapist: [
      { name: "Therapist Portal", href: "/dashboard/therapist", icon: Users },
      { name: "AI Insights & Twin", href: "/dashboard/ai-insights", icon: Brain },
    ],
    admin: [
      { name: "Admin Dashboard", href: "/dashboard/admin", icon: Lock },
      { name: "AI Insights & Twin", href: "/dashboard/ai-insights", icon: Brain },
    ]
  };


  const currentMenu = menuItems[role] || menuItems.patient;

  // Active user details
  const userProfile = {
    patient: { name: "Alex Johnson", email: "alex.johnson@kinetiq.ai", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces" },
    therapist: { name: "Dr. Sarah Mitchell", email: "sarah.mitchell@kinetiq.ai", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces" },
    admin: { name: "Admin Console", email: "admin@kinetiq.ai", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=faces" }
  }[role];

  return (
    <div className="min-h-screen flex bg-background transition-colors duration-300 relative">
      {/* Background grids */}
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 border-r border-border bg-card/60 backdrop-blur-md flex-col z-30 shrink-0">
        <div className="h-16 border-b border-border flex items-center px-6 gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center">
            <Activity className="h-4.5 w-4.5" />
          </div>
          <span className="font-bold tracking-tight text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Kinetiq AI
          </span>
        </div>

        {/* User Badge */}
        <div className="p-4 mx-3 my-4 rounded-2xl border border-border bg-card flex items-center gap-3">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="h-10 w-10 rounded-full border border-border object-cover bg-slate-200"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-foreground truncate">{userProfile.name}</p>
            <p className="text-[10px] text-muted-foreground truncate">{userProfile.email}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-2 space-y-1">
          {currentMenu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 h-11 rounded-xl text-xs font-medium transition-all ${
                  item.highlight
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/10 hover:opacity-95"
                    : active
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${item.highlight ? "" : active ? "text-primary" : ""}`} />
                <span>{item.name}</span>
                {item.highlight && (
                  <span className="ml-auto flex h-2 w-2 rounded-full bg-success animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-border/60">
          {/* Quick Info */}
          {activeSession && (
            <div className="mb-4 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px]">
              <span className="font-bold flex items-center gap-1.5 animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Live Session Active
              </span>
              <p className="mt-0.5 font-medium truncate text-foreground">{activeSession.exerciseName}</p>
            </div>
          )}

          <Link
            href="/"
            className="flex items-center gap-3 px-4 h-10 rounded-xl text-xs font-medium text-red-500 hover:bg-red-500/5 transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          
          <aside className="relative w-64 max-w-xs bg-card flex flex-col z-50 h-full border-r border-border p-4">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-primary" />
                <span className="font-bold">Kinetiq AI</span>
              </div>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-1 rounded-lg border border-border">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 py-4 border-b border-border/60">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="h-10 w-10 rounded-full border border-border object-cover"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate">{userProfile.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{userProfile.email}</p>
              </div>
            </div>

            <nav className="flex-1 py-4 space-y-1">
              {currentMenu.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 h-11 rounded-xl text-xs font-medium transition-all ${
                      item.highlight
                        ? "bg-gradient-to-r from-primary to-secondary text-white"
                        : active
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/"
              className="flex items-center gap-3 px-4 h-10 rounded-xl text-xs font-medium text-red-500"
            >
              <LogOut className="h-4.5 w-4.5" />
              <span>Sign Out</span>
            </Link>
          </aside>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        {/* Topbar */}
        <header className="h-16 border-b border-border/40 bg-card/60 backdrop-blur-md flex items-center justify-between px-6 shrink-0 relative z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-border text-foreground bg-card"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 px-3 h-10 w-64 rounded-xl border border-border bg-background/50 text-slate-400">
              <Search className="h-4 w-4 shrink-0" />
              <input
                type="text"
                placeholder="Search patient metrics, exercises..."
                className="bg-transparent text-xs w-full focus:outline-none text-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Demo Role Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl border border-primary/20 bg-primary/5 mr-2">
              <span className="text-[10px] font-mono text-primary font-bold px-1.5 hidden md:inline">DEMO ROLE:</span>
              <select
                value={role}
                onChange={handleRoleChange}
                className="bg-transparent text-[11px] font-bold text-primary focus:outline-none cursor-pointer pr-1"
              >
                <option value="patient" className="text-foreground font-sans">Patient (Alex)</option>
                <option value="therapist" className="text-foreground font-sans">Therapist (Dr. Sarah)</option>
                <option value="admin" className="text-foreground font-sans">Admin Console</option>
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-border bg-background/50 hover:bg-card text-foreground transition-colors"
            >
              {isDark ? <Sun className="h-4.5 w-4.5 text-amber-500" /> : <Moon className="h-4.5 w-4.5 text-slate-700" />}
            </button>

            {/* Notifications panel toggle */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-xl border border-border bg-background/50 hover:bg-card text-foreground transition-colors relative"
              >
                <Bell className="h-4.5 w-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white font-bold flex items-center justify-center border border-card">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-card border border-border rounded-2xl shadow-xl z-50 p-4 max-h-[400px] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                    <span className="text-xs font-bold text-foreground">Notifications</span>
                    <button
                      onClick={() => {
                        markAllNotificationsRead();
                        setShowNotifications(false);
                      }}
                      className="text-[10px] text-primary hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="space-y-3">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-center text-slate-400 py-6">No notifications</p>
                    ) : (
                      notifications.map((notif) => {
                        // Badge color mapping
                        const badgeColor = {
                          reminder: "bg-blue-500/10 text-blue-500",
                          alert: "bg-red-500/10 text-red-500",
                          message: "bg-cyan-500/10 text-cyan-500",
                          achievement: "bg-emerald-500/10 text-success",
                          recommendation: "bg-amber-500/10 text-warning"
                        }[notif.type] || "bg-slate-500/10 text-slate-500";

                        return (
                          <div 
                            key={notif.id} 
                            className={`p-2.5 rounded-xl border flex gap-3 transition-colors ${
                              notif.read ? "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40" : "border-primary/10 bg-primary/5"
                            }`}
                          >
                            <div className={`h-8 w-8 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-bold uppercase ${badgeColor}`}>
                              {notif.type.slice(0, 2)}
                            </div>
                            <div className="overflow-hidden">
                              <p className="text-xs font-bold text-foreground truncate">{notif.title}</p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5">{notif.description}</p>
                              <span className="text-[9px] text-muted-foreground mt-1 block font-mono">{notif.time}</span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
