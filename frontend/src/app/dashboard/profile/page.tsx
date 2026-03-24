"use client";

import React, { useEffect, useState } from "react";
import { getCandidateProfileAction, updateCandidateProfileAction } from "@/features/auth/actions";
import WorkExperienceSection from "@/features/dashboard/components/profile/WorkExperienceSection";
import EducationSection from "@/features/dashboard/components/profile/EducationSection";
import SkillsSection from "@/features/dashboard/components/profile/SkillsSection";
import Toast from "@/features/dashboard/components/profile/Toast";

// New Premium Components
import GeneralsSection from "@/features/dashboard/components/profile/GeneralsSection";
import ContactSection from "@/features/dashboard/components/profile/ContactSection";
import AboutMeSection from "@/features/dashboard/components/profile/AboutMeSection";
import CandidateCard from "@/features/dashboard/components/profile/CandidateCard";
import PortfoliosSection from "@/features/dashboard/components/profile/PortfoliosSection";
import SkillsProgressSection from "@/features/dashboard/components/profile/SkillsProgressSection";

import ProfileInfoCard from "@/features/dashboard/components/profile/ProfileInfoCard";
import QuickInfoBar from "@/features/dashboard/components/profile/QuickInfoBar";
import ProjectsSection from "@/features/dashboard/components/profile/ProjectsSection";
import CertificationsSection from "@/features/dashboard/components/profile/CertificationsSection";
import PersonalInfoSection from "@/features/dashboard/components/profile/PersonalInfoSection";
import CareerProfileSection from "@/features/dashboard/components/profile/CareerProfileSection";
import QuickActionButtons from "@/features/dashboard/components/profile/QuickActionButtons";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [originalProfile, setOriginalProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const data = await getCandidateProfileAction();
      if (!data.error) {
        setProfile(data);
        setOriginalProfile(JSON.parse(JSON.stringify(data)));
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleChange = (field: string, value: any) => {
    setProfile((prev: any) => {
      const updated = { ...prev, [field]: value };
      const isDifferent = JSON.stringify(updated) !== JSON.stringify(originalProfile);
      setHasUnsavedChanges(isDifferent);
      return updated;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateCandidateProfileAction(profile);
    if (result.success) {
      setOriginalProfile(JSON.parse(JSON.stringify(profile)));
      setHasUnsavedChanges(false);
      setToast({ message: "Profile updated successfully!", type: "success" });
    } else {
      setToast({ message: result.error || "Failed to save profile", type: "error" });
    }
    setIsSaving(false);
  };

  const handleDiscard = () => {
    setProfile(JSON.parse(JSON.stringify(originalProfile)));
    setHasUnsavedChanges(false);
    setToast({ message: "Changes discarded", type: "success" });
  };

  if (loading && !profile) return null;

  return (
    <main className="flex-1 overflow-y-auto px-4 py-8 md:px-10 md:py-12 h-[calc(100vh-73px)] custom-scrollbar">
      <div className="max-w-7xl mx-auto">
        {/* Naukri-Style Header Toolbar */}
        <div className="flex flex-wrap items-center justify-between mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">My Profile</h2>
            <p className="text-slate-500 font-bold text-sm">Keep your profile updated to get matching jobs.</p>
          </div>
          <div className="flex items-center gap-4">
            {hasUnsavedChanges && (
              <>
                <button 
                  onClick={handleDiscard}
                  className="px-6 py-3 rounded-2xl bg-white text-slate-500 font-black text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-slate-50 transition-all"
                >
                  Discard
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-3 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 flex items-center gap-2"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-12 items-start">
          {/* Main Content Column (Center) */}
          <div className="space-y-12 min-w-0">
            <ProfileInfoCard 
              profile={profile} 
              onEdit={() => document.getElementById('personal')?.scrollIntoView({ behavior: 'smooth' })} 
            />
            
            <QuickActionButtons />
            
            <div className="space-y-10 border-t border-slate-50 pt-10">
              <WorkExperienceSection data={profile?.experience || []} onChange={(val) => handleChange("experience", val)} />
              <EducationSection data={profile?.education || []} onChange={(val) => handleChange("education", val)} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ProjectsSection 
                  projects={profile?.projects || []} 
                  onEdit={() => {}} 
                  onAdd={() => {}} 
                />
                <CertificationsSection 
                  certifications={profile?.certifications || []} 
                  onEdit={() => {}} 
                  onAdd={() => {}} 
                />
              </div>

              <PersonalInfoSection profile={profile} onEdit={() => {}} />
              <CareerProfileSection profile={profile} onEdit={() => {}} />
            </div>
          </div>

          {/* Sticky Sidebar Right (Skills & Actions) */}
          <aside className="hidden xl:block sticky top-24 space-y-8">
            <div id="skills">
              <SkillsProgressSection 
                skills={profile?.skills?.slice(0, 5).map((s: string) => ({ 
                  name: s, 
                  percentage: 85
                }))}
              />
            </div>
            
            <SkillsSection data={profile?.skills || []} onChange={(val) => handleChange("skills", val)} />

            <PortfoliosSection 
              social_links={profile?.social_links}
              onChange={(network, value) => {
                const newLinks = { ...(profile?.social_links || {}), [network]: value };
                handleChange("social_links", newLinks);
              }}
            />
            
            {/* Visual Pro Tip Card */}
            <div className="bg-gradient-to-br from-primary to-accent-vibrant rounded-[28px] p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 text-center">
                <span className="material-symbols-outlined text-3xl mb-3 text-white/80">workspace_premium</span>
                <h4 className="text-lg font-black mb-1 tracking-tight">AI Advantage</h4>
                <p className="text-[11px] font-bold text-white/80 leading-relaxed mb-6">
                  Improve your profile discoverability by 15x.
                </p>
                <button className="w-full py-3 bg-white text-primary font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all">
                  Optimize Now
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </main>
  );
}
