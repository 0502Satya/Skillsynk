"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCandidateProfileAction } from "@/features/auth/actions";
import UserMenu from "@/features/auth/components/UserMenu";

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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-12 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold">
            <span className="material-symbols-outlined text-3xl">hub</span>
            <span className="text-xl">SkillSync</span>
          </Link>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
          <span className="text-sm font-bold text-slate-500">Candidate Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <UserMenu initials={profile?.full_name ? profile.full_name.substring(0, 2).toUpperCase() : "AL"} />
        </div>
      </header>

      <main className="p-6 md:p-12 max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Section */}
        <section className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="size-32 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-6xl">person</span>
            </div>
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                Welcome back, {profile?.full_name || "Alice"}!
              </h1>
              <p className="text-slate-500 text-lg max-w-xl">
                You have 3 active job applications and 5 new skill matches for your profile.
              </p>
              <div className="pt-4">
                <Link 
                  href="/dashboard/profile"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-bold rounded-xl transition-all group"
                >
                  <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">edit_square</span>
                  <span>Complete Your Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions / Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined">work</span>
              </div>
              <h3 className="font-bold">Applications</h3>
            </div>
            <p className="text-3xl font-black">12</p>
            <p className="text-sm text-slate-500 mt-1">4 pending review</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <h3 className="font-bold">Skill Matches</h3>
            </div>
            <p className="text-3xl font-black">28</p>
            <p className="text-sm text-slate-500 mt-1">8 exclusive invites</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined">visibility</span>
              </div>
              <h3 className="font-bold">Profile Views</h3>
            </div>
            <p className="text-3xl font-black">145</p>
            <p className="text-sm text-slate-500 mt-1">+12% from last week</p>
          </div>
        </div>

      </main>

    </div>
  );
}
