"use client";

import React, { useState } from "react";

interface JobPreferencesSectionProps {
  initialData: {
    desired_titles: string;
    expected_salary: string;
    work_mode: string[];
    locations: string[];
    is_open_to_opportunities: boolean;
  };
  onChange: (field: string, value: any) => void;
}

export default function JobPreferencesSection({ initialData, onChange }: JobPreferencesSectionProps) {
  const [locations, setLocations] = useState<string[]>(initialData.locations || ["Remote Only"]);
  const [locInput, setLocInput] = useState("");

  const toggleWorkMode = (mode: string) => {
    const current = initialData.work_mode || [];
    const updated = current.includes(mode) 
      ? current.filter(m => m !== mode) 
      : [...current, mode];
    onChange("work_mode", updated);
  };

  const addLocation = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = locInput.trim();
      if (val && !locations.includes(val)) {
        const newLocs = [...locations, val];
        setLocations(newLocs);
        onChange("locations", newLocs);
      }
      setLocInput("");
    }
  };

  const removeLoc = (loc: string) => {
    const newLocs = locations.filter(l => l !== loc);
    setLocations(newLocs);
    onChange("locations", newLocs);
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm" id="preferences">
      <h2 className="text-lg font-extrabold flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-primary">tune</span> Job Preferences
      </h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5">Desired Job Titles</label>
          <input 
            type="text" 
            value={initialData.desired_titles}
            onChange={(e) => onChange("desired_titles", e.target.value)}
            placeholder="e.g. Staff Engineer, Product Designer" 
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-primary" 
          />
          <p className="text-xs text-slate-400 mt-1">Separate multiple titles with commas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5">Expected Monthly Salary</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-bold">$</span>
              <input 
                type="text" 
                value={initialData.expected_salary}
                onChange={(e) => onChange("expected_salary", e.target.value)}
                placeholder="100,000" 
                className="w-full pl-6 pr-14 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-primary" 
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">USD/mo</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5">Work Mode</label>
            <div className="flex gap-2">
              {["Remote", "Hybrid", "On-site"].map(mode => (
                <button 
                  key={mode}
                  onClick={() => toggleWorkMode(mode)}
                  className={`flex-1 py-2 text-sm font-bold rounded-xl border transition-all ${
                    (initialData.work_mode || []).includes(mode) 
                    ? "bg-primary text-white border-primary" 
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary/50"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">Preferred Locations</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {locations.map(loc => (
              <span key={loc} className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-xs font-bold">
                <span className="material-symbols-outlined text-[14px]">location_on</span> {loc}
                <button onClick={() => removeLoc(loc)} className="hover:text-red-500 ml-1"><span className="material-symbols-outlined text-xs">close</span></button>
              </span>
            ))}
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-base pointer-events-none">add_location</span>
            <input 
              type="text" 
              value={locInput}
              onChange={(e) => setLocInput(e.target.value)}
              onKeyDown={addLocation}
              placeholder="Add a city..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm outline-none focus:border-primary" 
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-sm font-black text-slate-800 dark:text-slate-200">Open to opportunities</p>
            <p className="text-xs text-slate-400">Recruiters can see you're actively looking</p>
          </div>
          <button 
            onClick={() => onChange("is_open_to_opportunities", !initialData.is_open_to_opportunities)}
            className={`relative w-12 h-6 rounded-full transition-colors ${initialData.is_open_to_opportunities ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${initialData.is_open_to_opportunities ? 'right-0.5' : 'left-0.5'}`}></span>
          </button>
        </div>
      </div>
    </section>
  );
}
