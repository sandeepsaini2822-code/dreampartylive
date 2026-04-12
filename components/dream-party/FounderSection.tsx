"use client";

import { G } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";
import Reveal from "./Reveal";

export default function FounderSection() {
  const { isMobile, isTablet } = useViewport();

  const pagePad = isMobile ? 16 : isTablet ? 24 : 48;
  const sectionPadY = isMobile ? 52 : isTablet ? 76 : 90;

  return (
    <section
      id="founder"
      style={{
        paddingTop: sectionPadY,
        paddingBottom: sectionPadY,
        background:
          "linear-gradient(180deg, rgba(18,12,9,1) 0%, rgba(28,18,13,1) 100%)",
      }}
    >
      {/* ── Single container ── */}
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          paddingInline: pagePad,
        }}
      >
        {/* ── Label ── */}
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

        {/* ── Heading row: text left, photo right ── */}
        <Reveal delay={0.08}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: isMobile ? 10: 18,
              marginBottom: 20,
            }}
          >
            {/* Heading */}
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: isMobile
                  ? "1.85rem"
                  : isTablet
                  ? "2.5rem"
                  : "clamp(2.5rem, 4vw, 3.4rem)",
                lineHeight: 1.15,
                color: G.cream,
                margin: 0,
                wordBreak: "break-word",
                flex: 1,
              }}
            >
              Built with warmth,
              <br />
              served with{" "}
              <em style={{ color: G.goldLight, fontStyle: "italic" }}>
                heart
              </em>
            </h2>

            {/* Rectangular photo — aligned to heading */}
            <div
              style={{
                width: isMobile ? 88 : isTablet ? 108 : 158,
                height: isMobile ? 112 : isTablet ? 138 : 182,
                borderRadius: isMobile ? 12 : 14,
                overflow: "hidden",
                border: "2px solid rgba(245,158,11,0.28)",
                boxShadow: "0 6px 24px rgba(245,158,11,0.10)",
                flexShrink: 0,
              }}
            >
              <img
                src="/founderImageDreamParty.jpg"
                alt="Akash Saini — Founder of Dream Party"
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

        {/* ── Founder name + role ── */}
        <Reveal delay={0.16}>
          <div
            style={{
              color: G.goldLight,
              fontSize: isMobile ? "0.95rem" : "1rem",
              marginBottom: 18,
              fontFamily: "Cormorant Garamond, serif",
              lineHeight: 1.5,
            }}
          >
            Akash Saini • Founder, Dream Party
          </div>
        </Reveal>

        {/* ── Body paragraphs ── */}
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
            At Dream Party, our vision is simple — to give every customer
            delicious food, memorable service, and a joyful experience they
            truly want to come back to. We believe great celebrations begin
            with genuine hospitality.
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
            Whether you visit us with family, order for an event, or trust
            us for a special day, our promise is to serve fresh, pure
            vegetarian food with quality, care, and respect for every guest.
          </p>
        </Reveal>

        {/* ── Quote block ── */}
        <Reveal delay={0.4}>
          <div
            style={{
              width: "100%",
              padding: isMobile ? "14px" : isTablet ? "15px 18px" : "16px 20px",
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
            "Our goal is not only to serve food, but to create happiness,
            trust, and a celebration-worthy experience for every customer."
          </div>
        </Reveal>
      </div>
    </section>
  );
}