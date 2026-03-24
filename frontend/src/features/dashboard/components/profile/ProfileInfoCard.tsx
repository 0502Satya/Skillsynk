"use client";

import React from "react";

interface ProfileInfoCardProps {
  profile: any;
  onEdit: () => void;
}

export default function ProfileInfoCard({ profile, onEdit }: ProfileInfoCardProps) {
  const initials = profile?.full_name 
    ? profile.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)
    : "NA";

  return (
    <div className="relative bg-white rounded-[32px] p-6 sm:p-10 shadow-xl shadow-slate-200/40 mb-8 overflow-hidden border border-slate-100">
      {/* Background Gradient Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -mr-40 -mt-40 blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-stat-blue/5 rounded-full -ml-32 -mb-32 blur-[80px]"></div>
 
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-16">
        {/* Avatar Section */}
        <div className="relative shrink-0">
          <div className="w-32 h-40 sm:w-40 sm:h-48 rounded-[36px] bg-white p-1 shadow-2xl shadow-slate-200 overflow-hidden group border border-slate-50">
            <div className="w-full h-full bg-slate-100 rounded-[32px] flex items-center justify-center overflow-hidden">
              {profile?.profile_photo_url ? (
                <img src={profile.profile_photo_url} alt={profile.full_name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-accent-gradient flex items-center justify-center text-white text-3xl sm:text-4xl font-black italic">
                  {initials}
                </div>
              )}
            </div>
          </div>
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all transform hover:scale-110 active:scale-95 group/btn">
            <span className="material-symbols-outlined text-xl font-bold transition-transform group-hover/btn:rotate-12">photo_camera</span>
          </button>
        </div>
 
        {/* Info Section */}
        <div className="flex-1 min-w-0">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-3 leading-[1.1]">{profile?.full_name || "Alex Thompson"}</h1>
            <p className="text-base sm:text-lg font-bold text-slate-500 leading-snug">
               {profile?.current_designation || "Senior Product Designer"} <span className="text-slate-300 font-light mx-2">at</span> <span className="text-primary">{profile?.current_company || "Google"}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-6 mb-8">
             <div className="flex items-center gap-3 text-xs font-bold text-slate-500 min-w-0">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all border border-slate-100/50">
                   <span className="material-symbols-outlined text-base">phone_iphone</span>
                </div>
                <span className="truncate">{profile?.phone || "(05) 323 7289"}</span>
             </div>
             <div className="flex items-center gap-3 text-xs font-bold text-slate-500 min-w-0">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all border border-slate-100/50">
                   <span className="material-symbols-outlined text-base">mail</span>
                </div>
                <span className="truncate">{profile?.email || "ems@gmail.com"}</span>
             </div>
             <div className="flex items-center gap-3 text-xs font-bold text-slate-500 min-w-0">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all border border-slate-100/50">
                   <span className="material-symbols-outlined text-base">link</span>
                </div>
                <span className="truncate">{profile?.portfolio_url || "portfolio.URL"}</span>
             </div>
             <div className="flex items-center gap-3 text-xs font-bold text-slate-500 min-w-0">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-all border border-slate-100/50">
                   <span className="material-symbols-outlined text-base">public</span>
                </div>
                <span className="truncate">{profile?.linkedin || "LinkedIn"}</span>
             </div>
          </div>

          <button 
            onClick={onEdit}
            className="w-full md:w-auto px-8 bg-slate-50 hover:bg-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest py-3 rounded-xl border border-slate-100 transition-all flex items-center justify-center gap-3 group"
          >
            Edit Profile
            <span className="material-symbols-outlined text-xs transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4 mt-8 pt-8 sm:mt-12 sm:pt-10 border-t border-slate-50">
         <div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-primary/5 text-primary rounded-xl font-bold text-[10px] sm:text-xs ring-1 ring-primary/10 transition-all hover:bg-primary/10">
            <span className="material-symbols-outlined text-sm sm:text-base shrink-0">work_history</span>
            {profile?.experience_years ? `${profile.experience_years}+ Yrs` : "Fresher"}
         </div>
         <div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-[10px] sm:text-xs ring-1 ring-indigo-100 transition-all hover:bg-indigo-100/50">
            <span className="material-symbols-outlined text-sm sm:text-base shrink-0">stars</span>
            {profile?.projects?.length || 5} Projects
         </div>
         <div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-violet-50 text-violet-600 rounded-xl font-bold text-[10px] sm:text-xs ring-1 ring-violet-100 transition-all hover:bg-violet-100/50">
            <span className="material-symbols-outlined text-sm sm:text-base shrink-0">verified</span>
            {profile?.certifications?.length || 8} Certs
         </div>
         <div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-stat-blue/5 text-stat-blue rounded-xl font-bold text-[10px] sm:text-xs ring-1 ring-stat-blue/10 transition-all hover:bg-stat-blue/10">
            <span className="material-symbols-outlined text-sm sm:text-base shrink-0">location_on</span>
            {profile?.location || "Remote"}
         </div>
      </div>
    </div>
  );
}
