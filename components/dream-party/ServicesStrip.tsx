"use client";

import { G } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";

export default function ServicesStrip() {
  const { isMobile } = useViewport();

  return (
    <div
      style={{
        background: G.gradPrimary,
        padding: isMobile ? "16px 12px" : "22px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: isMobile ? 14 : 60,
        flexWrap: "wrap",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.14)",
      }}
    >
      {["🚀 Home Delivery", "🪑 Dine In Available", "⭐ Premium Quality", "🕐 Open 10am – 10pm"].map((t) => (
        <div
          key={t}
          style={{
            color: G.dark,
            fontFamily: "Marcellus, serif",
            fontSize: isMobile ? "0.68rem" : "0.85rem",
            letterSpacing: isMobile ? "0.08em" : "0.16em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {t}
        </div>
      ))}
    </div>
  );
}