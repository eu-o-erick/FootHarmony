import { useCart } from "@/hooks/use-cart";
import ItemsCart from "./items";
import SummaryCart from "./summary";
import { useEffect, useState } from "react";
import { Product, Variation } from "@/payload-types";
import { trpc } from "@/trpc/client";


export interface ItemCart {
  product: Product;
  variation: Variation;
  size: string;
  quantity: number;
};


export default function CartContent() {
  const { items } = useCart();

  const ids = items.map(item => item.productId).join(',');

  const { data, status } = trpc.products.useQuery({ ids });

  const [itemsCart, setItemsCart] = useState<ItemCart[]>([]);

  useEffect(() => {
    const products = data?.products;

    if(!products || !products.length) return setItemsCart([]);

    const arr: ItemCart[] = [];

    for( const item of items) {

      item.variations.forEach(({variationId, size, quantity}) => {

        const product = products.find(({id}) => id === item.productId);
        const variation = (product?.variations as Variation[] | undefined)?.find(({id}) => id === variationId);

        if(!product || !variation) return;

        arr.push({
          product,
          variation,
          size,
          quantity,
        });
      });

    };

    setItemsCart(arr);
  
  }, [data, items]);


  return (
    <section className="mt-10 flex items-start justify-between ">
      <ItemsCart status={status} itemsCart={itemsCart} />

      <SummaryCart items={items} status={status} itemsCart={itemsCart} />
    </section>
  );
}
