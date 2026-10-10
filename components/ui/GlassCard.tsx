"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  glowColor?: "indigo" | "violet" | "purple" | "pink" | "none";
}

function GlassCard({
  children,
  className = "",
  hoverEffect = true,
  glowColor = "purple",
  ...props
}: GlassCardProps) {
  const glowStyles = {
    purple: "hover:border-purple-500/40 hover:shadow-[0_8px_32px_rgba(168,85,247,0.2)]",
    violet: "hover:border-violet-500/40 hover:shadow-[0_8px_32px_rgba(139,92,246,0.2)]",
    indigo: "hover:border-indigo-500/40 hover:shadow-[0_8px_32px_rgba(99,102,241,0.2)]",
    pink: "hover:border-pink-500/40 hover:shadow-[0_8px_32px_rgba(236,72,153,0.2)]",
    none: "hover:border-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
  };

  return (
    <div
      {...(props as any)}
      className={`
        relative overflow-hidden rounded-lg border border-zinc-800
        bg-zinc-900 transition-colors
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default React.memo(GlassCard);
