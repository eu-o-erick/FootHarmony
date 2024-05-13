import { useCart } from "@/hooks/use-cart";
import ItemsCart from "./items";
import SummaryCart from "./summary";



export default function CartContent() {
  const { items } = useCart();


  return (
    <section className="flex items-start justify-between mt-10">
      <ItemsCart />

      <SummaryCart />
    </section>
  );
}
