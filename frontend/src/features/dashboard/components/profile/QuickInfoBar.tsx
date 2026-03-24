"use client";

import React from "react";

interface QuickInfoBarProps {
  profile: any;
}

export default function QuickInfoBar({ profile }: QuickInfoBarProps) {
  const stats = [
    { label: "Notice Period", value: profile?.notice_period || "Add", icon: "schedule" },
    { label: "Marital Status", value: profile?.marital_status || "Add", icon: "favorite" },
    { label: "Gender", value: profile?.gender || "Add", icon: "person" },
    { label: "Pincode", value: profile?.pincode || "Add", icon: "pin_drop" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-xl">{stat.icon}</span>
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">{stat.label}</div>
            <div className="text-sm font-black text-slate-900 mt-0.5">{stat.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
