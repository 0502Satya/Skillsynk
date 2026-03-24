"use client";

import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const icon = type === "success" ? "check_circle" : type === "error" ? "error" : "info";
  const iconColor = type === "success" ? "text-green-400" : type === "error" ? "text-red-400" : "text-blue-400";

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold px-5 py-3 rounded-xl shadow-xl flex items-center gap-2">
        <span className={`material-symbols-outlined text-base ${iconColor}`}>{icon}</span>
        <span>{message}</span>
      </div>
    </div>
  );
}
