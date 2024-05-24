import ItemsCart from "./items";
import SummaryCart from "./summary";
import { Product, Variation } from "@/payload-types";
import { useSearchParams } from "next/navigation";
import useItemsCart from "@/hooks/useItemsCart";
import { trpc } from "@/trpc/client";
import { useCart } from "@/hooks/useCart";
import { useMemo } from "react";


export interface ItemCart {
  product: Product;
  variation: Variation;
  size: string;
  quantity: number;
};


export default function CartContent() {
  const { items } = useCart();

  const query = useSearchParams().get('product');
  const json = useMemo(() => JSON.parse(query ?? '{}'), [query]);


  const { data, status } = trpc.products.useQuery({
    ids: json?.product ?
      json.product
     :
      items.map(item => item.productId).join(',')
  });


  const { itemsCart, setItemsCart, isBuyMethod } = useItemsCart({json, products: data?.products});



  return (
    <section className="mt-10 flex items-start justify-between ">
      <ItemsCart status={status} itemsCart={itemsCart} setItemsCart={setItemsCart} isBuyMethod={isBuyMethod} />

      <SummaryCart itemsCart={itemsCart} isBuyMethod={isBuyMethod} />
    </section>
  );
}
