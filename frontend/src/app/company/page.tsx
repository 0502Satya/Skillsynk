"use client";

import React from "react";
import Link from "next/link";

/**
 * Specialized Dashboard for Companies.
 * Action-oriented landing page for newly registered or logged-in companies.
 */
export default function CompanyDashboardPage() {
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
          <div className="size-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">JD</div>
        </div>
      </header>

      <main className="p-6 md:p-12 max-w-7xl mx-auto space-y-12">
        
        {/* Welcome Hero */}
        <section className="bg-primary rounded-[2rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Welcome back, <span className="underline decoration-primary-light">Dataminerz</span>!</h1>
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
