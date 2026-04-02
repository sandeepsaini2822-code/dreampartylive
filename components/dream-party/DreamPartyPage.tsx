"use client"

import { useEffect, useMemo, useState } from "react"
import { useCart } from "@/lib/dream-party-hooks"
import Navbar from "./Navbar"
import HeroSection from "./HeroSection"
import ServicesStrip from "./ServicesStrip"
import MenuSection from "./MenuSection"
import GallerySection from "./GallerySection"
import ContactSection from "./ContactSection"
import Footer from "./Footer"
import CartDrawer from "./CartDrawer"
import PaymentModal from "./PaymentModal"
import FounderSection from "./FounderSection";
type MenuItem = {
  id: number
  category: string
  tag: string
  name: string
  desc: string
  price: number
  img: string
}

export default function DreamPartyPage() {
  const { cart, add, remove, update, total, count, clear } = useCart()

  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [cartOpen, setCartOpen] = useState(false)
  const [payOpen, setPayOpen] = useState(false)
  const [addedId, setAddedId] = useState<number | null>(null)
  const [activeCat, setActiveCat] = useState("All")

  useEffect(() => {
    async function loadMenu() {
      try {
        setLoading(true)
        setError("")

        const res = await fetch("/api/menu", { cache: "no-store" })
        if (!res.ok) {
          throw new Error("Failed to fetch menu")
        }

        const data: MenuItem[] = await res.json()
        setMenuItems(data)
      } catch (err) {
        console.error("Menu load error:", err)
        setError("Failed to load menu items")
      } finally {
        setLoading(false)
      }
    }

    loadMenu()
  }, [])

  const categories = useMemo(() => {
    const unique = Array.from(new Set(menuItems.map((item) => item.category)))
    return ["All", ...unique]
  }, [menuItems])

  const filtered = useMemo(() => {
    if (activeCat === "All") return menuItems
    return menuItems.filter((item) => item.category === activeCat)
  }, [menuItems, activeCat])

  return (
    <>
      <Navbar
        count={count}
        onCartOpen={() => setCartOpen(true)}
      />

      <HeroSection />
      <ServicesStrip />
      <FounderSection />
      {loading ? (
        <div className="px-6 py-10 text-center">Loading menu...</div>
      ) : error ? (
        <div className="px-6 py-10 text-center text-red-600">{error}</div>
      ) : (
        <MenuSection
          categories={categories}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          filtered={filtered}
          addedId={addedId}
          onAdd={(item) => {
            add(item)
            setAddedId(item.id)
            setTimeout(() => setAddedId(null), 1000)
          }}
        />
      )}

      <GallerySection />
      <ContactSection />
      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        total={total}
        count={count}
        remove={remove}
        update={update}
        clear={clear}
        onCheckout={() => {
          setCartOpen(false)
          setPayOpen(true)
        }}
      />

      <PaymentModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        cart={cart}
        total={total}
        clearCart={clear}
      />
    </>
  )
}