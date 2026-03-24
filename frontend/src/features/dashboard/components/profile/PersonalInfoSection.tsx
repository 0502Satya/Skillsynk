"use client";

import React from "react";

interface PersonalInfoSectionProps {
  profile: any;
  onEdit: () => void;
}

export default function PersonalInfoSection({ profile, onEdit }: PersonalInfoSectionProps) {
  const details = [
    { label: "Date of Birth", value: profile?.date_of_birth || "Add Date", icon: "cake" },
    { label: "Gender", value: profile?.gender || "Add Gender", icon: "person" },
    { label: "Marital Status", value: profile?.marital_status || "Add Status", icon: "favorite" },
    { label: "Hometown", value: profile?.hometown || "Add Hometown", icon: "home" },
    { label: "Pincode", value: profile?.pincode || "Add Pincode", icon: "pin_drop" },
    { label: "Category", value: profile?.category || "General", icon: "category" },
  ];

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 mb-8 border border-slate-100">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
            <span className="material-symbols-outlined text-2xl font-black">person</span>
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">Personal Details</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Basic info and preferences</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={onEdit}
                className="px-6 py-2.5 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-primary transition-all border border-slate-100 flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-sm font-black">edit</span>
                Edit
            </button>
            <button className="px-6 py-2.5 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white transition-all border border-primary/10">
                Save
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {details.map((detail, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
               <span className="material-symbols-outlined text-[14px] text-amber-500/60">{detail.icon}</span>
               {detail.label}
            </div>
            <div className="text-[15px] font-black text-slate-700 ml-6">{detail.value}</div>
          </div>
        ))}
      </div>
      
      {/* Languages */}
      <div className="mt-12 pt-10 border-t border-slate-50">
         <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center text-violet-500">
               <span className="material-symbols-outlined text-sm font-black">translate</span>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Languages Known</span>
         </div>
         <div className="flex flex-wrap gap-3">
            {profile?.languages?.map((lang: any, i: number) => (
               <div key={i} className="group flex items-center gap-3 pl-4 pr-1 py-1 bg-white border border-slate-100 rounded-[14px] shadow-sm hover:border-primary/20 transition-all">
                  <span className="text-xs font-black text-slate-600">{lang.name}</span>
                  <div className="px-3 py-1 bg-primary/5 text-primary text-[9px] font-black uppercase rounded-lg">
                    {lang.proficiency}
                  </div>
               </div>
            )) || (
                <button onClick={onEdit} className="px-5 py-2.5 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white border border-dashed border-slate-200 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add Languages
                </button>
            )}
         </div>
      </div>
    </div>
  );
}
