import { CSSProperties } from "react";

export const G: Record<string, string> = {
  gold: "#d97706",
  goldLight: "#f59e0b",
  goldDim: "#92400e",

  dark: "#0f0c0a",
  dark2: "#1a1410",
  dark3: "#241a14",
  dark4: "#2f221a",

  cream: "#fdf3e7",
  creamDim: "#d6bfa7",

  text: "#f4e7da",
  textDim: "#bfa58a",

  gradPrimary: "linear-gradient(135deg, #f59e0b 0%, #ea580c 45%, #b45309 100%)",
  gradPrimarySoft:
    "linear-gradient(135deg, rgba(245,158,11,0.18) 0%, rgba(234,88,12,0.12) 50%, rgba(180,83,9,0.18) 100%)",
  gradDark: "linear-gradient(135deg, #2f221a 0%, #1a1410 55%, #0f0c0a 100%)",
  gradDarkSoft: "linear-gradient(180deg, rgba(47,34,26,0.96) 0%, rgba(26,20,16,0.96) 100%)",
  gradHeroOverlay: "linear-gradient(180deg, rgba(15,12,10,0.82) 0%, rgba(15,12,10,0.55) 35%, rgba(15,12,10,0.88) 100%)",
  shadowGlow: "0 10px 30px rgba(234, 88, 12, 0.28)",
  shadowGlowSoft: "0 6px 20px rgba(245, 158, 11, 0.18)",
};

export const INP: CSSProperties = {
  width: "100%",
  background: "linear-gradient(180deg, rgba(47,34,26,0.95) 0%, rgba(36,26,20,0.95) 100%)",
  border: "1px solid rgba(245,158,11,0.16)",
  color: G.text,
  padding: "12px 16px",
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "1rem",
  outline: "none",
  marginBottom: 14,
  borderRadius: 8,
  boxSizing: "border-box",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
};

export const LBL: CSSProperties = {
  fontSize: "0.72rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: G.goldLight,
  display: "block",
  marginBottom: 6,
};

export const BTN_PRIMARY: CSSProperties = {
  background: G.gradPrimary,
  color: G.dark,
  border: "none",
  padding: "16px 24px",
  fontFamily: "Marcellus, serif",
  fontSize: "0.82rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  cursor: "pointer",
  boxShadow: G.shadowGlow,
  transition: "all 0.25s ease",
  borderRadius: 10,
};

export const BTN_SECONDARY: CSSProperties = {
  background: "rgba(255,255,255,0.02)",
  color: G.goldLight,
  border: "1px solid rgba(245,158,11,0.28)",
  padding: "15px 24px",
  fontFamily: "Marcellus, serif",
  fontSize: "0.82rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  cursor: "pointer",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)",
  transition: "all 0.25s ease",
  borderRadius: 10,
};

export const PANEL: CSSProperties = {
  background: G.gradDark,
  border: "1px solid rgba(245,158,11,0.12)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.28)",
  borderRadius: 18,
};

export const PANEL_SOFT: CSSProperties = {
  background: G.gradDarkSoft,
  border: "1px solid rgba(245,158,11,0.12)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
  borderRadius: 18,
};

export const TAG_STYLE: CSSProperties = {
  background: G.gradPrimary,
  color: G.dark,
  padding: "4px 12px",
  fontSize: "0.68rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  fontFamily: "Marcellus, serif",
  boxShadow: G.shadowGlowSoft,
  borderRadius: 999,
};

export const BORDER_SOFT = "1px solid rgba(245,158,11,0.14)";
export const BORDER_MID = "1px solid rgba(245,158,11,0.22)";