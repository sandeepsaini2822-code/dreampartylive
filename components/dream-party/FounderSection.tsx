"use client";

import { BORDER_MID, G, PANEL_SOFT } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";
import Reveal from "./Reveal";

export default function FounderSection() {
  const { isMobile, isTablet } = useViewport();
  const pagePad = isMobile ? 16 : isTablet ? 28 : 48;
  const sectionPadY = isMobile ? 64 : 100;

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
          gridTemplateColumns: isMobile || isTablet ? "1fr" : "420px 1fr",
          gap: isMobile ? 32 : 56,
          alignItems: "center",
        }}
      >
        <Reveal>
          <div
            style={{
              ...PANEL_SOFT,
              padding: isMobile ? 18 : 22,
            }}
          >
            <div
              style={{
                width: "100%",
                overflow: "hidden",
                borderRadius: 18,
                border: BORDER_MID,
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <img
                src="/founderImageDreamParty.jpg"
                alt="Founder of Dream Party"
                style={{
                  width: "100%",
                  height: isMobile ? 320 : 445,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: G.goldLight,
                marginBottom: 12,
              }}
            >
              Founder&apos;s Message
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: isMobile ? "2rem" : "clamp(2.5rem, 4vw, 3.8rem)",
                lineHeight: 1.12,
                color: G.cream,
                marginBottom: 14,
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
                fontSize: isMobile ? "1rem" : "1.08rem",
                marginBottom: 18,
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              Akash Saini • Founder, Dream Party
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p
              style={{
                color: G.textDim,
                lineHeight: 1.9,
                fontSize: isMobile ? "1rem" : "1.06rem",
                marginBottom: 18,
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
                lineHeight: 1.9,
                fontSize: isMobile ? "1rem" : "1.06rem",
                marginBottom: 26,
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
                display: "inline-block",
                padding: isMobile ? "14px 16px" : "16px 20px",
                borderRadius: 16,
                border: "1px solid rgba(245,158,11,0.18)",
                background: "rgba(255,255,255,0.03)",
                color: G.creamDim,
                fontFamily: "Cormorant Garamond, serif",
                lineHeight: 1.8,
                maxWidth: 680,
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