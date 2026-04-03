"use client";

import { BORDER_MID, G, PANEL_SOFT } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";
import Reveal from "./Reveal";

export default function FounderSection() {
  const { isMobile, isTablet } = useViewport();

  const pagePad = isMobile ? 10 : isTablet ? 20 : 40;
  const sectionPadY = isMobile ? 52 : isTablet ? 76 : 90;

  return (
    <section
      id="founder"
      style={{
        padding: `${sectionPadY}px ${pagePad}px`,
        background:
          "linear-gradient(180deg, rgba(18,12,9,1) 0%, rgba(28,18,13,1) 100%)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "420px minmax(0, 1fr)",
          gap: isMobile ? 24 : isTablet ? 34 : 56,
          alignItems: "center",
        }}
      >
        <Reveal>
          <div
            style={{
              ...PANEL_SOFT,
              padding: 0,
              width: "100%",
            }}
          >
            <div
              style={{
                overflow: "hidden",
                borderRadius: isMobile ? 14 : 18,
                border: BORDER_MID,
              }}
            >
              <img
                src="/founderImageDreamParty.jpg"
                alt="Founder of Dream Party"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
            </div>
          </div>
        </Reveal>

        <div style={{ minWidth: 0 }}>
          <Reveal>
            <p
              style={{
                fontSize: isMobile ? "0.62rem" : "0.72rem",
                letterSpacing: isMobile ? "0.22em" : "0.35em",
                textTransform: "uppercase",
                color: G.goldLight,
                marginBottom: 10,
              }}
            >
              Founder&apos;s Message
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: isMobile
                  ? "1.85rem"
                  : isTablet
                    ? "2.5rem"
                    : "clamp(2.5rem, 4vw, 3.8rem)",
                lineHeight: 1.15,
                color: G.cream,
                marginBottom: 14,
                marginTop: 0,
                wordBreak: "break-word",
              }}
            >
              Built with warmth,
              <br />
              served with <em style={{ color: G.goldLight, fontStyle: "italic" }}>heart</em>
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <div
              style={{
                color: G.goldLight,
                fontSize: isMobile ? "0.95rem" : isTablet ? "1rem" : "1.08rem",
                marginBottom: 16,
                fontFamily: "Cormorant Garamond, serif",
                lineHeight: 1.5,
              }}
            >
              Akash Saini • Founder, Dream Party
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p
              style={{
                color: G.textDim,
                lineHeight: isMobile ? 1.75 : 1.9,
                fontSize: isMobile ? "0.95rem" : isTablet ? "1rem" : "1.06rem",
                marginBottom: 16,
                fontWeight: 300,
              }}
            >
              At Dream Party, our vision is simple — to give every customer delicious
              food, memorable service, and a joyful experience they truly want to come
              back to. We believe great celebrations begin with genuine hospitality.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <p
              style={{
                color: G.textDim,
                lineHeight: isMobile ? 1.75 : 1.9,
                fontSize: isMobile ? "0.95rem" : isTablet ? "1rem" : "1.06rem",
                marginBottom: 22,
                fontWeight: 300,
              }}
            >
              Whether you visit us with family, order for an event, or trust us for a
              special day, our promise is to serve fresh, pure vegetarian food with
              quality, care, and respect for every guest.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div
              style={{
                display: "block",
                width: "100%",
                maxWidth: 680,
                padding: isMobile ? "14px 14px" : isTablet ? "15px 18px" : "16px 20px",
                borderRadius: isMobile ? 14 : 16,
                border: "1px solid rgba(245,158,11,0.18)",
                background: "rgba(255,255,255,0.03)",
                color: G.creamDim,
                fontFamily: "Cormorant Garamond, serif",
                lineHeight: isMobile ? 1.7 : 1.8,
                fontSize: isMobile ? "0.98rem" : isTablet ? "1.02rem" : "1.08rem",
                boxSizing: "border-box",
              }}
            >
              “Our goal is not only to serve food, but to create happiness, trust, and
              a celebration-worthy experience for every customer.”
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}