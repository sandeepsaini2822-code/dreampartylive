"use client";

import { MouseEvent as RMouseEvent } from "react";
import { GalleryItem } from "@/lib/dream-party-types";

interface GallerySectionProps {
  items: GalleryItem[];
}

import { BORDER_SOFT, G } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";
import Reveal from "./Reveal";

export default function GallerySection({ items }: GallerySectionProps) {
  const { isMobile, isTablet } = useViewport();

  const pagePad = isMobile ? 14 : isTablet ? 24 : 48;
  const sectionPadY = isMobile ? 52 : isTablet ? 76 : 100;

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
        paddingTop: sectionPadY,
        paddingBottom: sectionPadY,
        background: "linear-gradient(180deg, #17120f 0%, #120e0b 100%)",
      }}
    >
      {/* ── Single container: ALL horizontal spacing lives here only ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingInline: pagePad,
        }}
      >
        {/* ── Header ── */}
        <div style={{ marginBottom: isMobile ? 28 : 52 }}>
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
              Visual Feast
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: isMobile
                  ? "1.85rem"
                  : isTablet
                  ? "2.5rem"
                  : "clamp(2.4rem,5vw,3.8rem)",
                color: G.cream,
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              A Glimpse of{" "}
              <em style={{ color: G.goldLight, fontStyle: "italic" }}>
                Dream Party
              </em>
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p
              style={{
                marginTop: 14,
                color: G.textDim,
                fontSize: isMobile ? "0.92rem" : "1rem",
                lineHeight: 1.7,
                maxWidth: 720,
                fontWeight: 300,
              }}
            >
              A quick look at our ambience, presentation, and
              celebration-ready dining experience.
            </p>
          </Reveal>
        </div>

        {/* ── Gallery grid ── */}
        {items.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: G.textDim,
              fontSize: "0.95rem",
              padding: "40px 0",
            }}
          >
            Gallery coming soon.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : isTablet
                ? "repeat(2, minmax(0, 1fr))"
                : "2fr 1fr 1fr",
              gridTemplateRows: isMobile
                ? "none"
                : isTablet
                ? "repeat(3, 220px)"
                : "260px 260px",
              gap: isMobile ? 14 : 16,
            }}
          >
            {items.map((g, i) => (
              <Reveal key={g.id} delay={i * 0.06}>
                <div
                  style={{
                    gridRow:
                      !isMobile && !isTablet && i === 0 ? "span 2" : undefined,
                    gridColumn:
                      isTablet && i === 0 ? "span 2" : undefined,
                    position: "relative",
                    overflow: "hidden",
                    border: BORDER_SOFT,
                    boxShadow: "0 8px 22px rgba(0,0,0,0.2)",
                    borderRadius: isMobile ? 16 : 18,
                    minHeight: isMobile ? 220 : undefined,
                    height: isMobile ? 220 : "100%",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <img
                    src={g.img}
                    alt={g.title || `Gallery ${g.id}`}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition:
                        "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    onMouseEnter={imgHoverIn}
                    onMouseLeave={imgHoverOut}
                  />

                  {g.title && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(14,12,9,0.88) 0%, rgba(14,12,9,0.18) 45%, transparent 72%)",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: isMobile ? "16px" : "20px 22px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Playfair Display, serif",
                          color: G.cream,
                          fontSize: isMobile ? "1rem" : "1.08rem",
                          lineHeight: 1.3,
                          wordBreak: "break-word",
                        }}
                      >
                        {g.title}
                      </span>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}