"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="rounded border border-border px-3 py-1 text-sm"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}