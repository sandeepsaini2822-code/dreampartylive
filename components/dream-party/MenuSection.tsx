"use client";

import { MouseEvent as RMouseEvent, useMemo } from "react";
import {
  BORDER_MID,
  BORDER_SOFT,
  BTN_PRIMARY,
  G,
  PANEL,
  TAG_STYLE,
} from "@/lib/dream-party-theme";
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

  const pagePad = isMobile ? 14 : isTablet ? 24 : 48;
  const sectionPadY = isMobile ? 52 : isTablet ? 76 : 100;

  const btnHoverIn = (e: RMouseEvent<HTMLButtonElement>) => {
    if (isMobile || e.currentTarget.disabled) return;
    e.currentTarget.style.background =
      "linear-gradient(135deg, #fb923c 0%, #ea580c 55%, #c2410c 100%)";
    e.currentTarget.style.boxShadow = "0 12px 34px rgba(234,88,12,0.35)";
    e.currentTarget.style.transform = "translateY(-1px)";
  };

  const btnHoverOut = (e: RMouseEvent<HTMLButtonElement>) => {
    if (isMobile || e.currentTarget.disabled) return;
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

  const visibleMobileCategories =
    isMobile && activeCat === "All"
      ? categories.filter((cat) => cat !== "All")
      : [];

  const getCategoryPreviewImage = (category: string) => {
    const categoryItems = filtered.filter((item) => item.category === category);
    return (
      categoryItems[0]?.img ||
      "https://via.placeholder.com/600x400?text=No+Image"
    );
  };

  const isItemAvailable = (item: MenuItem) => {
    return String(item.available ?? "yes").toLowerCase() === "yes";
  };

  return (
    <section
      id="menu"
      style={{
        paddingTop: sectionPadY,
        paddingBottom: sectionPadY,
        background:
          "radial-gradient(circle at top, rgba(245,158,11,0.06) 0%, rgba(18,13,10,1) 28%), linear-gradient(180deg, #120d0a 0%, #1a120d 100%)",
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
        <div
          style={{
            textAlign: "center",
            marginBottom: isMobile ? 28 : 56,
          }}
        >
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
              What We Serve
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: isMobile
                  ? "1.8rem"
                  : isTablet
                    ? "2.5rem"
                    : "clamp(2.8rem,5vw,3.8rem)",
                color: G.cream,
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Our{" "}
              <em style={{ fontStyle: "italic", color: G.goldLight }}>
                Signature
              </em>{" "}
              Menu
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              style={{
                marginTop: 14,
                color: G.textDim,
                fontWeight: 300,
                fontSize: isMobile ? "0.9rem" : "1rem",
                lineHeight: 1.7,
              }}
            >
              Crafted with premium ingredients, made to impress.
            </p>
          </Reveal>
        </div>

        {/* ── Category filter bar (desktop / tablet only) ── */}
        {!isMobile && (
          <Reveal delay={0.25}>
            <div style={{ marginBottom: 44 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    style={{
                      padding: "10px 22px",
                      background: activeCat === cat ? G.gradPrimary : G.gradDark,
                      color: activeCat === cat ? G.dark : G.textDim,
                      border: activeCat === cat ? BORDER_MID : BORDER_SOFT,
                      fontFamily: "Marcellus, serif",
                      fontSize: "0.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      boxShadow: activeCat === cat ? G.shadowGlowSoft : "none",
                      transition: "all 0.25s ease",
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      minHeight: 40,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* ── Mobile: category tiles ── */}
        {isMobile && activeCat === "All" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 16,
            }}
          >
            {visibleMobileCategories.map((cat, i) => (
              <Reveal key={cat} delay={i * 0.05}>
                <button
                  onClick={() => setActiveCat(cat)}
                  style={{
                    ...PANEL,
                    padding: 0,
                    overflow: "hidden",
                    textAlign: "left",
                    cursor: "pointer",
                    border: BORDER_SOFT,
                    background: G.gradDark,
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "58%",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={getCategoryPreviewImage(cat)}
                      alt={cat}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.65) 100%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: 16,
                        right: 16,
                        bottom: 16,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "0.68rem",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: G.goldLight,
                            marginBottom: 6,
                          }}
                        >
                          Category
                        </div>
                        <div
                          style={{
                            fontFamily: "Playfair Display, serif",
                            fontSize: "1.35rem",
                            color: G.cream,
                            lineHeight: 1.2,
                          }}
                        >
                          {cat}
                        </div>
                      </div>

                      <div
                        style={{
                          minWidth: 40,
                          height: 40,
                          borderRadius: 999,
                          display: "grid",
                          placeItems: "center",
                          background: "rgba(255,255,255,0.08)",
                          color: G.cream,
                          fontSize: "1.2rem",
                          border: BORDER_SOFT,
                        }}
                      >
                        ›
                      </div>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

        ) : filtered.length === 0 ? (
          /* ── Empty state ── */
          <div
            style={{
              ...PANEL,
              padding: isMobile ? "24px 18px" : "32px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: isMobile ? "1.2rem" : "1.5rem",
                color: G.cream,
                marginBottom: 8,
              }}
            >
              No items found
            </div>
            <p
              style={{
                color: G.textDim,
                fontSize: isMobile ? "0.9rem" : "1rem",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Try selecting another category to explore more dishes.
            </p>
          </div>

        ) : (
          <>
            {/* ── Mobile: back button ── */}
            {isMobile && activeCat !== "All" && (
              <div style={{ marginBottom: 18 }}>
                <button
                  onClick={() => setActiveCat("All")}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 999,
                    border: BORDER_SOFT,
                    background: G.gradDark,
                    color: G.cream,
                    fontSize: "0.78rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  ← Back to categories
                </button>
              </div>
            )}

            {/* ── Menu item grid ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : isTablet
                    ? "repeat(2, minmax(0, 1fr))"
                    : "repeat(auto-fill, minmax(280px, 1fr))",
                gap: isMobile ? 16 : 20,
              }}
            >
              {filtered.map((item, i) => {
                const available = isItemAvailable(item);

                return (
                  <Reveal key={item.id} delay={i * 0.05}>
                    <div
                      style={{
                        ...PANEL,
                        overflow: "hidden",
                        transition:
                          "transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
                        position: "relative",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        opacity: available ? 1 : 0.88,
                      }}
                      onMouseEnter={divHoverIn}
                      onMouseLeave={divHoverOut}
                    >
                      <div
                        style={{
                          position: "relative",
                          paddingTop: isMobile ? "62%" : isTablet ? "66%" : "68%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={
                            item.img ||
                            "https://via.placeholder.com/600x400?text=No+Image"
                          }
                          alt={item.name}
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition:
                              "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                            filter: available
                              ? "none"
                              : "blur(3px) brightness(0.6)",
                          }}
                          onMouseEnter={imgHoverIn}
                          onMouseLeave={imgHoverOut}
                        />

                        <div
                          style={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            maxWidth: "calc(100% - 24px)",
                            ...TAG_STYLE,
                          }}
                        >
                          {item.tag}
                        </div>

                        {!available && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              pointerEvents: "none",
                            }}
                          >
                            <div
                              style={{
                                padding: "10px 16px",
                                borderRadius: 999,
                                background: "rgba(0,0,0,0.72)",
                                border: "1px solid rgba(255,255,255,0.16)",
                                color: "#fff",
                                fontWeight: 700,
                                letterSpacing: "0.12em",
                                fontSize: "0.76rem",
                                textTransform: "uppercase",
                                backdropFilter: "blur(4px)",
                              }}
                            >
                              Out of Stock
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          padding: isMobile ? "16px" : "22px",
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            fontSize: isMobile ? "0.64rem" : "0.7rem",
                            letterSpacing: isMobile ? "0.18em" : "0.25em",
                            textTransform: "uppercase",
                            color: G.goldLight,
                            marginBottom: 8,
                            lineHeight: 1.4,
                          }}
                        >
                          {item.category}
                        </div>

                        <div
                          style={{
                            fontFamily: "Playfair Display, serif",
                            fontSize: isMobile ? "1.05rem" : "1.3rem",
                            color: G.cream,
                            marginBottom: 10,
                            lineHeight: 1.3,
                            wordBreak: "break-word",
                          }}
                        >
                          {item.name}
                        </div>

                        <div
                          style={{
                            fontSize: isMobile ? "0.84rem" : "0.92rem",
                            color: G.textDim,
                            lineHeight: 1.7,
                            fontWeight: 300,
                            marginBottom: 18,
                            flex: 1,
                          }}
                        >
                          {item.desc}
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: isMobile ? "stretch" : "center",
                            justifyContent: "space-between",
                            flexDirection: isMobile ? "column" : "row",
                            gap: 12,
                            marginTop: "auto",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "Playfair Display, serif",
                              fontSize: isMobile ? "1.15rem" : "1.4rem",
                              color: G.goldLight,
                              whiteSpace: "nowrap",
                            }}
                          >
                            ₹{item.price}
                          </span>

                          <button
                            onClick={() => {
                              if (available) onAdd(item);
                            }}
                            disabled={!available}
                            onMouseEnter={btnHoverIn}
                            onMouseLeave={btnHoverOut}
                            style={{
                              ...BTN_PRIMARY,
                              width: isMobile ? "100%" : "auto",
                              fontSize: isMobile ? "0.74rem" : "0.78rem",
                              minHeight: 44,
                              background: !available
                                ? "linear-gradient(135deg, #3f3f46 0%, #27272a 100%)"
                                : addedId === item.id
                                  ? "linear-gradient(135deg, #b45309 0%, #92400e 100%)"
                                  : G.gradPrimary,
                              cursor: !available ? "not-allowed" : "pointer",
                              opacity: !available ? 0.7 : 1,
                              boxShadow: !available ? "none" : undefined,
                            }}
                          >
                            {!available
                              ? "Out of Stock"
                              : addedId === item.id
                                ? "✓ Added"
                                : "+ Add"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}