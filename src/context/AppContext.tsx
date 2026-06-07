"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types definition
export type UserRole = "patient" | "therapist" | "admin";

export interface Message {
  id: string;
  sender: "patient" | "therapist";
  text: string;
  timestamp: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  color: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  recoveryScore: number;
  painLevel: number;
  assignedExercises: string[];
  lastSessionDate: string;
  status: "Stable" | "High Risk" | "Needs Review";
  riskScore: number; // 0 to 100
  phone: string;
  email: string;
  avatar: string;
  medicalHistory: string[];
  treatmentPlan: string;
  timeline: { date: string; score: number; pain: number }[];
  exerciseCompletionRate: number; // percentage
}

export interface ActiveSession {
  patientId: string;
  patientName: string;
  exerciseName: string;
  duration: number; // seconds
  repCount: number;
  accuracy: number; // 0 to 100
  jointAngle: number; // degrees
  postureStatus: "Correct" | "Incorrect";
  voiceGuidance: string;
  alerts: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "reminder" | "alert" | "message" | "achievement" | "recommendation";
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  activeSession: ActiveSession | null;
  startLiveSession: (patientId: string, exerciseName: string) => void;
  updateLiveSessionMetrics: (metrics: Partial<ActiveSession>) => void;
  stopLiveSession: () => void;
  messages: Message[];
  sendMessage: (sender: "patient" | "therapist", text: string) => void;
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  notifications: NotificationItem[];
  addNotification: (title: string, description: string, type: NotificationItem["type"]) => void;
  markAllNotificationsRead: () => void;
  streakCount: number;
  setStreakCount: (count: number) => void;
  weeklyGoal: { completed: number; target: number };
  setWeeklyGoal: React.Dispatch<React.SetStateAction<{ completed: number; target: number }>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>("patient");
  const [streakCount, setStreakCount] = useState<number>(5);
  const [weeklyGoal, setWeeklyGoal] = useState({ completed: 3, target: 5 });

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "Exercise Reminder",
      description: "Time for your daily Rotator Cuff Abduction exercises.",
      time: "10m ago",
      read: false,
      type: "reminder"
    },
    {
      id: "2",
      title: "Dr. Sarah Mitchell",
      description: "Great progress on your elbow extension range of motion! Keep it up.",
      time: "2h ago",
      read: false,
      type: "message"
    },
    {
      id: "3",
      title: "New AI Recommendation",
      description: "Based on posture analysis, decrease squat depth by 5cm to protect your knees.",
      time: "1d ago",
      read: true,
      type: "recommendation"
    },
    {
      id: "4",
      title: "Goal Reached!",
      description: "Completed 3 sessions this week. You earned the perfect consistency badge.",
      time: "2d ago",
      read: true,
      type: "achievement"
    }
  ]);

  // Gamification achievements
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "streak7",
      title: "7-Day Recovery Streak",
      description: "Complete your assigned sessions for 7 consecutive days",
      icon: "Flame",
      unlocked: false,
      color: "from-orange-500 to-red-500"
    },
    {
      id: "recoveryChamp",
      title: "30-Day Recovery Champion",
      description: "Stick to your physical rehabilitation program for a month",
      icon: "Award",
      unlocked: false,
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: "perfectPosture",
      title: "Perfect Posture Award",
      description: "Achieve over 95% posture accuracy during a single training session",
      icon: "ShieldAlert",
      unlocked: true,
      unlockedAt: "2 days ago",
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: "exerciseHero",
      title: "Exercise Completion Badge",
      description: "Complete your first set of exercises with the AR guidance overlay",
      icon: "CheckCircle",
      unlocked: true,
      unlockedAt: "4 days ago",
      color: "from-blue-500 to-cyan-500"
    }
  ]);

  // Chat Messages State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "therapist",
      text: "Hi Alex, how is the shoulder feeling after the lateral raise sets today?",
      timestamp: "09:30 AM"
    },
    {
      id: "2",
      sender: "patient",
      text: "It feels warmer and a bit fatigued, but the pain is down to a 2/10 during movement.",
      timestamp: "09:45 AM"
    },
    {
      id: "3",
      sender: "therapist",
      text: "Excellent. I've updated your shoulder abduction exercises with a 90° angle cap to avoid impingement. Please follow the AR red-line indicator carefully.",
      timestamp: "10:05 AM"
    }
  ]);

  // Patients Database (SaaS mock data)
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "pat_1",
      name: "Alex Johnson",
      age: 28,
      gender: "Male",
      diagnosis: "Rotator Cuff Tendinitis (Right Shoulder)",
      recoveryScore: 82,
      painLevel: 2,
      assignedExercises: ["Shoulder Abduction", "Internal Rotation", "Wall Crawl"],
      lastSessionDate: "Today, 10:15 AM",
      status: "Stable",
      riskScore: 12,
      phone: "+1 (555) 019-2834",
      email: "alex.johnson@example.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      medicalHistory: [
        "Right shoulder pain for 3 months, worsening during overhead activities.",
        "MRI confirms Grade 1 Rotator Cuff strain.",
        "No previous surgeries."
      ],
      treatmentPlan: "Focus on strengthening the infraspinatus and subscapularis. Restrict active elevation above 120° for 2 weeks. Gradually increase range of motion (ROM) as comfort allows.",
      timeline: [
        { date: "May 10", score: 45, pain: 7 },
        { date: "May 17", score: 55, pain: 6 },
        { date: "May 24", score: 68, pain: 4 },
        { date: "May 31", score: 74, pain: 3 },
        { date: "Jun 05", score: 82, pain: 2 }
      ],
      exerciseCompletionRate: 88
    },
    {
      id: "pat_2",
      name: "Sarah Miller",
      age: 34,
      gender: "Female",
      diagnosis: "Post-op ACL Reconstruction (Left Knee)",
      recoveryScore: 56,
      painLevel: 4,
      assignedExercises: ["Knee Extension", "Quadriceps Sets", "Heel Slides"],
      lastSessionDate: "Yesterday, 3:45 PM",
      status: "Needs Review",
      riskScore: 48,
      phone: "+1 (555) 043-9821",
      email: "sarah.m@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
      medicalHistory: [
        "ACL tear during skiing in February.",
        "Autograft reconstruction surgery on April 15.",
        "Current focus: full extension restoration and early quadriceps activation."
      ],
      treatmentPlan: "Perform active extension exercises. Use the AR alignment tool to check knee varus/valgus drift during squat motions. Limit weight-bearing flex to 90°.",
      timeline: [
        { date: "Apr 20", score: 20, pain: 8 },
        { date: "May 01", score: 32, pain: 7 },
        { date: "May 15", score: 45, pain: 5 },
        { date: "May 29", score: 51, pain: 4 },
        { date: "Jun 05", score: 56, pain: 4 }
      ],
      exerciseCompletionRate: 64
    },
    {
      id: "pat_3",
      name: "Marcus Brody",
      age: 52,
      gender: "Male",
      diagnosis: "L4-L5 Lumbar Disc Herniation",
      recoveryScore: 41,
      painLevel: 6,
      assignedExercises: ["Cat-Camel Stretch", "Bird-Dog Pose", "Pelvic Tilts"],
      lastSessionDate: "June 2, 11:20 AM",
      status: "High Risk",
      riskScore: 78,
      phone: "+1 (555) 088-7711",
      email: "marcus.brody@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
      medicalHistory: [
        "Chronic lower back pain for 2 years.",
        "Acute flare-up last month following heavy lifting.",
        "MRI confirms L4-L5 disc protrusion compressing left L5 nerve root."
      ],
      treatmentPlan: "Back extension stabilization. Discontinue spinal flexion or twisting. Use AR tracking to keep torso deviation below 10° during stabilizing postures.",
      timeline: [
        { date: "May 05", score: 38, pain: 8 },
        { date: "May 12", score: 40, pain: 8 },
        { date: "May 19", score: 44, pain: 7 },
        { date: "May 26", score: 45, pain: 6 },
        { date: "Jun 02", score: 41, pain: 6 }
      ],
      exerciseCompletionRate: 42
    },
    {
      id: "pat_4",
      name: "Emily Chen",
      age: 23,
      gender: "Female",
      diagnosis: "Lateral Ankle Sprain (Grade II)",
      recoveryScore: 91,
      painLevel: 1,
      assignedExercises: ["Ankle Alphabet", "Resistance Band Eversion", "Single Leg Stance"],
      lastSessionDate: "Today, 8:30 AM",
      status: "Stable",
      riskScore: 5,
      phone: "+1 (555) 021-3948",
      email: "emily.chen@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces",
      medicalHistory: [
        "Inversion ankle injury playing basketball 4 weeks ago.",
        "X-ray negative for fractures.",
        "Moderate lateral swelling and tenderness resolving well."
      ],
      treatmentPlan: "Proprioception and lateral ankle strengthening. AR visual skeleton tracks ankle rotation angles during balancing.",
      timeline: [
        { date: "May 10", score: 60, pain: 5 },
        { date: "May 17", score: 72, pain: 3 },
        { date: "May 24", score: 85, pain: 2 },
        { date: "May 31", score: 89, pain: 1 },
        { date: "Jun 05", score: 91, pain: 1 }
      ],
      exerciseCompletionRate: 95
    }
  ]);

  // Real-time active exercise session state (therapist can monitor this in real-time)
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);

  // Sync role-specific changes
  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  // Actions for active training simulator session
  const startLiveSession = (patientId: string, exerciseName: string) => {
    const patientObj = patients.find((p) => p.id === patientId) || patients[0];
    setActiveSession({
      patientId: patientObj.id,
      patientName: patientObj.name,
      exerciseName,
      duration: 0,
      repCount: 0,
      accuracy: 94,
      jointAngle: 45,
      postureStatus: "Correct",
      voiceGuidance: "Prepare to start. Align your joints inside the overlay.",
      alerts: []
    });

    addNotification(
      "Training Started",
      `You have started training: ${exerciseName}`,
      "reminder"
    );
  };

  const updateLiveSessionMetrics = (metrics: Partial<ActiveSession>) => {
    setActiveSession((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...metrics };

      // Sync the live state back into the patients database if therapist is watching
      if (updated.alerts.length > prev.alerts.length) {
        // Add alert notification for therapist
        const latestAlert = updated.alerts[updated.alerts.length - 1];
        addNotification(
          `Alert: ${updated.patientName}`,
          `Incorrect posture detected: ${latestAlert}`,
          "alert"
        );
      }
      return updated;
    });
  };

  const stopLiveSession = () => {
    if (activeSession) {
      // Complete exercise action
      const patientId = activeSession.patientId;
      setPatients((prevPatients) =>
        prevPatients.map((p) => {
          if (p.id === patientId) {
            const newScore = Math.min(100, Math.round(p.recoveryScore + 1.5));
            return {
              ...p,
              recoveryScore: newScore,
              lastSessionDate: "Today, just now",
              exerciseCompletionRate: Math.min(100, p.exerciseCompletionRate + 2)
            };
          }
          return p;
        })
      );

      // Increment weekly goal
      setWeeklyGoal((prev) => ({
        ...prev,
        completed: Math.min(prev.target, prev.completed + 1)
      }));

      addNotification(
        "Session Completed!",
        `Congratulations, you completed your ${activeSession.exerciseName} set!`,
        "achievement"
      );

      // Check for streak7 unlocking
      if (streakCount + 1 >= 7) {
        unlockAchievement("streak7");
      }
    }
    setActiveSession(null);
  };

  // Chat actions
  const sendMessage = (sender: "patient" | "therapist", text: string) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: Message = {
      id: Math.random().toString(),
      sender,
      text,
      timestamp: formattedTime
    };
    setMessages((prev) => [...prev, newMsg]);

    // Add alert notification for opposite role
    const recipient = sender === "patient" ? "Dr. Sarah Mitchell" : "Alex Johnson";
    addNotification(
      `Message from ${sender === "patient" ? "Alex Johnson" : "Dr. Sarah Mitchell"}`,
      text.length > 50 ? `${text.slice(0, 47)}...` : text,
      "message"
    );
  };

  // Unlock badges
  const unlockAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.id === id && !ach.unlocked) {
          addNotification(
            "Achievement Unlocked!",
            `You unlocked: ${ach.title}`,
            "achievement"
          );
          return { ...ach, unlocked: true, unlockedAt: "Just now" };
        }
        return ach;
      })
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addNotification = (title: string, description: string, type: NotificationItem["type"]) => {
    const newNotif: NotificationItem = {
      id: Math.random().toString(),
      title,
      description,
      time: "Just now",
      read: false,
      type
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        patients,
        setPatients,
        activeSession,
        startLiveSession,
        updateLiveSessionMetrics,
        stopLiveSession,
        messages,
        sendMessage,
        achievements,
        unlockAchievement,
        notifications,
        addNotification,
        markAllNotificationsRead,
        streakCount,
        setStreakCount,
        weeklyGoal,
        setWeeklyGoal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
