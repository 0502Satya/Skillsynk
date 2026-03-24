"use client";

import React, { useState } from "react";

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  end_year: string;
}

interface EducationSectionProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationSection({ data = [], onChange }: EducationSectionProps) {
  const [education, setEducation] = useState<Education[]>(data);

  // Sync state if data prop changes
  React.useEffect(() => {
    setEducation(data);
  }, [data]);

  const addEntry = () => {
    const newEntry: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      field: "",
      end_year: "",
    };
    const newEducation = [...education, newEntry];
    setEducation(newEducation);
    onChange(newEducation);
  };

  const removeEntry = (id: string) => {
    const newEducation = education.filter(e => e.id !== id);
    setEducation(newEducation);
    onChange(newEducation);
  };

  const updateEntry = (id: string, field: keyof Education, value: any) => {
    const newEducation = education.map(e => e.id === id ? { ...e, [field]: value } : e);
    setEducation(newEducation);
    onChange(newEducation);
  };

  return (
    <section className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm mb-8" id="education">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-xl">school</span>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Education</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your academic background</p>
          </div>
        </div>
        <button 
          onClick={addEntry}
          className="flex items-center gap-2 text-primary font-bold hover:bg-primary/5 px-4 py-2 rounded-xl transition-all border border-primary/10"
        >
          <span className="material-symbols-outlined text-lg">edit</span>
          Edit
        </button>
      </div>

      <div className="space-y-8">
        {education.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-[24px] bg-slate-50/30">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4 shadow-sm">
                <span className="material-symbols-outlined text-3xl">history_edu</span>
            </div>
            <p className="text-slate-500 font-bold mb-4">Add your educational background.</p>
            <button onClick={addEntry} className="text-primary font-black text-xs uppercase tracking-widest hover:underline">
                Add Your First Degree
            </button>
          </div>
        ) : (
          education.map((edu) => (
            <div key={edu.id} className="relative flex flex-col md:flex-row gap-8 group">
              {/* Year Column */}
              <div className="md:w-28 shrink-0 pt-1">
                 <div className="text-xl font-black text-slate-800 mb-1 tracking-tight">
                    {edu.end_year || "2023"}
                 </div>
                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                    Graduation
                 </div>
                 <div className="inline-flex px-3 py-1 bg-violet-50 text-violet-600 text-[9px] font-black rounded-lg uppercase tracking-[0.1em] border border-violet-100/50">
                    Degree
                 </div>
              </div>

              {/* Dot & Line Connector */}
              <div className="hidden md:flex flex-col items-center pt-3 relative">
                 <div className="w-4 h-4 rounded-full border-[3px] border-violet-500 bg-white z-10 shadow-sm transition-transform group-hover:scale-125"></div>
                 <div className="absolute top-7 bottom-0 w-[2px] bg-gradient-to-b from-slate-100 to-transparent"></div>
              </div>

              {/* Content Column */}
              <div className="flex-1 pb-8 border-b border-slate-50 last:border-0">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-1">
                       {edu.degree || "Degree Name"}
                    </h3>
                    <p className="text-slate-500 font-bold">{edu.field || "Informatics & Design"} at <span className="text-primary">{edu.school || "University"}</span></p>
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
                    value={edu.degree}
                    onChange={(e) => updateEntry(edu.id, "degree", e.target.value)}
                    placeholder="Degree" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all" 
                  />
                  <input 
                    type="text" 
                    value={edu.school}
                    onChange={(e) => updateEntry(edu.id, "school", e.target.value)}
                    placeholder="University" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50/50 text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all" 
                  />
                </div>

                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                   A purpose towards when he is really proud of.
                </p>

                <div className="flex items-center justify-end">
                   <button 
                     onClick={() => removeEntry(edu.id)}
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
