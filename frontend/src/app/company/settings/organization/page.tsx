"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { getCompanyProfileAction, updateCompanyProfileAction } from "@/features/auth/actions";

export default function OrganizationSettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function fetchProfile() {
      const data = await getCompanyProfileAction();
      if (data.error) {
        setError(data.error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    startTransition(async () => {
      const res = await updateCompanyProfileAction(profile);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }
    });
  };

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
          <Link href="/company" className="flex items-center gap-2 text-primary font-bold">
            <span className="material-symbols-outlined text-3xl">hub</span>
            <span className="text-xl">JobLyne</span>
          </Link>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
          <span className="text-sm font-bold text-slate-500">Organization Settings</span>
        </div>
        <Link href="/company" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Dashboard
        </Link>
      </header>

      <main className="p-6 md:p-12 max-w-4xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Complete Your Company Profile</h1>
            <p className="text-slate-500 mt-2">Finish setting up your organization's details to build trust with top talent.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8">
            
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium flex gap-3">
                <span className="material-symbols-outlined">error</span>
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-600 dark:text-emerald-400 text-sm font-medium flex gap-3 animate-in fade-in slide-in-from-top-2">
                <span className="material-symbols-outlined">check_circle</span>
                Profile updated successfully!
              </div>
            )}

            {/* Basic Info Group */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Company Name</label>
                  <input 
                    name="name"
                    value={profile?.name || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Industry</label>
                  <input 
                    name="industry"
                    value={profile?.industry || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                    placeholder="e.g. Technology, Finance"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Website URL</label>
                <input 
                  name="website"
                  value={profile?.website || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="https://company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Short Description</label>
                <textarea 
                  name="description"
                  value={profile?.description || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="Tell us about your organization..."
                />
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* Location Group */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                Headquarters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">City</label>
                  <input 
                    name="city"
                    value={profile?.city || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Country</label>
                  <input 
                    name="country"
                    value={profile?.country || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-800" />

            {/* Branding Group */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">palette</span>
                Branding & Values
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Culture & Values</label>
                <textarea 
                  name="culture"
                  value={profile?.culture || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="What makes your workplace unique?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Benefits & Perks</label>
                <textarea 
                  name="benefits"
                  value={profile?.benefits || ""}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                  placeholder="List your top benefits..."
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-primary text-white font-black text-lg rounded-2xl hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? "Saving changes..." : "Save Profile Details"}
              </button>
            </div>

          </form>
        </div>
      </main>

    </div>
  );
}
