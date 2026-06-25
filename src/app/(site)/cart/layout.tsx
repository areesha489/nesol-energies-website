import { CartProvider } from "@/components/CartProvider";

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
