"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCandidateProfileAction } from "@/features/auth/actions";
import ProfileForm from "@/features/auth/components/ProfileForm";
import UserMenu from "@/features/auth/components/UserMenu";

/**
 * Candidate Profile Management Page.
 * Dedicated space for building and editing the professional profile.
 */
export default function ProfilePage() {
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors pb-20">
      
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 md:px-12 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-bold group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span>Back to Dashboard</span>
          </Link>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
          <span className="text-sm font-black uppercase tracking-widest text-slate-400">Profile Builder</span>
        </div>
        <UserMenu initials={profile?.full_name ? profile.full_name.substring(0, 2).toUpperCase() : "AL"} />
      </header>

      <main className="p-6 md:p-12 max-w-4xl mx-auto space-y-12">
        
        {/* Title Section */}
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Build your professional <span className="text-primary italic">identity.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Keep your profile up to date to increase your chances of being matched with top-tier companies.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
          <ProfileForm initialData={profile} />
        </div>

      </main>

    </div>
  );
}
