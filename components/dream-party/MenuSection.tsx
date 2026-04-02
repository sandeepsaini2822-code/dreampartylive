"use client";

import { MouseEvent as RMouseEvent } from "react";
import { BORDER_MID, BORDER_SOFT, BTN_PRIMARY, G, PANEL, TAG_STYLE } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";
import { MenuItem } from "@/lib/dream-party-types";
import Reveal from "./Reveal";

interface MenuSectionProps {
  categories: string[];
  activeCat: string;
  setActiveCat: (cat: string) => void;
  filtered: MenuItem[];
  addedId: number | null;
  onAdd: (item: MenuItem) => void;
}

export default function MenuSection({
  categories,
  activeCat,
  setActiveCat,
  filtered,
  addedId,
  onAdd,
}: MenuSectionProps) {
  const { isMobile, isTablet } = useViewport();
  const pagePad = isMobile ? 16 : isTablet ? 28 : 48;
  const sectionPadY = isMobile ? 64 : 100;

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

  const divHoverIn = (e: RMouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 16px 40px rgba(234,88,12,0.18)";
  };

  const divHoverOut = (e: RMouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.22)";
  };

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
      id="menu"
      style={{
        padding: `${sectionPadY}px ${pagePad}px`,
        background:
          "radial-gradient(circle at top, rgba(245,158,11,0.06) 0%, rgba(18,13,10,1) 28%), linear-gradient(180deg, #120d0a 0%, #1a120d 100%)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 56 }}>
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
            What We Serve
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
            Our <em style={{ fontStyle: "italic", color: G.goldLight }}>Signature</em> Menu
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p style={{ marginTop: 16, color: G.textDim, fontWeight: 300 }}>
            Crafted with premium ingredients, made to impress.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.25}>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: isMobile ? 32 : 52,
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={{
                padding: isMobile ? "8px 14px" : "9px 22px",
                background: activeCat === cat ? G.gradPrimary : G.gradDark,
                color: activeCat === cat ? G.dark : G.textDim,
                border: activeCat === cat ? BORDER_MID : BORDER_SOFT,
                fontFamily: "Marcellus, serif",
                fontSize: isMobile ? "0.64rem" : "0.75rem",
                letterSpacing: isMobile ? "0.08em" : "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                boxShadow: activeCat === cat ? G.shadowGlowSoft : "none",
                transition: "all 0.25s ease",
                borderRadius: 999,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
              ? "repeat(2, minmax(0, 1fr))"
              : "repeat(auto-fill,minmax(280px,1fr))",
          gap: isMobile ? 14 : 18,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {filtered.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.05}>
            <div
              style={{
                ...PANEL,
                overflow: "hidden",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
                position: "relative",
              }}
              onMouseEnter={divHoverIn}
              onMouseLeave={divHoverOut}
            >
              <div
                style={{
                  position: "relative",
                  paddingTop: isMobile ? "58%" : "65%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={item.img || "https://via.placeholder.com/600x400?text=No+Image"}
                  alt={item.name}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={imgHoverIn}
                  onMouseLeave={imgHoverOut}
                />
                <div style={{ position: "absolute", top: 12, left: 12, ...TAG_STYLE }}>
                  {item.tag}
                </div>
              </div>

              <div style={{ padding: isMobile ? "18px" : "24px" }}>
                <div
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: G.goldLight,
                    marginBottom: 8,
                  }}
                >
                  {item.category}
                </div>

                <div
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: isMobile ? "1.1rem" : "1.3rem",
                    color: G.cream,
                    marginBottom: 10,
                  }}
                >
                  {item.name}
                </div>

                <div
                  style={{
                    fontSize: isMobile ? "0.86rem" : "0.92rem",
                    color: G.textDim,
                    lineHeight: 1.7,
                    fontWeight: 300,
                    marginBottom: 20,
                  }}
                >
                  {item.desc}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <span
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: isMobile ? "1.2rem" : "1.4rem",
                      color: G.goldLight,
                    }}
                  >
                    ₹{item.price}
                  </span>

                  <button
                    onClick={() => onAdd(item)}
                    onMouseEnter={btnHoverIn}
                    onMouseLeave={btnHoverOut}
                    style={{
                      ...BTN_PRIMARY,
                      padding: isMobile ? "10px 16px" : "10px 22px",
                      fontSize: isMobile ? "0.7rem" : "0.78rem",
                      background:
                        addedId === item.id
                          ? "linear-gradient(135deg, #b45309 0%, #92400e 100%)"
                          : G.gradPrimary,
                    }}
                  >
                    {addedId === item.id ? "✓ Added" : "+ Add"}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}