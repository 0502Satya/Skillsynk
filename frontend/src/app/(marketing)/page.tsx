import Hero from "@/features/landing/components/Hero";
import HiringCompanies from "@/features/landing/components/HiringCompanies";
import StakeholderNav from "@/features/landing/components/StakeholderNav";
import RecommendedJobs from "@/features/landing/components/RecommendedJobs";
import ValueProps from "@/features/landing/components/ValueProps";
import PlatformStats from "@/features/landing/components/PlatformStats";
import CTASection from "@/features/landing/components/CTASection";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * The main Homepage (Restored in (marketing) group).
 */
export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_access")?.value;
  const role = cookieStore.get("joblyne_role")?.value;

  // Specific redirect for Candidates as requested
  if (token && role === "CANDIDATE") {
    redirect("/dashboard");
  }

  // Broad redirect for any logged-in user to ensure they reach their respective areas
  if (token) {
    if (role === "RECRUITER") redirect("/recruiter/dashboard");
    if (role === "COMPANY") redirect("/company"); // Or /company/dashboard if it exists
    redirect("/dashboard"); // Fallback
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <HiringCompanies />
      <StakeholderNav />
      <RecommendedJobs />
      <ValueProps />
      <PlatformStats />
      <CTASection />
    </div>
  );
}
