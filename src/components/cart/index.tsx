import { useCart } from "@/hooks/use-cart";
import ItemsCart from "./items";
import SummaryCart from "./summary";
import { useEffect, useState } from "react";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";



export default function CartContent() {
  const { items } = useCart();

  const { data, status } = trpc.products.useQuery({ids: items.map(item => item.productId).join(',')});

  console.log('status: ', status)


  return (
    <section className="flex items-start justify-between mt-10">
      <ItemsCart />

      <SummaryCart items={items} status={status} products={data?.products} />
    </section>
  );
}
