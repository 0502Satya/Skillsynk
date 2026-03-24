"use client";

import React from "react";

interface CareerProfileSectionProps {
  profile: any;
  onEdit: () => void;
}

export default function CareerProfileSection({ profile, onEdit }: CareerProfileSectionProps) {
  const fields = [
    { label: "Current Industry", value: profile?.industry || "Add Industry", icon: "business_center" },
    { label: "Functional Area", value: profile?.functional_area || "Add Area", icon: "settings" },
    { label: "Role", value: profile?.current_designation || "Add Role", icon: "person" },
    { label: "Desired Job Type", value: profile?.employment_type || "Permanent", icon: "work" },
    { label: "Desired Employment Type", value: profile?.work_mode?.join(", ") || "Full Time", icon: "badge" },
    { label: "Preferred Location", value: profile?.preferred_locations?.join(", ") || "Add Location", icon: "location_on" },
  ];

  return (
    <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-xl shadow-slate-200/50 mb-8 border border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
            <span className="material-symbols-outlined text-2xl font-black">track_changes</span>
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">Career Profile</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your career goals</p>
          </div>
        </div>
         <div className="flex flex-row sm:items-center gap-3">
             <button 
                 onClick={onEdit}
                 className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-primary transition-all border border-slate-100 flex items-center justify-center gap-2"
             >
                 <span className="material-symbols-outlined text-sm font-black">edit</span>
                 Edit
             </button>
             <button className="flex-1 sm:flex-none px-6 py-2.5 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all border border-primary/10">
                 Save
             </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {fields.map((field, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
               <span className="material-symbols-outlined text-[14px] text-indigo-500/60">{field.icon}</span>
               {field.label}
            </div>
            <div className="text-[15px] font-black text-slate-700 ml-6">{field.value}</div>
          </div>
        ))}
      </div>
      
      {/* Expected Salary */}
      <div className="mt-12 pt-10 border-t border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
         <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
               <span className="material-symbols-outlined">payments</span>
            </div>
            <div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Expected Salary</div>
               <div className="text-xl font-black text-slate-800">
                  {profile?.currency || '₹'} {profile?.expected_salary || '0'} <span className="text-xs text-slate-400 font-bold">/ Year</span>
               </div>
            </div>
         </div>
         <div className="flex items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-indigo-100">
               <span className="material-symbols-outlined text-xs">check_circle</span>
               Open to Relocate
            </div>
         </div>
      </div>
    </div>
  );
}
