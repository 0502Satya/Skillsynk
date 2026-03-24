"use client";

import React from "react";

interface AboutMeSectionProps {
  data: {
    bio?: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function AboutMeSection({ data, onChange }: AboutMeSectionProps) {
  return (
    <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
      <h2 className="text-xl font-black text-slate-900 tracking-tight font-display uppercase mb-8">Tell about you</h2>

      <div className="space-y-4">
        <textarea 
          value={data.bio || ""}
          onChange={(e) => onChange("bio", e.target.value)}
          rows={8} 
          placeholder="I'm a seasoned UX Designer with a passion for creating intuitive digital experiences..." 
          className="w-full bg-slate-50 border-none rounded-[24px] py-6 px-8 text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner resize-none leading-relaxed"
        ></textarea>
        <div className="flex justify-end">
           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Supports Markdown</span>
        </div>
      </div>
    </section>
  );
}
