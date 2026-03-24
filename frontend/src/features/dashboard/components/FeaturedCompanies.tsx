"use client";

import React from "react";

interface Company {
  id: string;
  name: string;
  vacancyCount: number;
}

export default function FeaturedCompanies() {
  const companies: Company[] = [
    { id: "1", name: "Herman-Carter", vacancyCount: 21 },
    { id: "2", name: "Funk Inc.", vacancyCount: 21 },
    { id: "3", name: "Williamson Inc.", vacancyCount: 21 },
    { id: "4", name: "Donnelly Ltd.", vacancyCount: 21 },
    { id: "5", name: "Herman-Carter", vacancyCount: 21 }
  ];

  return (
    <div className="mt-12 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <h4 className="text-xl font-black text-slate-900 tracking-tight">Featured Companies</h4>
        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">
           {/* Pagination Dots */}
           <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
              <div className="w-2 h-2 rounded-full bg-slate-200 shrink-0"></div>
              <div className="w-2 h-2 rounded-full bg-slate-200 shrink-0"></div>
           </div>
           <button className="flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 bg-primary/5 border border-primary/10 rounded-2xl text-[10px] sm:text-[11px] font-black text-primary uppercase tracking-widest hover:bg-primary/10 transition-all group shrink-0 min-h-[44px]">
             View More
             <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-white p-5 sm:p-6 rounded-[24px] shadow-lg shadow-slate-100/50 flex items-center gap-4 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer group min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors">
               <span className="material-symbols-outlined text-slate-300 text-2xl sm:text-3xl group-hover:text-primary/40 transition-colors">business</span>
            </div>
            <div className="min-w-0 flex-1">
               <h5 className="text-[13px] font-black text-slate-900 truncate">{company.name}</h5>
               <p className="text-[10px] font-bold text-primary uppercase tracking-wider mt-0.5">{company.vacancyCount} Vacancy</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
