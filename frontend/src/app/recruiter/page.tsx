"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RecruiterRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/recruiter/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="size-12 bg-primary/20 rounded-full border border-primary/30"></div>
        <p className="text-muted text-sm font-medium italic">Redirecting to recruiter portal...</p>
      </div>
    </div>
  );
}
