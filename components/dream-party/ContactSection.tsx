"use client";

import { useState, MouseEvent as RMouseEvent, ChangeEvent } from "react";
import { BORDER_MID, BTN_PRIMARY, G, PANEL_SOFT } from "@/lib/dream-party-theme";
import { useViewport } from "@/lib/dream-party-hooks";
import Reveal from "./Reveal";

const WHATSAPP_NUMBER = "919057615719";

const TIME_OPTIONS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

type ReservationForm = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  specialRequest: string;
};

export default function ContactSection() {
  const { isMobile, isTablet } = useViewport();

  const pagePad = isMobile ? 14 : isTablet ? 24 : 48;
  const sectionPadY = isMobile ? 52 : isTablet ? 76 : 100;

  const [form, setForm] = useState<ReservationForm>({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequest: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const btnHoverIn = (e: RMouseEvent<HTMLButtonElement>) => {
    if (isMobile) return;
    e.currentTarget.style.background =
      "linear-gradient(135deg, #fb923c 0%, #ea580c 55%, #c2410c 100%)";
    e.currentTarget.style.boxShadow = "0 12px 34px rgba(234,88,12,0.35)";
    e.currentTarget.style.transform = "translateY(-1px)";
  };

  const btnHoverOut = (e: RMouseEvent<HTMLButtonElement>) => {
    if (isMobile) return;
    e.currentTarget.style.background = G.gradPrimary;
    e.currentTarget.style.boxShadow = G.shadowGlow;
    e.currentTarget.style.transform = "translateY(0)";
  };

  const handleChange =
    (field: keyof ReservationForm) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      };

  const resetForm = () => {
    setForm({
      name: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      specialRequest: "",
    });
  };

  const handleReservation = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.date || !form.time || !form.guests.trim()) {
      alert("Please fill Name, Phone Number, Date, Time, and Number of Guests.");
      return;
    }

    setIsSending(true);

    const message = [
      "🍽 *New Table Reservation Request*",
      "",
      `👤 *Name:* ${form.name}`,
      `📞 *Phone:* ${form.phone}`,
      `📅 *Date:* ${form.date}`,
      `🕒 *Time:* ${form.time}`,
      `👥 *Guests:* ${form.guests}`,
      `📝 *Special Request:* ${form.specialRequest.trim() || "None"}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    setIsSending(false);
    setIsSent(true);
    resetForm();

    setTimeout(() => {
      setIsSent(false);
    }, 2500);
  };

  const inputStyle = {
    width: "100%",
    background: "linear-gradient(180deg, rgba(47,34,26,0.95) 0%, rgba(36,26,20,0.95) 100%)",
    border: "1px solid rgba(245,158,11,0.16)",
    color: G.text,
    padding: isMobile ? "14px 14px" : "14px 18px",
    fontFamily: "Cormorant Garamond, serif",
    fontSize: isMobile ? "1rem" : "1.02rem",
    outline: "none",
    boxSizing: "border-box" as const,
    borderRadius: 12,
    minHeight: 48,
  };

  const contactItems: [string, string, string, string?][] = [
    ["📍", "Location", "Near Govt. Hospital, Losal, 332025"],
    ["📞", "Call / Order", "+91 9057615719"],
    ["🕐", "Hours", "Mon – Sun: 10:00 AM – 10:00 PM"],
    ["📧", "Email", "akashsaini331@gmail.com"],
    ["📸", "Follow Us On Instagram", "@dreampartylosal", "https://www.instagram.com/dream_party_cake_losal/"],
  ];

  return (
    <section
      id="contact"
      style={{
        padding: `${sectionPadY}px ${pagePad}px`,
        background: G.dark,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "minmax(0, 0.95fr) minmax(0, 1.05fr)",
          gap: isMobile ? 30 : isTablet ? 40 : 72,
          alignItems: "start",
        }}
      >
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
              Find Us
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: isMobile
                  ? "1.85rem"
                  : isTablet
                    ? "2.45rem"
                    : "clamp(2.4rem,4vw,3.5rem)",
                color: G.cream,
                lineHeight: 1.12,
                margin: 0,
              }}
            >
              Come &amp; <em style={{ color: G.goldLight, fontStyle: "italic" }}>Celebrate</em>
              <br />
              with Us
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              style={{
                marginTop: 18,
                color: G.textDim,
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: 460,
                fontSize: isMobile ? "0.95rem" : "1rem",
              }}
            >
              Whether you dine in or we bring the party to your door — Dream Party is always ready.
            </p>
          </Reveal>

          <div
            style={{
              marginTop: isMobile ? 20 : 32,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr",
              gap: isMobile ? 10 : 14,
            }}
          >
            {contactItems.map(([icon, title, val, link], i) => (
              <Reveal key={title} delay={0.2 + i * 0.08}>
                <div
                  style={{
                    display: "flex",
                    gap: isMobile ? 10 : 14,
                    alignItems: "flex-start",
                    padding: isMobile ? "10px" : "12px 0",
                    borderRadius: isMobile ? 14 : 0,
                    background: isMobile ? "rgba(255,255,255,0.02)" : "transparent",
                  }}
                >
                  <div
                    style={{
                      width: isMobile ? 42 : 44,
                      height: isMobile ? 42 : 44,
                      border: BORDER_MID,
                      background: G.gradPrimarySoft,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: G.goldLight,
                      boxShadow: G.shadowGlowSoft,
                      borderRadius: 12,
                      fontSize: isMobile ? "1rem" : "1.05rem",
                    }}
                  >
                    {icon}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: isMobile ? "0.66rem" : "0.72rem",
                        letterSpacing: isMobile ? "0.14em" : "0.2em",
                        textTransform: "uppercase",
                        color: G.goldLight,
                        marginBottom: 4,
                        lineHeight: 1.4,
                      }}
                    >
                      {title}
                    </div>

                    <div
                      style={{
                        color: G.creamDim,
                        lineHeight: 1.7,
                        whiteSpace: "pre-line",
                        fontWeight: 300,
                        fontSize: isMobile ? "0.95rem" : "1rem",
                        wordBreak: "break-word",
                      }}
                    >
                      {link ? (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: G.creamDim,
                            textDecoration: "none",
                          }}
                        >
                          {val}
                        </a>
                      ) : (
                        val
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div
            style={{
              ...PANEL_SOFT,
              padding: isMobile ? "20px 14px" : isTablet ? "28px 24px" : "42px 38px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: isMobile ? "1.25rem" : "1.6rem",
                color: G.cream,
                marginBottom: isMobile ? 22 : 28,
                lineHeight: 1.2,
              }}
            >
              Reserve a Table
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange("name")}
                style={inputStyle}
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange("phone")}
                style={inputStyle}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: 14,
                }}
              >
                <input
                  type="date"
                  value={form.date}
                  onChange={handleChange("date")}
                  style={inputStyle}
                />

                <select
                  value={form.time}
                  onChange={handleChange("time")}
                  style={inputStyle}
                >
                  <option value="" disabled>
                    Select Time
                  </option>
                  {TIME_OPTIONS.map((time) => (
                    <option key={time} value={time} style={{ color: "#111" }}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="number"
                placeholder="No. of Guests"
                value={form.guests}
                onChange={handleChange("guests")}
                min="1"
                style={inputStyle}
              />

              <textarea
                placeholder="Special requests?"
                value={form.specialRequest}
                onChange={handleChange("specialRequest")}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: isMobile ? 110 : 120,
                  paddingTop: 14,
                }}
              />

              <button
                type="button"
                style={{
                  ...BTN_PRIMARY,
                  width: "100%",
                  minHeight: 48,
                  fontSize: isMobile ? "0.76rem" : "0.82rem",
                  opacity: isSending ? 0.85 : 1,
                  cursor: isSending ? "not-allowed" : "pointer",
                  marginTop: 4,
                }}
                onMouseEnter={btnHoverIn}
                onMouseLeave={btnHoverOut}
                onClick={handleReservation}
                disabled={isSending}
              >
                {isSending
                  ? "Sending..."
                  : isSent
                    ? "✓ Request Sent!"
                    : "Confirm Reservation"}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}