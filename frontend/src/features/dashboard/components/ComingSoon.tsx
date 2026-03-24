"use client";

import React from "react";
import Link from "next/link";

interface ComingSoonProps {
  title?: string;
  description?: string;
  icon?: string;
}

export default function ComingSoon({
  title = "Coming Soon",
  description = "We're working hard to bring you this feature. Stay tuned!",
  icon = "rocket_launch"
}: ComingSoonProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8 min-h-[60vh]">
      <div className="text-center max-w-md">
        {/* Animated Icon */}
        <div className="relative mx-auto w-32 h-32 mb-8">
          <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20"></div>
          <div className="relative w-32 h-32 bg-gradient-to-br from-primary to-accent-gradient rounded-full flex items-center justify-center shadow-2xl shadow-primary/30">
            <span className="material-symbols-outlined text-white text-5xl">{icon}</span>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">{title}</h2>
        <p className="text-slate-400 font-bold text-sm leading-relaxed mb-8">{description}</p>

        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
