"use client";

import React, { useState } from "react";

interface Experience {
  id: string;
  title: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
  current: boolean;
}

interface WorkExperienceSectionProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export default function WorkExperienceSection({ data = [], onChange }: WorkExperienceSectionProps) {
  const [experience, setExperience] = useState<Experience[]>(data);

  // Sync state if data prop changes
  React.useEffect(() => {
    setExperience(data);
  }, [data]);

  const addEntry = () => {
    const newEntry: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      start_date: "",
      end_date: "",
      description: "",
      current: false,
    };
    const newExperience = [...experience, newEntry];
    setExperience(newExperience);
    onChange(newExperience);
  };

  const removeEntry = (id: string) => {
    const newExperience = experience.filter(e => e.id !== id);
    setExperience(newExperience);
    onChange(newExperience);
  };

  const updateEntry = (id: string, field: keyof Experience, value: any) => {
    const newExperience = experience.map(e => e.id === id ? { ...e, [field]: value } : e);
    setExperience(newExperience);
    onChange(newExperience);
  };

  return (
    <section className="bg-white rounded-[32px] border border-slate-100 p-6 sm:p-8 shadow-sm mb-8" id="experience">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-xl">work</span>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Work Experience</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your career history</p>
          </div>
        </div>
        <button 
          onClick={addEntry}
          className="w-full sm:w-auto flex items-center justify-center gap-2 text-primary font-bold hover:bg-primary/5 px-4 py-2 rounded-xl transition-all border border-primary/10"
        >
          <span className="material-symbols-outlined text-lg">edit</span>
          Edit
        </button>
      </div>

      <div className="space-y-8">
        {experience.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-[24px] bg-slate-50/30">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4 shadow-sm">
                <span className="material-symbols-outlined text-3xl">work_history</span>
            </div>
            <p className="text-slate-500 font-bold mb-4">No experience entries yet.</p>
            <button onClick={addEntry} className="text-primary font-black text-xs uppercase tracking-widest hover:underline">
                Add Your First Experience
            </button>
          </div>
        ) : (
          experience.map((exp) => (
            <div key={exp.id} className="relative flex flex-col md:flex-row gap-4 md:gap-8 group">
              {/* Year/Tenure Column */}
              <div className="flex items-center md:items-start md:flex-col md:w-28 shrink-0 pt-1 gap-4 md:gap-1">
                 <div className="text-lg md:text-xl font-black text-slate-800 tracking-tight">
                    {exp.start_date ? new Date(exp.start_date).getFullYear() : "Year"}
                 </div>
                 <div className="flex flex-col md:block">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 md:mb-3">
                        {exp.current ? "Current" : exp.end_date ? new Date(exp.end_date).getFullYear() : "2023"}
                    </div>
                    <div className="inline-flex px-2 md:px-3 py-1 bg-primary/5 text-primary text-[8px] md:text-[9px] font-black rounded-lg uppercase tracking-[0.1em] border border-primary/10 w-fit">
                        Full Time
                    </div>
                 </div>
              </div>

              {/* Dot & Line Connector */}
              <div className="hidden md:flex flex-col items-center pt-3 relative">
                 <div className="w-4 h-4 rounded-full border-[3px] border-primary bg-white z-10 shadow-sm transition-transform group-hover:scale-125"></div>
                 <div className="absolute top-7 bottom-0 w-[2px] bg-gradient-to-b from-slate-100 to-transparent"></div>
              </div>

              {/* Content Column */}
              <div className="flex-1 pb-8 border-b border-slate-50 last:border-0 min-w-0">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-1 flex items-center gap-2">
                       {exp.title || "Job Title"}
                       {exp.current && (
                         <span className="w-2 h-2 rounded-full bg-stat-green"></span>
                       )}
                    </h3>
                    <p className="text-slate-500 font-bold">{exp.company || "Company Name"}</p>
                  </div>
                  <button 
                    onClick={addEntry}
                    className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white"
                  >
                    <span className="material-symbols-outlined text-lg">add</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input 
                    type="text" 
                    value={exp.title}
                    onChange={(e) => updateEntry(exp.id, "title", e.target.value)}
                    placeholder="Job Title" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all" 
                  />
                  <input 
                    type="text" 
                    value={exp.company}
                    onChange={(e) => updateEntry(exp.id, "company", e.target.value)}
                    placeholder="Company" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all" 
                  />
                </div>

                <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">
                   {exp.description || "Describe your key achievements and responsibilities and deliver his goals achievements."}
                </p>

                <div className="flex items-center justify-end">
                   <button 
                     onClick={() => removeEntry(exp.id)}
                     className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                   >
                     <span className="material-symbols-outlined text-lg">delete</span>
                   </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
