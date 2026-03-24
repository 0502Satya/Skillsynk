"use client";

import React from "react";

interface ContactSectionProps {
  data: {
    phone?: string;
    whatsapp_number?: string;
    email?: string;
    location?: string;
    city?: string;
    country?: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function ContactSection({ data, onChange }: ContactSectionProps) {
  return (
    <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
      <h2 className="text-xl font-black text-slate-900 tracking-tight font-display uppercase mb-8">Contact</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400">Mobilephone</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-primary">
              <span className="material-symbols-outlined text-xl">call</span>
            </div>
            <input 
              type="text" 
              value={data.phone || ""} 
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="+50 123 456 78"
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400">Whatsapp</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-primary">
              <span className="material-symbols-outlined text-xl italic">chat</span>
            </div>
            <input 
              type="text" 
              value={data.whatsapp_number || ""} 
              onChange={(e) => onChange("whatsapp_number", e.target.value)}
              placeholder="+50 444 551 11"
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400">Email</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-primary">
              <span className="material-symbols-outlined text-xl">mail</span>
            </div>
            <input 
              type="email" 
              value={data.email || ""} 
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="example@mail.com"
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-1">
          <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400">Address</label>
          <input 
            type="text" 
            value={data.location || ""} 
            onChange={(e) => onChange("location", e.target.value)}
            placeholder="Address summary"
            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
          />
        </div>

        <div className="space-y-2 md:col-span-1">
          <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400">City</label>
          <div className="relative">
            <select 
               value={data.city || ""} 
               onChange={(e) => onChange("city", e.target.value)}
               className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            >
               <option value="">Select City</option>
               <option value="London">London</option>
               <option value="New York">New York</option>
               <option value="Berlin">Berlin</option>
            </select>
            <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
          </div>
        </div>

        <div className="space-y-2 md:col-span-1">
          <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400">Country</label>
          <div className="relative">
            <select 
               value={data.country || ""} 
               onChange={(e) => onChange("country", e.target.value)}
               className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-700 appearance-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            >
               <option value="">Select Country</option>
               <option value="England">England</option>
               <option value="USA">USA</option>
               <option value="Germany">Germany</option>
            </select>
            <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
          </div>
        </div>
      </div>
    </section>
  );
}
