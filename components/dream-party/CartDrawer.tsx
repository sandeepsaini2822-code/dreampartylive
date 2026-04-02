"use client"

import React, { useState } from "react"
import { CartDrawerProps } from "@/lib/dream-party-types"
import { BORDER_SOFT, BTN_PRIMARY, G } from "@/lib/dream-party-theme"
import { useViewport } from "@/lib/dream-party-hooks"

const SERVICEABLE_PINCODE = "332025"

type LocationState = {
  lat: number
  lng: number
  mapLink: string
  postcode: string
  displayAddress: string
} | null

export default function CartDrawer({
  open,
  cart,
  update,
  remove,
  total,
  count,
  clear,
  onCheckout,
  onClose,
}: CartDrawerProps): React.JSX.Element | null {
  const { isMobile } = useViewport()

  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [customerPincode, setCustomerPincode] = useState("")
  const [location, setLocation] = useState<LocationState>(null)
  const [locating, setLocating] = useState(false)

  if (!open) return null

  const getPincodeFromCoordinates = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error("Could not verify your location. Please try again.")
    }

    const data = await response.json()

    const postcode = data?.address?.postcode?.toString()?.trim() || ""
    const displayAddress = data?.display_name?.toString()?.trim() || ""
    const normalizedPostcode = postcode.split("-")[0].trim()

    return {
      postcode: normalizedPostcode,
      displayAddress,
    }
  }

  const getCurrentLocation = async () => {
    try {
      setLocating(true)

      if (!navigator.geolocation) {
        alert("Geolocation is not supported in this browser.")
        return
      }

      const coords = await new Promise<{ lat: number; lng: number }>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          (error) => {
            let message = "Could not get your location."

            if (error.code === 1) {
              message = "Location permission denied. Please allow location access."
            } else if (error.code === 2) {
              message = "Location is unavailable right now. Please try again."
            } else if (error.code === 3) {
              message = "Location request timed out. Please try again."
            }

            reject(new Error(message))
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        )
      })

      const mapLink = `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
      const geo = await getPincodeFromCoordinates(coords.lat, coords.lng)

      setLocation({
        lat: coords.lat,
        lng: coords.lng,
        mapLink,
        postcode: geo.postcode,
        displayAddress: geo.displayAddress,
      })

      if (geo.postcode) {
        setCustomerPincode(geo.postcode)
      }

      if (geo.postcode === SERVICEABLE_PINCODE) {
        alert("Location verified successfully. Delivery is available in your area.")
      } else if (geo.postcode) {
        alert(
          `We currently accept orders only for pincode ${SERVICEABLE_PINCODE}. Your current location pincode is ${geo.postcode}.`
        )
      } else {
        alert("We could not detect a valid pincode from your current location. Please try again.")
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not get your location. Please allow location access and try again."

      alert(message)
    } finally {
      setLocating(false)
    }
  }

  const handleCheckoutClick = () => {
    if (!customerName.trim()) {
      alert("Please enter your name.")
      return
    }

    if (!customerPhone.trim()) {
      alert("Please enter your phone number.")
      return
    }

    if (!customerAddress.trim()) {
      alert("Please enter your delivery address.")
      return
    }

    if (!customerPincode.trim()) {
      alert("Please enter your pincode.")
      return
    }

    if (!location) {
      alert("Please verify your current location before continuing.")
      return
    }

    if (!location.postcode) {
      alert("We could not verify your location pincode. Please try again.")
      return
    }

    if (location.postcode !== SERVICEABLE_PINCODE) {
      alert(
        `Order is allowed only for pincode ${SERVICEABLE_PINCODE}. Your verified current location pincode is ${location.postcode}.`
      )
      return
    }

    if (customerPincode.trim() !== SERVICEABLE_PINCODE) {
      alert(`Entered pincode must be ${SERVICEABLE_PINCODE}.`)
      return
    }

    onCheckout({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim(),
      customerPincode: customerPincode.trim(),
      location: {
        lat: location.lat,
        lng: location.lng,
        mapLink: location.mapLink,
      },
    })
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex" }}>
      {!isMobile && (
        <div
          onClick={() => onClose()}
          style={{
            flex: 1,
            background: "rgba(14,12,9,0.7)",
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      <div
        style={{
          width: isMobile ? "100%" : 380,
          background: G.gradDark,
          display: "flex",
          flexDirection: "column",
          maxWidth: isMobile ? "100%" : "90vw",
          borderLeft: isMobile ? "none" : BORDER_SOFT,
          boxShadow: isMobile ? "none" : "-18px 0 40px rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            padding: isMobile ? "18px 16px" : "24px 28px",
            borderBottom: BORDER_SOFT,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: isMobile ? "1.1rem" : "1.3rem",
              color: G.cream,
            }}
          >
            Your Order ({count})
          </span>

          <button
            onClick={() => onClose()}
            style={{
              background: "none",
              border: "none",
              color: G.textDim,
              fontSize: "1.3rem",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "16px" : "20px 28px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: G.textDim }}>
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>🛒</div>
              <div>
                Your cart is empty.
                <br />
                Add some delicious items!
              </div>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: 14,
                    marginBottom: 20,
                    alignItems: "center",
                    padding: 12,
                    border: BORDER_SOFT,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <img
                    src={item.img || "https://via.placeholder.com/120?text=No+Image"}
                    alt={item.name}
                    style={{
                      width: isMobile ? 54 : 60,
                      height: isMobile ? 54 : 60,
                      objectFit: "cover",
                      borderRadius: 10,
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: isMobile ? "0.88rem" : "0.95rem",
                        color: G.cream,
                        marginBottom: 4,
                      }}
                    >
                      {item.name}
                    </div>
                    <div style={{ color: G.goldLight, fontSize: "0.9rem" }}>₹{item.price}</div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 6 : 10 }}>
                    <button
                      onClick={() => update(item.id, item.qty - 1)}
                      style={{
                        width: 28,
                        height: 28,
                        background: G.gradDark,
                        border: BORDER_SOFT,
                        color: G.goldLight,
                        cursor: "pointer",
                        borderRadius: 8,
                      }}
                    >
                      −
                    </button>

                    <span style={{ color: G.cream, minWidth: 16, textAlign: "center" }}>
                      {item.qty}
                    </span>

                    <button
                      onClick={() => update(item.id, item.qty + 1)}
                      style={{
                        width: 28,
                        height: 28,
                        background: G.gradDark,
                        border: BORDER_SOFT,
                        color: G.goldLight,
                        cursor: "pointer",
                        borderRadius: 8,
                      }}
                    >
                      +
                    </button>

                    <button
                      onClick={() => remove(item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: G.textDim,
                        cursor: "pointer",
                        marginLeft: 4,
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}

              <div
                style={{
                  marginTop: 10,
                  padding: 14,
                  border: BORDER_SOFT,
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                <div
                  style={{
                    color: G.cream,
                    fontFamily: "Playfair Display, serif",
                    fontSize: "1rem",
                    marginBottom: 12,
                  }}
                >
                  Delivery Details
                </div>

                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={inputStyle}
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={inputStyle}
                />

                <textarea
                  placeholder="Delivery Address"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  rows={3}
                  style={{ ...inputStyle, resize: "none" }}
                />

                <input
                  type="text"
                  placeholder="Pincode"
                  value={customerPincode}
                  onChange={(e) =>
                    setCustomerPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  style={inputStyle}
                />

                <div
                  style={{
                    color: G.textDim,
                    fontSize: "0.82rem",
                    marginBottom: 10,
                    lineHeight: 1.5,
                  }}
                >
                  We currently accept orders only in{" "}
                  <span style={{ color: G.goldLight }}>{SERVICEABLE_PINCODE}</span>.
                  <br />
                  Please verify using your current location.
                </div>

                <button
                  onClick={getCurrentLocation}
                  type="button"
                  style={{
                    ...BTN_PRIMARY,
                    width: "100%",
                    marginBottom: 10,
                    opacity: locating ? 0.7 : 1,
                  }}
                  disabled={locating}
                >
                  {locating ? "Verifying Location..." : "Use Current Location"}
                </button>

                {location && (
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: G.textDim,
                      lineHeight: 1.5,
                      wordBreak: "break-word",
                    }}
                  >
                    Verified location captured
                    <br />
                    Pincode: <span style={{ color: G.goldLight }}>{location.postcode || "Not found"}</span>
                    <br />
                    Lat: {location.lat}
                    <br />
                    Lng: {location.lng}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: isMobile ? "16px" : "20px 28px", borderTop: BORDER_SOFT }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                color: G.textDim,
                fontSize: "0.9rem",
              }}
            >
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
                color: G.textDim,
                fontSize: "0.9rem",
              }}
            >
              <span>Delivery</span>
              <span style={{ color: G.goldLight }}>FREE</span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
                color: G.cream,
                fontFamily: "Playfair Display, serif",
                fontSize: "1.1rem",
                paddingTop: 10,
                borderTop: BORDER_SOFT,
              }}
            >
              <span>Total</span>
              <span style={{ color: G.goldLight }}>₹{total}</span>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 12,
              }}
            >
              <button
                onClick={clear}
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: BORDER_SOFT,
                  background: "rgba(255,255,255,0.04)",
                  color: G.textDim,
                  cursor: "pointer",
                }}
              >
                Clear Cart
              </button>

              <button onClick={handleCheckoutClick} style={{ ...BTN_PRIMARY, flex: 1 }}>
                Continue →
              </button>
            </div>

            <div
              style={{
                color: G.textDim,
                fontSize: "0.82rem",
                lineHeight: 1.5,
              }}
            >
              Review your order on the next screen before sending it on WhatsApp.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 10,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  outline: "none",
  fontSize: "0.92rem",
}