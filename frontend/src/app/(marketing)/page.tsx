import Hero from "@/features/landing/components/Hero";
import HiringCompanies from "@/features/landing/components/HiringCompanies";
import StakeholderNav from "@/features/landing/components/StakeholderNav";
import RecommendedJobs from "@/features/landing/components/RecommendedJobs";
import ValueProps from "@/features/landing/components/ValueProps";
import PlatformStats from "@/features/landing/components/PlatformStats";
import CTASection from "@/features/landing/components/CTASection";

/**
 * The main Homepage (Restored in (marketing) group).
 */
export default function Home() {
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
