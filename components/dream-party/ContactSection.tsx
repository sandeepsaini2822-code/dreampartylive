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
  const pagePad = isMobile ? 16 : isTablet ? 28 : 48;
  const sectionPadY = isMobile ? 64 : 100;

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
    e.currentTarget.style.background = "linear-gradient(135deg, #fb923c 0%, #ea580c 55%, #c2410c 100%)";
    e.currentTarget.style.boxShadow = "0 12px 34px rgba(234,88,12,0.35)";
    e.currentTarget.style.transform = "translateY(-1px)";
  };

  const btnHoverOut = (e: RMouseEvent<HTMLButtonElement>) => {
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
    padding: "13px 18px",
    fontFamily: "Cormorant Garamond, serif",
    outline: "none",
    boxSizing: "border-box" as const,
    borderRadius: 10,
  };

  return (
    <section
      id="contact"
      style={{
        padding: `${sectionPadY}px ${pagePad}px`,
        background: G.dark,
        display: "grid",
        gridTemplateColumns: isMobile || isTablet ? "1fr" : "1fr 1fr",
        gap: isMobile ? 40 : 80,
        alignItems: "start",
      }}
    >
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
            Find Us
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: isMobile ? "2rem" : "clamp(2.4rem,4vw,3.5rem)",
              color: G.cream,
              lineHeight: 1.1,
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
              marginTop: 20,
              color: G.textDim,
              lineHeight: 1.8,
              fontWeight: 300,
              maxWidth: 400,
            }}
          >
            Whether you dine in or we bring the party to your door — Dream Party is always ready.
          </p>
        </Reveal>

        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 24 }}>
          {([
            ["📍", "Location", "Near Govt. Hospital, Losal, 332025"],
            ["📞", "Call / Order", "+91 9057615719"],
            ["🕐", "Hours", "Mon – Sun: 10:00 AM – 10:00 PM"],
            ["📧", "Email", "akashsaini331@gmail.com"],
          ] as [string, string, string][]).map(([icon, title, val], i) => (
            <Reveal key={title} delay={0.2 + i * 0.08}>
              <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    border: BORDER_MID,
                    background: G.gradPrimarySoft,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: G.goldLight,
                    boxShadow: G.shadowGlowSoft,
                    borderRadius: 12,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: G.goldLight,
                      marginBottom: 4,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      color: G.creamDim,
                      lineHeight: 1.6,
                      whiteSpace: "pre-line",
                      fontWeight: 300,
                    }}
                  >
                    {val}
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
            padding: isMobile ? "24px 18px" : "48px 44px",
          }}
        >
          <div
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: isMobile ? "1.3rem" : "1.6rem",
              color: G.cream,
              marginBottom: 32,
            }}
          >
            Reserve a Table
          </div>

          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange("name")}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange("phone")}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <input
              type="date"
              value={form.date}
              onChange={handleChange("date")}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
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

          <div style={{ marginBottom: 16 }}>
            <input
              type="number"
              placeholder="No. of Guests"
              value={form.guests}
              onChange={handleChange("guests")}
              min="1"
              style={inputStyle}
            />
          </div>

          <textarea
            placeholder="Special requests?"
            value={form.specialRequest}
            onChange={handleChange("specialRequest")}
            style={{
              ...inputStyle,
              resize: "none",
              height: 100,
              marginBottom: 20,
            }}
          />

          <button
            type="button"
            style={{
              ...BTN_PRIMARY,
              width: "100%",
              fontSize: isMobile ? "0.72rem" : "0.82rem",
              opacity: isSending ? 0.85 : 1,
              cursor: isSending ? "not-allowed" : "pointer",
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
      </Reveal>
    </section>
  );
}