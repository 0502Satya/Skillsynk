type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "rounded-md px-4 py-2 font-medium transition-colors duration-200";

  const variants = {
    primary: "bg-primary text-white hover:opacity-90",
    secondary: "bg-muted text-text hover:opacity-80",
    outline: "border border-border text-text hover:bg-muted",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}