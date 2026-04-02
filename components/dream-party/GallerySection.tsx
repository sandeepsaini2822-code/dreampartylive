"use client";

import { MouseEvent as RMouseEvent } from "react";
import { GALLERY } from "@/lib/dream-party-data";
import { BORDER_SOFT, G } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";
import Reveal from "./Reveal";

export default function GallerySection() {
  const { isMobile, isTablet } = useViewport();
  const pagePad = isMobile ? 16 : isTablet ? 28 : 48;
  const sectionPadY = isMobile ? 64 : 100;

  const imgHoverIn = (e: RMouseEvent<HTMLImageElement>) => {
    if (isMobile) return;
    e.currentTarget.style.transform = "scale(1.06)";
  };

  const imgHoverOut = (e: RMouseEvent<HTMLImageElement>) => {
    if (isMobile) return;
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <section
      id="gallery"
      style={{
        padding: `${sectionPadY}px ${pagePad}px`,
        background: "linear-gradient(180deg, #17120f 0%, #120e0b 100%)",
      }}
    >
      <div style={{ marginBottom: 52 }}>
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
            Visual Feast
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: isMobile ? "2rem" : "clamp(2.4rem,5vw,3.8rem)",
              color: G.cream,
              lineHeight: 1.15,
            }}
          >
            A Glimpse of <em style={{ color: G.goldLight, fontStyle: "italic" }}>Dream Party</em>
          </h2>
        </Reveal>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
              ? "1fr 1fr"
              : "2fr 1fr 1fr",
          gridTemplateRows: isMobile
            ? "repeat(5, 220px)"
            : isTablet
              ? "repeat(3, 220px)"
              : "260px 260px",
          gap: 12,
        }}
      >
        {GALLERY.map((g, i) => (
          <div
            key={i}
            style={{
              gridRow: !isMobile && !isTablet && i === 0 ? "span 2" : undefined,
              gridColumn: isTablet && i === 0 ? "span 2" : undefined,
              position: "relative",
              overflow: "hidden",
              border: BORDER_SOFT,
              boxShadow: "0 8px 22px rgba(0,0,0,0.2)",
              borderRadius: 18,
            }}
          >
            <img
              src={g.img}
              alt={g.label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={imgHoverIn}
              onMouseLeave={imgHoverOut}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top,rgba(14,12,9,0.8) 0%,transparent 60%)",
                display: "flex",
                alignItems: "flex-end",
                padding: "20px 22px",
              }}
            >
              <span style={{ fontFamily: "Playfair Display, serif", color: G.cream }}>{g.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}