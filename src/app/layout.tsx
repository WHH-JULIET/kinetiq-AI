import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kinetiq AI | AI-Powered AR Physiotherapy & Recovery Intelligence",
  description: "Kinetiq AI is a next-generation remote rehabilitation platform featuring AI-powered AR physiotherapy monitoring, real-time posture correction, digital twins, and recovery analytics.",
  keywords: ["Physiotherapy", "Augmented Reality", "AI Healthcare", "Pose Estimation", "Digital Twin", "Remote Rehabilitation", "Health SaaS"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

