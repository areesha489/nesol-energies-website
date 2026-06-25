import type { Metadata } from "next";
import Cart from "@/components/Cart";

export const metadata: Metadata = {
  title: "Shopping Cart | Nesol Energies",
  description: "Review your selected solar products and place your order with Nesol Energies.",
};

export default function CartPage() {
  return <Cart />;
}
