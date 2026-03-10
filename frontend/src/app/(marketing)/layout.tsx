import React from "react";
import Navbar from "@/shared/layout/Navbar";
import Footer from "@/shared/layout/Footer";

/**
 * Marketing Layout.
 * Includes the Navbar and Footer for all marketing/landing pages.
 */
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
