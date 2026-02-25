import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/shared/layout/Navbar";
import Footer from "@/shared/layout/Footer";

/**
 * Setting up the 'Inter' font for the whole website.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/**
 * These are the name and description of the website that show up in Google.
 */
export const metadata: Metadata = {
  title: "SkillSync - Your Career Intelligence Platform",
  description:
    "SkillSync helps teams find skill gaps, plan growth, and track success.",
};

/**
 * The Root Layout is the shell for every page on the site.
 * It includes the font, the Navbar at the top, and the Footer at the bottom.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* We load special icons from Google here */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} antialiased font-display bg-[#f6f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 transition-colors`}
      >
        {/* The top navigation menu */}
        <Navbar />

        {/* This is where the specific content of each page will appear */}
        <main className="flex-1">
          {children}
        </main>

        {/* The section at the bottom of the page */}
        <Footer />
      </body>
    </html>
  );
}
