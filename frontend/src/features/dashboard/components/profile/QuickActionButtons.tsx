"use client";

import React from "react";

const actions = [
  { icon: "school", label: "Add Degree", color: "bg-indigo-50 text-indigo-600 ring-indigo-100" },
  { icon: "work_history", label: "Add Position", color: "bg-primary/5 text-primary ring-primary/10" },
  { icon: "person_add", label: "Add Role", color: "bg-violet-50 text-violet-600 ring-violet-100" },
  { icon: "info", label: "Add Info", color: "bg-slate-50 text-slate-600 ring-slate-100" },
];

export default function QuickActionButtons() {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      {actions.map((action, i) => (
        <button 
          key={i}
          className={`group flex items-center gap-3 px-6 py-4 rounded-[24px] font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md ring-1 ${action.color}`}
        >
          <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-sm group-hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-xl">{action.icon}</span>
          </div>
          {action.label}
        </button>
      ))}
    </div>
  );
}
