"use client";

import { MouseEvent as RMouseEvent, useRef, useState } from "react";
import { GalleryItem } from "@/lib/dream-party-types";

interface GallerySectionProps {
  items: GalleryItem[];
}

import { BORDER_SOFT, G } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";
import Reveal from "./Reveal";

const CELL_HEIGHT = 260; // px — single source of truth for row height
const PEEK_COUNT = 2;

/** Returns grid placement styles for desktop 3-col layout */
function desktopGridPlacement(i: number): React.CSSProperties {
  if (i === 0) return { gridRow: "span 2" };
  return {};
}

/**
 * Compute how many rows the desktop grid needs.
 * Layout: [2fr | 1fr | 1fr]
 *   - Item 0 spans rows 1–2 in col 0
 *   - Items 1–4 fill col1+col2 for rows 1–2 (4 slots)
 *   - Items 5+ flow into new full rows of 3
 */
function desktopRowCount(n: number): number {
  if (n <= 0) return 0;
  const remaining = n - 1;
  if (remaining <= 4) return 2;
  return 2 + Math.ceil((remaining - 4) / 3);
}

/**
 * Compute rows for tablet 2-col grid.
 *   - Item 0 spans 2 cols (1 row)
 *   - Remaining items: 2 per row
 */
function tabletRowCount(n: number): number {
  if (n <= 0) return 0;
  return 1 + Math.ceil((n - 1) / 2);
}

export default function GallerySection({ items }: GallerySectionProps) {
  const { isMobile, isTablet } = useViewport();
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

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

  const goNext = () => setActiveIndex((i) => Math.min(i + 1, items.length - 1));
  const goPrev = () => setActiveIndex((i) => Math.max(i - 1, 0));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      isDragging.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current || touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -40) goNext();
    else if (dx > 40) goPrev();
    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
  };

  const desktopRows = desktopRowCount(items.length);
  const tabletRows = tabletRowCount(items.length);

  /* Shared card inner styles to avoid repetition */
  const cardInner = (spanStyles: React.CSSProperties = {}): React.CSSProperties => ({
    ...spanStyles,
    height: "100%",
    position: "relative",
    overflow: "hidden",
    border: BORDER_SOFT,
    boxShadow: "0 8px 22px rgba(0,0,0,0.2)",
    borderRadius: 18,
    background: "rgba(255,255,255,0.02)",
  });

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top, rgba(14,12,9,0.88) 0%, rgba(14,12,9,0.18) 45%, transparent 72%)",
    display: "flex",
    alignItems: "flex-end",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 22,
    paddingRight: 22,
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "Playfair Display, serif",
    color: G.cream,
    fontSize: "1.08rem",
    lineHeight: 1.3,
  };

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
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
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: pagePad,
          paddingRight: pagePad,
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

        {/* ── Gallery ── */}
        {items.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: G.textDim,
              fontSize: "0.95rem",
              paddingTop: 40,
              paddingBottom: 40,
            }}
          >
            Gallery coming soon.
          </div>

        ) : isMobile ? (
          /* ── MOBILE: Playing-card stack slider ── */
          <div>
            <div
              style={{
                position: "relative",
                paddingTop: 8,
                paddingBottom: PEEK_COUNT * 14 + 8,
                marginLeft: 8,
                marginRight: 8,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {items.map((g, i) => {
                const offset = i - activeIndex;
                if (offset < 0 || offset > PEEK_COUNT) return null;

                const zIndex = items.length - offset;
                const scale = 1 - offset * 0.035;
                const rotate = offset === 0 ? 0 : offset % 2 === 1 ? 3 : -3;
                const translateY = offset * 14;
                const translateX = offset % 2 === 1 ? 6 : -6;
                const isActive = offset === 0;

                return (
                  <div
                    key={g.id}
                    style={{
                      position: offset === 0 ? "relative" : "absolute",
                      top: offset === 0 ? undefined : 0,
                      left: 0,
                      right: 0,
                      zIndex,
                      transform: `translateY(${translateY}px) translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`,
                      transformOrigin: "bottom center",
                      transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
                      borderRadius: 20,
                      overflow: "hidden",
                      border: isActive ? "1px solid rgba(212,175,90,0.35)" : BORDER_SOFT,
                      boxShadow: isActive
                        ? "0 16px 48px rgba(0,0,0,0.55), 0 2px 8px rgba(212,175,90,0.12)"
                        : "0 8px 24px rgba(0,0,0,0.35)",
                      height: 260,
                      background: "rgba(255,255,255,0.02)",
                      cursor: isActive ? "grab" : "default",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                    }}
                    onClick={() => { if (!isActive) setActiveIndex(i); }}
                  >
                    <img
                      src={g.img}
                      alt={g.title || `Gallery ${g.id}`}
                      loading="lazy"
                      draggable={false}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: isActive ? "none" : "brightness(0.7)",
                        transition: "filter 0.4s ease",
                        pointerEvents: "none",
                      }}
                    />
                    {g.title && isActive && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(14,12,9,0.9) 0%, rgba(14,12,9,0.18) 45%, transparent 72%)",
                          display: "flex",
                          alignItems: "flex-end",
                          paddingTop: 18,
                          paddingBottom: 18,
                          paddingLeft: 16,
                          paddingRight: 16,
                        }}
                      >
                        <span style={{ fontFamily: "Playfair Display, serif", color: G.cream, fontSize: "1rem", lineHeight: 1.3 }}>
                          {g.title}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 24,
                paddingLeft: 4,
                paddingRight: 4,
              }}
            >
              <button
                onClick={goPrev}
                disabled={activeIndex === 0}
                aria-label="Previous image"
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: `1px solid rgba(212,175,90,${activeIndex === 0 ? "0.15" : "0.4"})`,
                  background: "rgba(212,175,90,0.06)",
                  color: activeIndex === 0 ? "rgba(212,175,90,0.25)" : G.goldLight,
                  fontSize: "1.1rem", display: "flex", alignItems: "center",
                  justifyContent: "center",
                  cursor: activeIndex === 0 ? "default" : "pointer",
                  transition: "all 0.25s ease", flexShrink: 0,
                }}
              >‹</button>

              <div
                style={{
                  display: "flex", gap: 7, alignItems: "center",
                  flexWrap: "wrap", justifyContent: "center",
                  flex: 1, paddingLeft: 12, paddingRight: 12,
                }}
              >
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to image ${i + 1}`}
                    style={{
                      width: i === activeIndex ? 20 : 7, height: 7,
                      borderRadius: 99, border: "none",
                      background: i === activeIndex ? G.goldLight : "rgba(212,175,90,0.28)",
                      cursor: "pointer", padding: 0,
                      transition: "width 0.35s cubic-bezier(0.22,1,0.36,1), background 0.25s ease",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                disabled={activeIndex === items.length - 1}
                aria-label="Next image"
                style={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: `1px solid rgba(212,175,90,${activeIndex === items.length - 1 ? "0.15" : "0.4"})`,
                  background: "rgba(212,175,90,0.06)",
                  color: activeIndex === items.length - 1 ? "rgba(212,175,90,0.25)" : G.goldLight,
                  fontSize: "1.1rem", display: "flex", alignItems: "center",
                  justifyContent: "center",
                  cursor: activeIndex === items.length - 1 ? "default" : "pointer",
                  transition: "all 0.25s ease", flexShrink: 0,
                }}
              >›</button>
            </div>

            <p style={{ textAlign: "center", marginTop: 10, color: G.textDim, fontSize: "0.75rem", letterSpacing: "0.1em" }}>
              {activeIndex + 1} / {items.length}
            </p>
          </div>

        ) : isTablet ? (
          /* ── TABLET: 2-col, dynamic rows ── */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gridTemplateRows: `repeat(${tabletRows}, ${CELL_HEIGHT}px)`,
              gap: 16,
            }}
          >
            {items.map((g, i) => (
              <Reveal key={g.id} delay={i * 0.06}>
                <div style={cardInner(i === 0 ? { gridColumn: "span 2" } : {})}>
                  <img src={g.img} alt={g.title || `Gallery ${g.id}`} loading="lazy" style={imgStyle} onMouseEnter={imgHoverIn} onMouseLeave={imgHoverOut} />
                  {g.title && (
                    <div style={overlayStyle}>
                      <span style={titleStyle}>{g.title}</span>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

        ) : (
          /* ── DESKTOP: 3-col [2fr 1fr 1fr], dynamic rows — no more overflow ── */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gridTemplateRows: `repeat(${desktopRows}, ${CELL_HEIGHT}px)`,
              gap: 16,
            }}
          >
            {items.map((g, i) => (
              <Reveal key={g.id} delay={i * 0.06}>
                <div style={cardInner(desktopGridPlacement(i))}>
                  <img src={g.img} alt={g.title || `Gallery ${g.id}`} loading="lazy" style={imgStyle} onMouseEnter={imgHoverIn} onMouseLeave={imgHoverOut} />
                  {g.title && (
                    <div style={overlayStyle}>
                      <span style={titleStyle}>{g.title}</span>
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