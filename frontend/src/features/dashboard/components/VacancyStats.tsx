"use client";

import React from "react";

// Generate last 30 days labels (show every 5th day for readability)
function getLast30DaysLabels(): string[] {
  const labels: string[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (i % 5 === 0 || i === 0) {
      labels.push(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
    }
  }
  return labels;
}

export default function VacancyStats() {
  const dayLabels = getLast30DaysLabels();

  return (
    <div className="bg-white rounded-[32px] p-10 shadow-xl shadow-slate-200/50 flex flex-col w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
        <h4 className="text-xl font-black text-slate-900 tracking-tight">Vacancy Stats</h4>
        
        <div className="flex items-center gap-8 flex-wrap">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-5 h-2.5 rounded-full bg-primary"></div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Application Sent</span>
              <div className="w-8 h-4 bg-primary/20 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-primary rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-2.5 rounded-full bg-stat-green"></div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Interviews</span>
              <div className="w-8 h-4 bg-stat-green/20 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-stat-green rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-2.5 rounded-full bg-slate-300"></div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Rejected</span>
              <div className="w-8 h-4 bg-slate-100 rounded-full relative cursor-pointer">
                <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-slate-300 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="relative">
            <button className="flex items-center gap-3 px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-100 transition-all">
              Last 30 Days
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-[300px] w-full mt-4 overflow-hidden">
        {/* Y-Axis Labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-bold text-slate-300 pointer-events-none z-10">
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        {/* Grid Lines */}
        <div className="absolute left-8 right-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-full h-[1px] bg-slate-50 border-t border-dashed border-slate-100"></div>
          ))}
        </div>

        {/* The SVG Chart — uses viewBox so it scales within the container */}
        <svg className="absolute left-8 right-0 top-0 bottom-0 w-[calc(100%-32px)] h-full" viewBox="0 0 700 300" preserveAspectRatio="none">
          {/* Green Line (Interviews) */}
          <path 
            d="M 0 220 C 80 200, 120 180, 200 190 S 340 160, 420 180 S 520 210, 600 200 S 660 190, 700 185" 
            fill="none" 
            stroke="var(--color-stat-green)" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
          
          {/* Purple Line (Applications) */}
          <path 
            d="M 0 160 C 60 120, 140 180, 200 140 S 320 100, 400 150 S 500 170, 580 140 S 650 155, 700 145" 
            fill="none" 
            stroke="var(--color-primary)" 
            strokeWidth="3" 
            strokeLinecap="round"
          />

          {/* Interactive Tooltip / Dot Mockup */}
          <g className="cursor-pointer group">
             <circle cx="580" cy="140" r="6" fill="var(--color-primary)" className="drop-shadow-lg" />
             <circle cx="580" cy="140" r="3" fill="white" />
             
             {/* Tooltip Popup */}
             <foreignObject x="420" y="50" width="160" height="85">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 flex flex-col gap-1.5">
                   <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Mar 18, 2026</div>
                   <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                         <div>
                            <div className="text-[13px] font-black leading-none">12</div>
                            <div className="text-[7px] font-bold text-slate-400 uppercase">App. Sent</div>
                         </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                         <div className="w-2.5 h-2.5 rounded-full bg-stat-green"></div>
                         <div>
                            <div className="text-[13px] font-black leading-none">3</div>
                            <div className="text-[7px] font-bold text-slate-400 uppercase">Interviews</div>
                         </div>
                      </div>
                   </div>
                </div>
             </foreignObject>
          </g>
        </svg>
      </div>

      {/* X-Axis Labels — Last 30 days, showing every 5th day */}
      <div className="flex justify-between mt-10 ml-8 text-[11px] font-bold text-slate-300 uppercase tracking-widest">
        {dayLabels.map((label, i) => (
          <span key={i}>{label}</span>
        ))}
      </div>

      {/* Bottom Legend */}
      <div className="flex items-center justify-center gap-10 mt-12 border-t border-slate-50 pt-10">
         <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Application Sent</span>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-stat-green"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interviews</span>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rejected</span>
         </div>
      </div>
    </div>
  );
}
