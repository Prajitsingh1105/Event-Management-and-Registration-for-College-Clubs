import React from "react";
import fade from "./fade-in.js";

export default function FadeIn({ children, className = "" }) {
  const ref = fade();

  return (
    <div
      ref={ref}
      className={`
        opacity-0 
        translate-y-6 
        scale-95 
        drop-shadow-[0_10px_15px_rgba(156,163,175,0.5)] 
        transition-all 
        duration-1000 
        ease-out
        ${className}
      `}
    >
      {children}
    </div>
  );
}
