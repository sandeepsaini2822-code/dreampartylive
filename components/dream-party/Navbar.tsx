"use client";

import { useState, MouseEvent as RMouseEvent } from "react";
import { BTN_PRIMARY, G } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";

interface NavbarProps {
  count: number;
  onCartOpen: () => void;
}

export default function Navbar({ count, onCartOpen }: NavbarProps) {
  const { isMobile, isTablet } = useViewport();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navPad = isMobile ? "12px 14px" : isTablet ? "16px 24px" : "18px 40px";

  const aHoverGold = (e: RMouseEvent<HTMLAnchorElement>) => {
    if (!isMobile) {
      e.currentTarget.style.color = G.goldLight;
    }
  };

  const aHoverDim = (e: RMouseEvent<HTMLAnchorElement>) => {
    if (!isMobile) {
      e.currentTarget.style.color = G.creamDim;
    }
  };

  const btnHoverIn = (e: RMouseEvent<HTMLButtonElement>) => {
    if (!isMobile) {
      e.currentTarget.style.background =
        "linear-gradient(135deg, #fb923c 0%, #ea580c 55%, #c2410c 100%)";
      e.currentTarget.style.boxShadow = "0 12px 34px rgba(234,88,12,0.35)";
      e.currentTarget.style.transform = "translateY(-1px)";
    }
  };

  const btnHoverOut = (e: RMouseEvent<HTMLButtonElement>) => {
    if (!isMobile) {
      e.currentTarget.style.background = G.gradPrimary;
      e.currentTarget.style.boxShadow = G.shadowGlow;
      e.currentTarget.style.transform = "translateY(0)";
    }
  };

  const links = ["Menu", "Gallery", "Contact"];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: navPad,
        background:
          "linear-gradient(to bottom, rgba(15,12,10,0.96) 0%, rgba(15,12,10,0.84) 60%, rgba(15,12,10,0.55) 82%, rgba(15,12,10,0.18) 100%)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(245,158,11,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 10 : 18,
        }}
      >
        {/* Left brand */}
        <div
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: isMobile ? "1rem" : isTablet ? "1.25rem" : "1.5rem",
            color: G.goldLight,
            fontStyle: "italic",
            letterSpacing: isMobile ? "0.05em" : "0.08em",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Dream Party
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: isTablet ? 22 : 34,
              flex: 1,
            }}
          >
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={{
                  color: G.creamDim,
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "6px 4px",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={aHoverGold}
                onMouseLeave={aHoverDim}
              >
                {l}
              </a>
            ))}
          </div>
        )}

        {/* Right side desktop */}
        {!isMobile && (
          <button
            onClick={onCartOpen}
            onMouseEnter={btnHoverIn}
            onMouseLeave={btnHoverOut}
            style={{
              ...BTN_PRIMARY,
              padding: isTablet ? "10px 18px" : "11px 24px",
              fontSize: isTablet ? "0.74rem" : "0.78rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              minHeight: 42,
              flexShrink: 0,
            }}
          >
            <span>🛒 Cart</span>
            {count > 0 && (
              <span
                style={{
                  background: G.dark,
                  color: G.goldLight,
                  borderRadius: "999px",
                  minWidth: 22,
                  height: 22,
                  padding: "0 6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.72rem",
                  border: "1px solid rgba(245,158,11,0.25)",
                  lineHeight: 1,
                }}
              >
                {count}
              </span>
            )}
          </button>
        )}

        {/* Mobile menu button */}
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            style={{
              background: "transparent",
              border: "1px solid rgba(245,158,11,0.18)",
              color: G.goldLight,
              borderRadius: 10,
              padding: "8px 12px",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            maxWidth: 1400,
            margin: "12px auto 0",
            padding: "14px",
            borderRadius: 16,
            background: "rgba(24,18,14,0.96)",
            border: "1px solid rgba(245,158,11,0.12)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: G.creamDim,
                textDecoration: "none",
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "10px 12px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.02)",
              }}
            >
              {l}
            </a>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onCartOpen();
            }}
            style={{
              ...BTN_PRIMARY,
              width: "100%",
              padding: "12px 16px",
              fontSize: "0.78rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              minHeight: 46,
              marginTop: 4,
            }}
          >
            <span>🛒 Cart</span>
            {count > 0 && (
              <span
                style={{
                  background: G.dark,
                  color: G.goldLight,
                  borderRadius: "999px",
                  minWidth: 22,
                  height: 22,
                  padding: "0 6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.72rem",
                  border: "1px solid rgba(245,158,11,0.25)",
                  lineHeight: 1,
                }}
              >
                {count}
              </span>
            )}
          </button>
        </div>
      )}
    </nav>
  );
}