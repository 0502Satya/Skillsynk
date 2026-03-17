"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCompanyProfileAction } from "@/features/auth/actions";

/**
 * Specialized Dashboard for Companies.
 * Action-oriented landing page for newly registered or logged-in companies.
 */
export default function CompanyDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const data = await getCompanyProfileAction();
      if (!data.error) {
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const isProfileIncomplete = profile && (!profile.description || !profile.industry || !profile.website);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Dashboard Header */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-12 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold">
            <span className="material-symbols-outlined text-3xl">hub</span>
            <span className="text-xl">SkillSync</span>
          </Link>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
          <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">Organization</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            {profile?.name ? profile.name.substring(0, 2).toUpperCase() : "CO"}
          </div>
        </div>
      </header>

      <main className="p-6 md:p-12 max-w-7xl mx-auto space-y-8">
        
        {/* Profile Completion Banner */}
        {isProfileIncomplete && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 p-6 rounded-[1.5rem] flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-start gap-4 text-center md:text-left">
              <div className="size-12 rounded-2xl bg-amber-100 dark:bg-amber-800 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">new_releases</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-amber-900 dark:text-amber-200">Finish setting up your profile</h4>
                <p className="text-sm text-amber-700 dark:text-amber-400 font-medium max-w-lg">
                  Companies with complete profiles see 3x higher candidate engagement. Add your description, website, and industry to get verified.
                </p>
              </div>
            </div>
            <Link 
              href="/company/settings/organization" 
              className="bg-amber-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition-all whitespace-nowrap active:scale-[0.98]"
            >
              Complete Profile
            </Link>
          </div>
        )}

        {/* Welcome Hero */}
        <section className="bg-primary rounded-[2rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Welcome{profile?.name ? `, ${profile.name}` : " back"}!
            </h1>
            <p className="text-primary-light text-lg max-w-xl opacity-90">
              Your talent intelligence dashboard is ready. You have 3 active job postings and 14 new candidate matches.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button className="bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">add_circle</span>
                Post a New Job
              </button>
              <button className="bg-primary-dark/20 backdrop-blur-md text-white border border-white/20 font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-all">
                Search Talent
              </button>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 size-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        </section>

        {/* Quick Actions Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Active Jobs", count: "3", icon: "work", color: "text-blue-500" },
            { title: "Matched Talent", count: "14", icon: "group", color: "text-purple-500" },
            { title: "Interviewing", count: "2", icon: "calendar_today", color: "text-orange-500" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className={`material-symbols-outlined text-3xl ${stat.color}`}>{stat.icon}</span>
                <span className="text-3xl font-black">{stat.count}</span>
              </div>
              <h4 className="font-bold text-slate-500">{stat.title}</h4>
            </div>
          ))}
        </section>

        {/* Support Section */}
        <section className="bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-8 border border-dashed border-slate-300 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Need help getting started?</h3>
              <p className="text-slate-500 dark:text-slate-400">Our hiring specialists are ready to help you optimize your search.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all">
                Read Guide
              </button>
              <button className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
