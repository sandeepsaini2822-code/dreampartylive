"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { CartItem, MenuItem } from "./dream-party-types";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const add = (item: MenuItem): void =>
    setCart((prev) => {
      const found = prev.find((x) => x.id === item.id);
      return found
        ? prev.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x))
        : [...prev, { ...item, qty: 1 }];
    });

  const remove = (id: number): void =>
    setCart((prev) => prev.filter((x) => x.id !== id));

  const update = (id: number, qty: number): void => {
    if (qty < 1) {
      remove(id);
      return;
    }
    setCart((prev) => prev.map((x) => (x.id === id ? { ...x, qty } : x)));
  };

  const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const count = cart.reduce((s, x) => s + x.qty, 0);
  const clear = () => setCart([]);

  return { cart, add, remove, update, total, count, clear };
}

export function useViewport() {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return {
    width,
    isMobile: width <= 768,
    isTablet: width > 768 && width <= 1024,
    isLaptop: width > 1024,
  };
}

export function useReveal(): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setVis(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, vis];
}