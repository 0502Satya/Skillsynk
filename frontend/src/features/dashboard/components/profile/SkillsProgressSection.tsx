"use client";

import React from "react";
import RadarChart from "./RadarChart";

interface Skill {
  name: string;
  percentage: number;
}

interface SkillsProgressSectionProps {
  skills?: Skill[];
}

export default function SkillsProgressSection({ 
  skills = [
    { name: "UX Design", percentage: 90 },
    { name: "UI Design", percentage: 85 },
    { name: "Prototyping", percentage: 70 },
    { name: "User Research", percentage: 60 },
    { name: "Frontend", percentage: 75 },
  ]
}: SkillsProgressSectionProps) {
  const radarData = skills.map(s => ({ name: s.name, score: s.percentage }));

  return (
    <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 mb-8 overflow-hidden">
       <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">Skills</h2>
          <button className="text-primary hover:text-primary/80 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group transition-all">
             <span className="material-symbols-outlined text-sm">add</span> Add New Skill
          </button>
       </div>

        <div className="space-y-12">
          <div className="bg-slate-50/40 rounded-[32px] border border-slate-100/50 p-6 flex items-center justify-center min-h-[320px]">
             <RadarChart data={radarData} size={300} />
          </div>

          <div className="grid grid-cols-1 gap-6 px-2">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">{skill.name}</span>
                  <span className="text-xs font-black text-primary">{skill.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-100/30">
                  <div 
                    className="h-full bg-primary rounded-full shadow-lg shadow-primary/20 transition-all duration-1000 ease-out"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
       </div>
    </section>
  );
}
