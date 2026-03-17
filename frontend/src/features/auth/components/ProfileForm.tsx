"use client";

import React, { useState } from "react";
import { updateCandidateProfileAction } from "@/features/auth/actions";

interface ProfileFormProps {
  initialData: any;
}

/**
 * Professional Profile Form for Candidates.
 * Allows editing of core profile details with a premium feel.
 */
export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data: any = {
      full_name: formData.get("full_name"),
      headline: formData.get("headline"),
      summary: formData.get("summary"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      currency: formData.get("currency"),
    };

    const salary = formData.get("expected_salary");
    if (salary) {
      data.expected_salary = parseFloat(salary as string);
    }

    const result = await updateCandidateProfileAction(data);

    if (result.success) {
      setMessage({ type: "success", text: "Profile updated successfully!" });
      // Minor delay to let user see success message before scroll/etc
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: "error", text: result.error || "Failed to update profile." });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Status Message */}
      {message && (
        <div className={`p-4 rounded-2xl text-sm font-bold border transition-all ${
          message.type === "success" 
            ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400" 
            : "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
        }`}>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined">
              {message.type === "success" ? "check_circle" : "error"}
            </span>
            {message.text}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Identity Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
            <input 
              name="full_name"
              defaultValue={initialData?.full_name}
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
              placeholder="Alice Smith"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
            <input 
              name="phone"
              defaultValue={initialData?.phone}
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
            <input 
              name="location"
              defaultValue={initialData?.location}
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
              placeholder="San Francisco, CA"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Expected Salary</label>
            <div className="flex gap-3">
              <input 
                name="expected_salary"
                defaultValue={initialData?.expected_salary}
                type="number"
                className="flex-grow px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                placeholder="120000"
              />
              <select 
                name="currency"
                defaultValue={initialData?.currency || "USD"}
                className="w-28 px-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold text-sm"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Professional Headline</label>
            <input 
              name="headline"
              defaultValue={initialData?.headline}
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
              placeholder="Senior Full Stack Engineer | React & Node.js"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Professional Summary</label>
            <textarea 
              name="summary"
              defaultValue={initialData?.summary}
              rows={5}
              className="w-full px-6 py-5 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none font-medium text-slate-600 dark:text-slate-400 leading-relaxed"
              placeholder="Describe your professional background and key achievements..."
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-12 py-5 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined">save</span>
            )}
            {loading ? "Saving Changes..." : "Save Profile Details"}
          </button>
        </div>
      </form>
    </div>
  );
}
