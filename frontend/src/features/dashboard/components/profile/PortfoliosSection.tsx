"use client";

import React from "react";

interface PortfoliosSectionProps {
  social_links?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  onChange: (network: string, value: string) => void;
}

export default function PortfoliosSection({ social_links = {}, onChange }: PortfoliosSectionProps) {
  const networks = [
    { id: "facebook", name: "Facebook", icon: "facebook", color: "text-blue-600", bg: "bg-blue-50" },
    { id: "instagram", name: "Instagram", icon: "photo_camera", color: "text-pink-600", bg: "bg-pink-50" },
    { id: "linkedin", name: "LinkedIn", icon: "work", color: "text-blue-800", bg: "bg-blue-50" },
  ];

  return (
    <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
      <h2 className="text-xl font-black text-slate-900 tracking-tight font-display uppercase mb-8">Portofolios</h2>

      <div className="space-y-6">
        {networks.map((network) => (
          <div key={network.id} className="space-y-2">
            <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400">{network.name}</label>
            <div className="relative group">
              <div className={`absolute inset-y-0 left-5 flex items-center pointer-events-none ${network.color}`}>
                <span className="material-symbols-outlined text-xl">{network.icon}</span>
              </div>
              <input 
                type="text" 
                value={(social_links as any)?.[network.id] || ""} 
                onChange={(e) => onChange(network.id, e.target.value)}
                placeholder={`https://${network.id}.com/username`}
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-slate-700 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
