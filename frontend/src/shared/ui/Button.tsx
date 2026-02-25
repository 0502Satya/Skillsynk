import React from "react";

/**
 * A reusable Button component.
 * You can choose different styles (variant) and different sizes.
 * The colors come from the settings in globals.css.
 */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  // Styles that every button will have (like rounded corners and smooth transitions)
  const base =
    "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl shadow-sm active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  // Different color styles
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20",
    secondary: "bg-accent text-white hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/20",
    outline: "border border-border/60 bg-transparent text-text hover:bg-muted/10 hover:border-primary",
    ghost: "bg-transparent text-muted hover:text-primary hover:bg-primary/5 shadow-none border-transparent",
  };

  // Different size options
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-10 py-5 text-lg rounded-2xl",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}