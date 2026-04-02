"use client";

import { useEffect, useState } from "react";
import { useReveal } from "@/lib/dream-party-hooks";
import { RevealProps } from "@/lib/dream-party-types";

export default function Reveal({ children, delay = 0, style = {} }: RevealProps): React.JSX.Element {
  const [ref, vis] = useReveal();
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowFallback(true), 700);
    return () => clearTimeout(t);
  }, []);

  const visible = vis || showFallback;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.9s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.9s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}