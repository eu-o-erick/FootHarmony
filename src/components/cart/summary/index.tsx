import { useState } from "react";
import PromoCode from "./PromoCode";
import { CartItem } from "@/hooks/use-cart";
import Checkout from "./Checkout";
import Values from "./Values";
import { ItemCart } from "..";

interface Props{
  items: CartItem[];
  status: "error" | "success" | "loading";
  itemsCart: ItemCart[];
};

export default function SummaryCart({ items, status, itemsCart }: Props) {

  const [total, setTotal] = useState(0);

  return (
    <div className='w-[34%] flex flex-col bg-white shadow-md border border-gray-400'>

      <h2 className="p-4 mb-4 text-lg font-semibold bg-gray-950 text-gray-200">SUMMARY</h2>

      <Values />

      <PromoCode />

      <Checkout />
    </div>
  );
};
