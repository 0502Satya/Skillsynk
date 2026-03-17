"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCandidateProfileAction } from "@/features/auth/actions";
import UserMenu from "@/features/auth/components/UserMenu";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import DashboardStats from "@/features/dashboard/components/DashboardStats";
import JobFeed from "@/features/dashboard/components/JobFeed";
import SidebarWidgets from "@/features/dashboard/components/SidebarWidgets";

export default function CandidateDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const data = await getCandidateProfileAction();
      if (!data.error) {
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col">
        <div className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse"></div>
        <div className="flex flex-1 w-full max-w-[1440px] mx-auto">
          <div className="hidden md:block w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-6">
            <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto animate-pulse"></div>
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 mx-auto rounded animate-pulse"></div>
            <div className="space-y-3 pt-10">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 w-full bg-slate-100 dark:bg-slate-800/50 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          <main className="flex-1 p-6 md:p-10 space-y-8">
            <div className="space-y-3">
              <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
              <div className="h-4 w-96 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 animate-pulse"></div>
              ))}
            </div>
            <div className="h-96 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 animate-pulse"></div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors">
      
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-4">
            <div className="text-primary size-8 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">hub</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">SkillSync</h2>
          </Link>
          <div className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full group">
              <div className="text-slate-500 dark:text-slate-400 flex border-none bg-slate-100 dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-0 border-none bg-slate-100 dark:bg-slate-800 focus:border-none h-full placeholder:text-slate-500 dark:placeholder:text-slate-400 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal" 
                placeholder="Search jobs, skills, companies..." 
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-6 hidden xl:flex">
            <Link className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Jobs</Link>
            <Link className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Companies</Link>
            <Link className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Salaries</Link>
            <Link className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Community</Link>
            <Link className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-medium leading-normal" href="#">Upskill</Link>
          </div>
          <div className="flex gap-3 items-center">
            <button className="flex items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="flex items-center gap-4">
              <UserMenu initials={profile?.full_name ? profile.full_name.substring(0, 2).toUpperCase() : "AL"} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full max-w-[1440px] mx-auto">
        <DashboardSidebar fullName={profile?.full_name} />
        
        <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
          {/* Welcome Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
              Welcome back, {profile?.full_name || "Alice"}! 👋
            </h2>
            <p className="text-slate-500 dark:text-slate-400">Here&apos;s what&apos;s happening with your job search today.</p>
            
            {/* Primary Action CTAs */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                <span className="material-symbols-outlined">rocket_launch</span>
                Apply to Recommended Jobs
              </button>
              <Link 
                href="/dashboard/profile"
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">edit_square</span>
                Complete Profile
              </Link>
            </div>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <JobFeed />
            </div>
            
            <SidebarWidgets />
          </div>
        </main>
      </div>
    </div>
  );
}
