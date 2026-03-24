"use client";

import React, { useState } from "react";

interface SkillsSectionProps {
  data: string[];
  onChange: (skills: string[]) => void;
}

const suggestedSkills = ["React.js", "TypeScript", "Node.js", "AWS", "UI Design", "GraphQL", "Docker", "Python"];

export default function SkillsSection({ data = ["React.js", "TypeScript"], onChange }: SkillsSectionProps) {
  const [skills, setSkills] = useState<string[]>(data);

  // Sync state if data prop changes
  React.useEffect(() => {
    setSkills(data);
  }, [data]);
  const [inputValue, setInputValue] = useState("");

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const newSkills = [...skills, trimmed];
      setSkills(newSkills);
      onChange(newSkills);
    }
    setInputValue("");
  };

  const removeSkill = (skill: string) => {
    const newSkills = skills.filter(s => s !== skill);
    setSkills(newSkills);
    onChange(newSkills);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(inputValue);
    }
  };

  return (
    <section className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm mb-8" id="skills">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
          <span className="material-symbols-outlined text-xl">psychology</span>
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Skills</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your core competencies</p>
        </div>
      </div>
      
      <div className="relative mb-8">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl pointer-events-none">search</span>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search and add skills..." 
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-100 bg-slate-50/50 text-sm font-bold outline-none focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all shadow-inner" 
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-300">close</span>
        </div>
      </div>

      <div className="mb-8">
         <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-slate-400 text-lg">manage_search</span>
            <span className="text-sm font-black text-slate-600">Search and tag skills</span>
         </div>
         <div className="flex flex-wrap gap-3">
           {skills.map((skill) => (
             <span 
               key={skill} 
               className="group flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 border border-slate-100 rounded-xl text-xs font-bold transition-all hover:bg-white hover:shadow-md hover:border-primary/20"
             >
               <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center text-[10px] text-slate-400 group-hover:text-primary border border-slate-100">
                  <span className="material-symbols-outlined text-xs">token</span>
               </div>
               {skill}
               <button 
                 onClick={() => removeSkill(skill)}
                 className="text-slate-300 hover:text-red-500 transition-colors"
               >
                 <span className="material-symbols-outlined text-sm font-black">close</span>
               </button>
             </span>
           ))}
           <button onClick={() => addSkill(inputValue || "New Skill")} className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary border border-primary/10 border-dashed rounded-xl text-xs font-bold hover:bg-primary/10 transition-all">
              <span className="material-symbols-outlined text-sm">add</span> Add New Skill
           </button>
         </div>
      </div>

      <div className="pt-6 border-t border-slate-50">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Suggested for you</p>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills.filter(s => !skills.includes(s)).map((skill) => (
            <button
              key={skill}
              onClick={() => addSkill(skill)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-500 hover:border-primary hover:text-primary hover:shadow-sm transition-all shadow-sm shadow-slate-200/20"
            >
              <span className="material-symbols-outlined text-sm opacity-50">add</span> {skill}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
