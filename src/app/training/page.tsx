"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Activity, ArrowLeft, Camera, Check, AlertTriangle, 
  Volume2, Play, Square, RefreshCw, Zap, Trophy, ShieldCheck,
  VideoOff, Sparkles, UserCheck, ChevronRight
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import confetti from "canvas-confetti";

function ARTrainingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialExercise = searchParams.get("exercise") || "Shoulder Abduction";

  const { 
    activeSession, startLiveSession, updateLiveSessionMetrics, 
    stopLiveSession, unlockAchievement, addNotification 
  } = useApp();

  const [exercise, setExercise] = useState(initialExercise);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(0);
  const [repCount, setRepCount] = useState(0);
  const [accuracy, setAccuracy] = useState(95);
  const [jointAngle, setJointAngle] = useState(0);
  const [postureStatus, setPostureStatus] = useState<"Correct" | "Incorrect">("Correct");
  const [voiceGuidance, setVoiceGuidance] = useState("Align your body in the box to begin.");
  const [alerts, setAlerts] = useState<string[]>([]);
  const [simMode, setSimMode] = useState<"idle" | "up" | "down">("idle");
  const [deviationActive, setDeviationActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const simIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start the session in AppContext when loaded
  useEffect(() => {
    startLiveSession("pat_1", exercise);
    return () => {
      stopLiveSession();
    };
  }, [exercise]);

  // Synchronize state changes to global AppContext
  useEffect(() => {
    if (isRunning) {
      updateLiveSessionMetrics({
        duration,
        repCount,
        accuracy,
        jointAngle,
        postureStatus,
        voiceGuidance,
        alerts
      });
    }
  }, [duration, repCount, accuracy, jointAngle, postureStatus, voiceGuidance, alerts, isRunning]);

  // Timer Tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // Canvas Skeleton Draw Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!cameraActive) {
        // Draw black screen
        ctx.fillStyle = "#090d16";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#64748b";
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.fillText("CAMERA STREAM INACTIVE", canvas.width / 2, canvas.height / 2);
        animFrameId = requestAnimationFrame(draw);
        return;
      }

      // Draw Grid Background
      ctx.strokeStyle = "rgba(255,255,255,0.02)";
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw active face/body box bounds
      ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      ctx.setLineDash([]); // Reset dash

      // Calculate key coordinates based on jointAngle
      const centerX = canvas.width / 2;
      const headY = 90;
      const shoulderY = 140;
      const hipY = 270;
      const leftShoulderX = centerX - 55;
      const rightShoulderX = centerX + 55;
      
      const leftHipX = centerX - 40;
      const rightHipX = centerX + 40;

      // Draw Head
      ctx.beginPath();
      ctx.arc(centerX, headY, 20, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Body Bones drawing colors based on posture status
      const skeletonColor = postureStatus === "Correct" ? "#22C55E" : "#EF4444";
      ctx.strokeStyle = skeletonColor;
      ctx.lineWidth = 3.5;

      // Torso & Hips
      ctx.beginPath();
      ctx.moveTo(centerX, shoulderY); // neck
      ctx.lineTo(centerX, hipY); // spine
      ctx.moveTo(leftShoulderX, shoulderY);
      ctx.lineTo(rightShoulderX, shoulderY); // shoulders line
      ctx.moveTo(leftHipX, hipY);
      ctx.lineTo(rightHipX, hipY); // hips line
      ctx.stroke();

      // Left Arm (Neutral passive)
      ctx.beginPath();
      ctx.moveTo(leftShoulderX, shoulderY);
      ctx.lineTo(leftShoulderX - 25, shoulderY + 70);
      ctx.lineTo(leftShoulderX - 25, shoulderY + 130);
      ctx.stroke();

      // Left Leg (Neutral passive)
      ctx.beginPath();
      ctx.moveTo(leftHipX, hipY);
      ctx.lineTo(leftHipX - 15, hipY + 80);
      ctx.lineTo(leftHipX - 15, hipY + 160);
      ctx.stroke();

      // Right Leg (Squat adjustment or Neutral)
      let rKneeX = rightHipX + 15;
      let rKneeY = hipY + 80;
      let rFootX = rightHipX + 15;
      let rFootY = hipY + 160;

      if (exercise === "Squats" && isRunning) {
        // Bend hips and knees based on jointAngle (representing squat depth)
        const bendRatio = jointAngle / 100; // 0 to 1
        rKneeX = rightHipX + 45 * bendRatio;
        rKneeY = hipY + 50 + 20 * (1 - bendRatio);
        rFootX = rightHipX + 15;
        rFootY = hipY + 160;
      }

      ctx.beginPath();
      ctx.moveTo(rightHipX, hipY);
      ctx.lineTo(rKneeX, rKneeY);
      ctx.lineTo(rFootX, rFootY);
      ctx.stroke();

      // Right Arm (Active Abduction movement or Neutral)
      let rElbowX = rightShoulderX + 60;
      let rElbowY = shoulderY + 40;
      let rWristX = rightShoulderX + 100;
      let rWristY = shoulderY + 90;

      if (exercise === "Shoulder Abduction" && isRunning) {
        // Compute arm position based on abduction angle
        const radians = (jointAngle * Math.PI) / 180;
        // Joint points rotate around rightShoulder
        rElbowX = rightShoulderX + Math.sin(radians) * 60;
        rElbowY = shoulderY + Math.cos(radians) * 60;
        rWristX = rightShoulderX + Math.sin(radians) * 110;
        rWristY = shoulderY + Math.cos(radians) * 110;
      }

      ctx.beginPath();
      ctx.moveTo(rightShoulderX, shoulderY);
      ctx.lineTo(rElbowX, rElbowY);
      ctx.lineTo(rWristX, rWristY);
      ctx.stroke();

      // Draw Joint Nodes
      ctx.fillStyle = skeletonColor;
      const joints = [
        [centerX, headY + 20], // neck
        [leftShoulderX, shoulderY],
        [rightShoulderX, shoulderY],
        [leftShoulderX - 25, shoulderY + 70], // left elbow
        [rElbowX, rElbowY], // right elbow
        [leftShoulderX - 25, shoulderY + 130], // left wrist
        [rWristX, rWristY], // right wrist
        [leftHipX, hipY],
        [rightHipX, hipY],
        [leftHipX - 15, hipY + 80], // left knee
        [rKneeX, rKneeY], // right knee
        [leftHipX - 15, hipY + 160], // left foot
        [rFootX, rFootY] // right foot
      ];

      joints.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        // draw target glow
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${postureStatus === "Correct" ? "34, 197, 94" : "239, 68, 68"}, 0.15)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Overlay Angle Readout on Canvas
      if (isRunning) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "left";
        
        if (exercise === "Shoulder Abduction") {
          ctx.fillText(`ANGLE: ${Math.round(jointAngle)}°`, rightShoulderX + 15, shoulderY - 15);
          
          // Draw target limit guideline arc (120 degrees limit)
          ctx.beginPath();
          ctx.arc(rightShoulderX, shoulderY, 80, 0, (120 * Math.PI) / 180);
          ctx.strokeStyle = "rgba(6, 182, 212, 0.25)";
          ctx.setLineDash([2, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        } else if (exercise === "Squats") {
          ctx.fillText(`KNEE FLEX: ${Math.round(jointAngle)}°`, rKneeX + 15, rKneeY);
        }
      }

      // Draw Deviation Indicators (flashing correction arrows)
      if (postureStatus === "Incorrect" && isRunning) {
        ctx.fillStyle = "#EF4444";
        ctx.font = "9px sans-serif";
        
        if (exercise === "Shoulder Abduction" && jointAngle > 120) {
          // Downward arrow
          ctx.beginPath();
          ctx.moveTo(rWristX, rWristY - 20);
          ctx.lineTo(rWristX, rWristY - 5);
          ctx.lineTo(rWristX - 5, rWristY - 10);
          ctx.moveTo(rWristX, rWristY - 5);
          ctx.lineTo(rWristX + 5, rWristY - 10);
          ctx.strokeStyle = "#EF4444";
          ctx.lineWidth = 2.5;
          ctx.stroke();
          
          ctx.fillStyle = "#EF4444";
          ctx.fillText("LOWER ARM", rWristX + 10, rWristY - 10);
        }
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [jointAngle, postureStatus, exercise, cameraActive, isRunning]);

  // Simulation controls (mocking patient movements)
  const simulateCorrectRep = () => {
    if (!isRunning) return;
    setDeviationActive(false);
    setPostureStatus("Correct");
    setAccuracy(96);
    
    // Animate range of motion cycle
    let currentAngle = 10;
    const interval = setInterval(() => {
      if (currentAngle < 90) {
        currentAngle += 5;
        setJointAngle(currentAngle);
        setVoiceGuidance("Raising arm... keep torso stabilized.");
      } else {
        clearInterval(interval);
        // hold at peak
        setVoiceGuidance("Excellent posture. Hold peak abduction.");
        
        setTimeout(() => {
          // descend
          const descInterval = setInterval(() => {
            if (currentAngle > 10) {
              currentAngle -= 5;
              setJointAngle(currentAngle);
            } else {
              clearInterval(descInterval);
              setRepCount(prev => prev + 1);
              setVoiceGuidance("Repetition complete! Return to start.");
              // Trigger mini success audio/visual
              confetti({ particleCount: 15, origin: { y: 0.8 } });
            }
          }, 30);
        }, 1000);
      }
    }, 30);
  };

  const simulateIncorrectDeviation = () => {
    if (!isRunning) return;
    setDeviationActive(true);
    setPostureStatus("Incorrect");
    setAccuracy(68);
    setAlerts(prev => [...prev, "Excessive shoulder abduction (142°)"]);

    // Force high angle
    let currentAngle = 90;
    const interval = setInterval(() => {
      if (currentAngle < 142) {
        currentAngle += 8;
        setJointAngle(currentAngle);
      } else {
        clearInterval(interval);
        setVoiceGuidance("Posture Warning: Lower arm below 120 degrees to protect shoulder joints.");
      }
    }, 25);
  };

  const startTrainingSession = () => {
    setIsRunning(true);
    setDuration(0);
    setRepCount(0);
    setAccuracy(95);
    setJointAngle(10);
    setPostureStatus("Correct");
    setVoiceGuidance("Session initialized. Follow the side alignment box.");
  };

  const pauseTrainingSession = () => {
    setIsRunning(false);
    setVoiceGuidance("Session paused.");
  };

  const handleEndAndLogWorkout = () => {
    setIsRunning(false);
    // Fire fullscreen confetti reward
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    addNotification(
      "Workout Logged!",
      `Completed: ${exercise} set. Range of motion recorded at 92°.`,
      "achievement"
    );

    // If perfect posture was achieved (which is simulated here)
    unlockAchievement("perfectPosture");
    unlockAchievement("exerciseHero");

    setTimeout(() => {
      router.push("/dashboard/patient");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-foreground flex flex-col font-sans">
      
      {/* AR Viewport Header */}
      <header className="h-16 border-b border-slate-800 bg-[#090e1a]/80 backdrop-blur-md flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/patient"
            className="p-2 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Kinetiq AR Active Scan
            </h1>
            <p className="text-[10px] text-slate-500 font-mono">Telemetry Sync: Patient Alex Johnson</p>
          </div>
        </div>

        {/* Live Clinician Connect */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-secondary/20 bg-secondary/5 text-secondary text-[10px] font-bold">
          <UserCheck className="h-4 w-4 shrink-0" />
          <span>Clinician Link: Dr. Sarah Mitchell is monitoring</span>
        </div>
      </header>

      {/* Main Grid Viewport */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[calc(100vh-64px)]">
        
        {/* LEFT COLUMN: CAMERA / SKELETAL OVERLAY AREA (8 cols) */}
        <div className="lg:col-span-8 bg-[#090d16] p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Diagnostic Overlay Lines */}
          <div className="absolute inset-0 scanner-line pointer-events-none" />

          {/* Top Camera HUD details */}
          <div className="flex justify-between items-center z-10 text-white font-mono text-[10px] bg-[#0c1220]/80 p-3 rounded-2xl border border-slate-800/60 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <span className="text-secondary font-bold">MODE: SKELETAL_POSE_DETECT</span>
              <span>INFERENCE: 14ms (60 FPS)</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCameraActive(!cameraActive)}
                className={`px-2.5 py-1 rounded-lg border font-sans font-bold flex items-center gap-1 transition-colors ${
                  cameraActive ? "border-slate-800 bg-slate-900 text-slate-400 hover:text-white" : "border-red-500/30 bg-red-500/10 text-red-400"
                }`}
              >
                {cameraActive ? "Camera On" : "Camera Off"}
              </button>
              <span className="text-slate-500">RES: 1280x720</span>
            </div>
          </div>

          {/* Central canvas skeleton frame */}
          <div className="flex-1 flex items-center justify-center my-6 relative min-h-[300px]">
            <canvas 
              ref={canvasRef} 
              width={640} 
              height={420}
              className="max-w-full max-h-full rounded-2xl bg-[#0c1220] border border-slate-800/80 shadow-2xl relative"
            />

            {/* Float Pose Status Indicator */}
            {isRunning && (
              <div className={`absolute top-4 left-4 p-3 rounded-2xl border backdrop-blur-md flex items-start gap-2 max-w-[200px] z-10 ${
                postureStatus === "Correct" 
                  ? "border-emerald-500/30 bg-emerald-950/70 text-emerald-300"
                  : "border-red-500/30 bg-red-950/70 text-red-300 animate-pulse"
              }`}>
                {postureStatus === "Correct" ? (
                  <ShieldCheck className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider">POSTURE: {postureStatus}</p>
                  <p className="text-[9px] opacity-80 leading-normal mt-0.5">
                    {postureStatus === "Correct" ? "Joint margins within safety limit." : "Excessive angle. Joint compression flag!"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Voice Guidance Subtitle Feed */}
          <div className="z-10 bg-[#0c1220]/80 p-4 rounded-2xl border border-slate-800/60 backdrop-blur-sm flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Volume2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[9px] text-slate-500 uppercase font-mono leading-none">Voice Guidance Assistant</p>
              <p className="text-xs text-white font-medium mt-1 leading-normal italic">&quot;{voiceGuidance}&quot;</p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: PERFORMANCE METRICS & SIMULATOR CONSOLE (4 cols) */}
        <div className="lg:col-span-4 bg-[#090e1a] border-l border-slate-800/80 p-6 flex flex-col justify-between overflow-y-auto">
          
          {/* Active Settings Panel */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Assigned Rehab Exercise</label>
              <select
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                disabled={isRunning}
                className="w-full h-11 px-4 rounded-xl border border-slate-800 bg-[#0c1220] text-sm focus:outline-none focus:border-primary text-white cursor-pointer"
              >
                <option value="Shoulder Abduction">Shoulder Abduction (Rotator Cuff)</option>
                <option value="Squats">Symmetric Squats (ACL Extension)</option>
                <option value="Knee Extension">Knee Extensions (Quad Recovery)</option>
              </select>
            </div>

            {/* Metrics Dashboard panel */}
            <div className="bg-[#0c1220] border border-slate-800/60 rounded-3xl p-5 space-y-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase font-mono block">Real-time Telemetry metrics</span>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Timer */}
                <div className="p-3 bg-slate-900/30 rounded-2xl border border-slate-800">
                  <p className="text-[9px] text-slate-500 uppercase font-mono">Active Time</p>
                  <p className="text-lg font-black text-white mt-0.5">
                    {Math.floor(duration / 60)}:{String(duration % 60).padStart(2, "0")}
                  </p>
                </div>
                {/* Reps */}
                <div className="p-3 bg-slate-900/30 rounded-2xl border border-slate-800">
                  <p className="text-[9px] text-slate-500 uppercase font-mono">Rep Counter</p>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <p className="text-lg font-black text-white">{repCount}</p>
                    <span className="text-[10px] text-slate-500 font-bold">/ 10</span>
                  </div>
                </div>
                {/* Accuracy */}
                <div className="p-3 bg-slate-900/30 rounded-2xl border border-slate-800">
                  <p className="text-[9px] text-slate-500 uppercase font-mono">Pose Accuracy</p>
                  <p className={`text-lg font-black mt-0.5 ${accuracy > 85 ? "text-emerald-400" : "text-red-400 animate-pulse"}`}>
                    {accuracy}%
                  </p>
                </div>
                {/* ROM Angle */}
                <div className="p-3 bg-slate-900/30 rounded-2xl border border-slate-800">
                  <p className="text-[9px] text-slate-500 uppercase font-mono">Active ROM</p>
                  <p className="text-lg font-black text-secondary mt-0.5">{Math.round(jointAngle)}°</p>
                </div>
              </div>

              {/* Quality score progress */}
              <div className="pt-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1">
                  <span>Movement Quality Score</span>
                  <span className="text-success font-bold">94%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5">
                  <div className="bg-success h-1.5 rounded-full" style={{ width: "94%" }} />
                </div>
              </div>
            </div>

            {/* Hackathon Simulation Console */}
            <div className="bg-[#0c1220]/60 border border-slate-800/40 rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-500 uppercase font-mono block">Evaluator Simulation Controls</span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
              </div>
              <p className="text-[9px] text-slate-500 leading-normal mb-1">
                Use these buttons to mock live webcam pose actions and verify posture triggers.
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={simulateCorrectRep}
                  disabled={!isRunning}
                  className="h-10 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-xl text-[10px] font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  <Check className="h-3.5 w-3.5" /> Correct Rep
                </button>
                <button
                  onClick={simulateIncorrectDeviation}
                  disabled={!isRunning}
                  className="h-10 px-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl text-[10px] font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  <AlertTriangle className="h-3.5 w-3.5" /> Trigger Warning
                </button>
              </div>
            </div>
          </div>

          {/* Action Session Buttons */}
          <div className="mt-8 pt-4 border-t border-slate-800 space-y-3">
            {!isRunning ? (
              <button
                onClick={startTrainingSession}
                className="w-full h-12 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white font-bold hover:opacity-95 transition-all text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/10"
              >
                <Play className="h-4.5 w-4.5 fill-white" /> Start Exercise Session
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={pauseTrainingSession}
                  className="h-12 rounded-xl border border-slate-800 bg-[#0c1220] text-slate-400 hover:text-white font-bold transition-all text-xs flex items-center justify-center gap-2"
                >
                  <Square className="h-4 w-4" /> Pause
                </button>
                <button
                  onClick={handleEndAndLogWorkout}
                  className="h-12 rounded-xl bg-success text-white font-bold hover:bg-success/90 transition-all text-xs flex items-center justify-center gap-2 shadow-lg shadow-success/15"
                >
                  <Trophy className="h-4 w-4" /> End & Log Set
                </button>
              </div>
            )}
            
            <p className="text-[9px] text-slate-500 text-center">
              Logging sets records your joint ROM vectors directly inside your therapist profile feed.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ARTrainingScreen() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#070b13] text-foreground flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto animate-pulse">
            <Activity className="h-6 w-6" />
          </div>
          <p className="text-xs font-mono text-slate-500">INITIALIZING AR TELEMETRY STREAM...</p>
        </div>
      </div>
    }>
      <ARTrainingContent />
    </Suspense>
  );
}
