"use client";

import React from "react";

interface ProfileSidebarProps {
  completenessPct: number;
}

export default function ProfileSidebar({ completenessPct }: ProfileSidebarProps) {
  const sections = [
    { id: "personal", label: "Personal Info", icon: "person", missing: completenessPct < 80 },
    { id: "experience", label: "Experience", icon: "work", missing: false },
    { id: "education", label: "Education", icon: "school", missing: false },
    { id: "skills", label: "Skills", icon: "psychology", missing: false },
    { id: "preferences", label: "Preferences", icon: "tune", missing: false },
  ];

  return (
    <aside className="hidden lg:block w-56 flex-shrink-0">
      <div className="sticky top-20 space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 px-3 mb-3">Sections</p>
        
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all border-l-3 border-transparent"
          >
            <span className="material-symbols-outlined text-xl">{section.icon}</span>
            <span className="text-sm">{section.label}</span>
            {section.missing && (
              <span className="ml-auto w-2 h-2 bg-amber-400 rounded-full" title="Missing fields"></span>
            )}
          </a>
        ))}

        {/* Completeness */}
        <div className="mt-6 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between text-xs mb-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">Profile strength</span>
            <span className="text-primary font-extrabold">{completenessPct}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mb-2">
            <div 
              className="bg-primary h-1.5 rounded-full transition-all" 
              style={{ width: `${completenessPct}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {completenessPct < 100 ? (
              <>Add more details to reach <span className="text-primary font-bold">100%</span></>
            ) : (
              <span className="text-green-500 font-bold">Profile complete!</span>
            )}
          </p>
        </div>
      </div>
    </aside>
  );
}
