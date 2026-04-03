import { CSSProperties, ReactNode } from "react";

export type MenuItem = {
  id: number;
  category: string;
  tag: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  available?: string;
};

export type CartItem = MenuItem & {
  qty: number;
};

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}

export type PayStep = "details" | "payment" | "success";
export type PayMethod = "card" | "upi" | "cod";
export type OrderType = "delivery" | "dine-in";

export interface OrderForm {
  name: string;
  phone: string;
  address: string;
  type: OrderType;
}

export interface CardForm {
  num: string;
  exp: string;
  cvv: string;
  name: string;
}

export interface PaymentModalProps {
  open: boolean;
  cart: CartItem[];
  total: number;
  checkoutData: CheckoutData;
  onClose: () => void;
  onSuccess: () => void;
}

export type CheckoutData = {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerPincode: string;
  location: {
    lat: number;
    lng: number;
    mapLink: string;
  };
};

export type CartDrawerProps = {
  open: boolean;
  cart: CartItem[];
  update: (id: number, quantity: number) => void;
  remove: (id: number) => void;
  total: number;
  count: number;
  clear: () => void;
  onCheckout: (data: CheckoutData) => void;
  onClose: () => void;
};