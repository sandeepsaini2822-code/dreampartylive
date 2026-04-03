"use client";

import { BTN_PRIMARY, BTN_SECONDARY, BORDER_MID, G } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";

export default function HeroSection() {
  const { isMobile, isTablet } = useViewport();

  const pagePad = isMobile ? 16 : isTablet ? 28 : 48;
  const headingGap = isMobile ? 12 : 28; // ✅ reduced from 18 → 12 on mobile

  return (
    <section
      style={{
        minHeight: isMobile ? "75svh" : "100vh", // ✅ already fixed
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80"
        alt="hero"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.58,
          filter: "saturate(0.7)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 90% at 50% 60%, rgba(15,12,10,0.18) 0%, rgba(15,12,10,0.9) 75%)",
        }}
      />
      <div
        style={{ position: "absolute", inset: 0, background: G.gradHeroOverlay }}
      />

      <div
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          paddingTop: isMobile ? 72 : isTablet ? 88 : 100,
          paddingBottom: 0,
          paddingLeft: pagePad,
          paddingRight: pagePad,
          width: "100%",
          maxWidth: 1200,
        }}
      >
        <div
          style={{
            display: "inline-block",
            border: BORDER_MID,
            background: "rgba(255,255,255,0.03)",
            color: G.goldLight,
            boxShadow: "0 8px 30px rgba(245,158,11,0.08)",
            fontSize: isMobile ? "0.58rem" : "0.72rem",
            letterSpacing: isMobile ? "0.18em" : "0.35em",
            textTransform: "uppercase",
            padding: isMobile ? "6px 14px" : "7px 24px",
            marginBottom: isMobile ? 14 : 28, // ✅ reduced from 18 → 14 on mobile
            borderRadius: 999,
          }}
        >
          Premium Fast Food · Home Delivery · Dine In
        </div>

        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: isMobile
              ? "2.6rem"          // ✅ reduced from 3.3rem → 2.6rem on mobile
              : isTablet
                ? "5.5rem"
                : "clamp(4rem,11vw,10rem)",
            lineHeight: 0.9,
            fontWeight: 900,
            color: G.cream,
          }}
        >
          Dream
          <br />
          <span style={{ fontStyle: "italic", color: G.goldLight }}>Party</span>
        </h1>

        <p
          style={{
            marginTop: headingGap,
            fontSize: isMobile ? "0.95rem" : "1.2rem",
            fontWeight: 300,
            letterSpacing: isMobile ? "0.03em" : "0.08em",
            color: G.textDim,
            padding: isMobile ? "0 8px" : 0,
          }}
        >
          Where every bite is a celebration
        </p>

        <div
          style={{
            marginTop: isMobile ? 22 : 48, // ✅ reduced from 32 → 22 on mobile
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#menu"
            style={{
              ...BTN_PRIMARY,
              padding: isMobile ? "14px 24px" : "16px 40px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Order Now
          </a>

          <a
            href="#contact"
            style={{
              ...BTN_SECONDARY,
              padding: isMobile ? "13px 24px" : "15px 40px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Book a Table
          </a>
        </div>
      </div>
    </section>
  );
}