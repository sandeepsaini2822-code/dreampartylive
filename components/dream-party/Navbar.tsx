"use client";

import { MouseEvent as RMouseEvent } from "react";
import { BTN_PRIMARY, G } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";

interface NavbarProps {
  count: number;
  onCartOpen: () => void;
}

export default function Navbar({ count, onCartOpen }: NavbarProps) {
  const { isMobile, isTablet } = useViewport();
  const navPad = isMobile ? "14px 16px" : isTablet ? "18px 28px" : "20px 48px";

  const aHoverGold = (e: RMouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = G.goldLight;
  };

  const aHoverDim = (e: RMouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = G.creamDim;
  };

  const btnHoverIn = (e: RMouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "linear-gradient(135deg, #fb923c 0%, #ea580c 55%, #c2410c 100%)";
    e.currentTarget.style.boxShadow = "0 12px 34px rgba(234,88,12,0.35)";
    e.currentTarget.style.transform = "translateY(-1px)";
  };

  const btnHoverOut = (e: RMouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = G.gradPrimary;
    e.currentTarget.style.boxShadow = G.shadowGlow;
    e.currentTarget.style.transform = "translateY(0)";
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: isMobile ? "wrap" : "nowrap",
        gap: isMobile ? 12 : 0,
        padding: navPad,
        background: "linear-gradient(to bottom, rgba(15,12,10,0.92) 0%, rgba(15,12,10,0.62) 55%, transparent 100%)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(245,158,11,0.08)",
      }}
    >
      <div
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: isMobile ? "1.15rem" : "1.5rem",
          color: G.goldLight,
          fontStyle: "italic",
          letterSpacing: "0.08em",
          flexShrink: 0,
        }}
      >
        Dream Party
      </div>

      <div
        style={{
          display: "flex",
          gap: isMobile ? 14 : 36,
          flexWrap: "wrap",
          justifyContent: isMobile ? "center" : "flex-start",
          width: isMobile ? "100%" : "auto",
          order: isMobile ? 3 : 2,
        }}
      >
        {["Menu", "Gallery", "Contact"].map((l) => (
          <a
            key={l}
            href={`#${l.toLowerCase()}`}
            style={{
              color: G.creamDim,
              textDecoration: "none",
              fontSize: isMobile ? "0.68rem" : "0.82rem",
              letterSpacing: isMobile ? "0.14em" : "0.2em",
              textTransform: "uppercase",
            }}
            onMouseEnter={aHoverGold}
            onMouseLeave={aHoverDim}
          >
            {l}
          </a>
        ))}
      </div>

      <button
        onClick={onCartOpen}
        onMouseEnter={btnHoverIn}
        onMouseLeave={btnHoverOut}
        style={{
          ...BTN_PRIMARY,
          padding: isMobile ? "10px 16px" : "11px 24px",
          fontSize: isMobile ? "0.7rem" : "0.78rem",
          display: "flex",
          alignItems: "center",
          gap: 10,
          order: isMobile ? 2 : 3,
        }}
      >
        🛒 Cart
        {count > 0 && (
          <span
            style={{
              background: G.dark,
              color: G.goldLight,
              borderRadius: "50%",
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              border: "1px solid rgba(245,158,11,0.25)",
            }}
          >
            {count}
          </span>
        )}
      </button>
    </nav>
  );
}