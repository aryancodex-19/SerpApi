"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      loading = false,
      children,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      const rect = button.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add("ripple");
      const existingRipple = button.getElementsByClassName("ripple")[0];
      if (existingRipple) existingRipple.remove();
      button.appendChild(circle);
      setTimeout(() => circle.remove(), 650);

      if (onClick) {
        onClick(e);
      }
    };

    const baseStyles =
      "relative inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer overflow-hidden";
    let variantStyles = "";
    let sizeStyles = "";

    switch (variant) {
      case "default":
      case "gradient":
        variantStyles =
          "bg-emerald-500 hover:bg-emerald-600 text-black";
        break;
      case "destructive":
        variantStyles =
          "bg-red-600 hover:bg-red-700 text-white";
        break;
      case "outline":
        variantStyles =
          "border border-zinc-800 bg-transparent text-white hover:bg-zinc-900 hover:border-zinc-700";
        break;
      case "secondary":
        variantStyles =
          "bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800";
        break;
      case "ghost":
        variantStyles =
          "text-zinc-300 hover:text-white hover:bg-zinc-900";
        break;
      case "link":
        variantStyles =
          "text-emerald-500 underline-offset-4 hover:underline hover:text-emerald-400 p-0 h-auto";
        break;
    }

    switch (size) {
      case "default":
        sizeStyles = "h-10 px-4 py-2 rounded-md text-sm";
        break;
      case "sm":
        sizeStyles = "h-8 px-3 text-xs rounded-md";
        break;
      case "lg":
        sizeStyles = "h-12 px-8 text-base rounded-md";
        break;
      case "icon":
        sizeStyles = "h-10 w-10 p-0 rounded-md";
        break;
    }

    return (
      <button
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        ref={ref}
        disabled={disabled || loading}
        onClick={handleRipple}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
