import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "purple";
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50";
  let variantStyles = "";

  switch (variant) {
    case "default":
    case "purple":
    case "secondary":
    case "outline":
      variantStyles =
        "border border-zinc-700 bg-zinc-800 text-zinc-300";
      break;
    case "destructive":
      variantStyles =
        "border border-red-500/30 bg-red-500/10 text-red-400";
      break;
    case "success":
      variantStyles =
        "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
      break;
  }

  return <div className={`${baseStyles} ${variantStyles} ${className}`} {...props} />;
}
