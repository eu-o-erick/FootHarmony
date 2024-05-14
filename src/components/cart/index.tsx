import { CartItem, useCart } from "@/hooks/use-cart";
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

  const { data, status } = trpc.products.useQuery({ ids: items.map(item => item.productId).join(',') });

  const [itemsCart, setItemsCart] = useState<ItemCart[]>([]);

  useEffect(() => {
    if(!data?.products || !data.products.length) return setItemsCart([]);

    console.log('data: ', data)

    const arr: ItemCart[] = [];

    data.products.forEach((product) => {

      const item = items.find(item => item.productId === product.id) as CartItem;

      const variations = product.variations as Variation[] | undefined;
      
      const variation = variations?.find(variation => variation.id === item.variationId);

      if(!variation) return undefined;

      arr.push({
        product,
        variation,
        size: item.size,
        quantity: item.quantity,
      })
    });

    setItemsCart(arr);
  
  }, [data]);


  return (
    <section className="flex items-start justify-between mt-10">
      <ItemsCart items={items} status={status} itemsCart={itemsCart} />

      <SummaryCart items={items} status={status} itemsCart={itemsCart} />
    </section>
  );
}
