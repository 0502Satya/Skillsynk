import Hero from "@/features/landing/components/Hero";
import HiringCompanies from "@/features/landing/components/HiringCompanies";
import StakeholderNav from "@/features/landing/components/StakeholderNav";
import RecommendedJobs from "@/features/landing/components/RecommendedJobs";
import ValueProps from "@/features/landing/components/ValueProps";
import CourseShowcase from "@/features/landing/components/CourseShowcase";
import PlatformStats from "@/features/landing/components/PlatformStats";
import CTASection from "@/features/landing/components/CTASection";

/**
 * The main Homepage.
 * Here we put together all the different parts (sections) of the page.
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Each tag below is one section of the page in order */}
      <Hero />
      <HiringCompanies />
      <StakeholderNav />
      <RecommendedJobs />
      <ValueProps />
      {/* CourseShowcase is turned off (commented out) for now */}
      {/* <CourseShowcase /> */}
      <PlatformStats />
      <CTASection />
    </div>
  );
}
