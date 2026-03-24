"use client";

import React from "react";

interface Activity {
  id: string;
  type: string;
  count: number;
  time: string;
}

interface SkillProgress {
  label: string;
  percentage: number;
  color: string;
}

interface DashboardProfileWidgetProps {
  userName?: string;
  userRole?: string;
  profileImage?: string;
}

export default function DashboardProfileWidget({
  userName = "Oda Dink",
  userRole = "Programmer",
  profileImage
}: DashboardProfileWidgetProps) {
  const skills: SkillProgress[] = [
    { label: "PHP", percentage: 66, color: "var(--color-stat-lime)" },
    { label: "Vue", percentage: 31, color: "var(--color-stat-green)" },
    { label: "Laravel", percentage: 7, color: "var(--color-stat-blue)" }
  ];

  const activities: Activity[] = [
    { id: "1", type: "Vacancy", count: 3, time: "12h ago" },
    { id: "2", type: "Vacancy", count: 3, time: "12h ago" },
    { id: "3", type: "Vacancy", count: 3, time: "12h ago" }
  ];

  const displayName = userName || "User";

  return (
    <div className="flex flex-col gap-6 w-full shrink-0">
      {/* Profile Summary Card */}
      <div className="bg-white rounded-[32px] p-10 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center">
        {/* Progress Circle around Image */}
        <div className="relative w-36 h-36 mb-6">
          <svg className="w-full h-full -rotate-90">
            <circle cx="72" cy="72" r="68" fill="transparent" stroke="#F1F5F9" strokeWidth="8" />
            <circle
              cx="72" cy="72" r="68" fill="transparent"
              stroke="var(--color-primary)"
              strokeWidth="8"
              strokeDasharray={427}
              strokeDashoffset={427 * (1 - 0.75)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 p-3">
             <div className="w-full h-full rounded-full bg-slate-200 overflow-hidden ring-4 ring-white shadow-inner">
               {profileImage ? (
                 <img src={profileImage} alt={displayName} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full bg-gradient-to-br from-primary to-accent-gradient flex items-center justify-center text-white text-3xl font-black italic">
                   {displayName.charAt(0)}
                 </div>
               )}
             </div>
          </div>
        </div>

        <h3 className="text-2xl font-black text-slate-900 tracking-tight">{displayName}</h3>
        <p className="text-slate-400 font-bold mb-10 tracking-wide uppercase text-xs">{userRole}</p>

        {/* Skill Circles */}
        <div className="flex items-center justify-between w-full gap-4">
          {skills.map((skill) => (
            <div key={skill.label} className="flex flex-col items-center gap-3 flex-1">
              <div className="relative w-16 h-16">
                 <svg className="w-full h-full -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="#f1f5f9" strokeWidth="6" />
                    <circle 
                      cx="32" cy="32" r="28" fill="transparent" stroke={skill.color} strokeWidth="6" 
                      strokeDasharray={176} 
                      strokeDashoffset={176 * (1 - skill.percentage / 100)}
                      strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-slate-700">
                    {skill.percentage}%
                 </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{skill.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities Card */}
      <div className="bg-white rounded-[32px] p-10 shadow-xl shadow-slate-200/50 grow">
        <h4 className="text-lg font-black text-slate-900 mb-8 tracking-tight">Recent Activities</h4>
        <div className="space-y-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-[23px] top-2 bottom-6 w-0.5 bg-slate-100"></div>

          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-5 group relative z-10 transition-all hover:translate-x-1 cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center shrink-0 shadow-sm border border-white group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-lg">work</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 leading-relaxed mb-1">
                  Your application has accepted in <span className="text-primary font-black">{activity.count} Vacancy</span>
                </p>
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{activity.time}</span>
              </div>
            </div>
          ))}

          {/* Load More Button */}
          <div className="flex justify-center mt-4">
             <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-all shadow-sm border border-slate-100">
               <span className="material-symbols-outlined text-slate-400">south</span>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
