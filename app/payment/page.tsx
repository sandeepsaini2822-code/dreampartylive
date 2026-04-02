"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const params = useSearchParams();

  const upi = params.get("upi") || "";
  const amount = params.get("amount") || "0";

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${upi}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0e0c09",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <h2>Scan & Pay</h2>

      <img src={qrUrl} alt="QR Code" />

      <div style={{ fontSize: "1.2rem" }}>
        Amount: ₹{amount}
      </div>

      <p style={{ opacity: 0.7 }}>
        After payment, please send screenshot on WhatsApp
      </p>
    </div>
  );
}