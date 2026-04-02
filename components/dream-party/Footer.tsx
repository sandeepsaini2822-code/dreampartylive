"use client";

import { MouseEvent as RMouseEvent } from "react";
import { G } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";

export default function Footer() {
  const { isMobile } = useViewport();

  const aHoverGold = (e: RMouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = G.goldLight;
  };

  const aHoverTextDim = (e: RMouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = G.textDim;
  };

  return (
    <footer
      style={{
        background: G.dark2,
        padding: isMobile ? "28px 16px" : "40px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: isMobile ? "column" : "row",
        textAlign: isMobile ? "center" : "left",
        borderTop: "1px solid rgba(245,158,11,0.08)",
        flexWrap: "wrap",
        gap: 20,
      }}
    >
      <div
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "1.3rem",
          fontStyle: "italic",
          color: G.goldLight,
        }}
      >
        Dream Party
      </div>

      <p style={{ fontSize: "0.8rem", letterSpacing: "0.1em", color: G.textDim }}>
        © 2025 Dream Party Café. All rights reserved.
      </p>

      <div style={{ display: "flex", gap: isMobile ? 18 : 28, flexWrap: "wrap", justifyContent: "center" }}>
        {["Menu", "Gallery", "Contact"].map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{
              color: G.textDim,
              textDecoration: "none",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
            onMouseEnter={aHoverGold}
            onMouseLeave={aHoverTextDim}
          >
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
}