import { CartItem, useCart } from "@/hooks/use-cart";
import ItemsCart from "./items";
import SummaryCart from "./summary";
import { useEffect, useState } from "react";
import { Product, Variation } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { Separator } from "../ui/separator";


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
  
  }, [data]);


  return (
    <section className="mt-10">
      <div className="flex items-start justify-between ">
        <ItemsCart status={status} itemsCart={itemsCart} />

        <SummaryCart items={items} status={status} itemsCart={itemsCart} />
      </div>

      <Separator className="mt-40 mb-10" />

      <div className="py-8 px-10 bg-zinc-950 shadow-lg flex flex-col gap-2">
        <h5 className="text-gray-300 text-xl font-semibold ml-2 mb-2">RETURN TERMS</h5>

        <p className="text-gray-500">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo animi sequi quibusdam
          voluptatem fugiat ratione ipsam et consequuntur, aperiam qui minus voluptatum sunt id 
          amet eius veniam mollitia necessitatibus repellat.
        </p>

        <p className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, aliquid cupiditate.
          Tempora error nostrum libero blanditiis tenetur. Accusamus repellat molestias blanditiis
          praesentium id natus deleniti fuga, rerum molestiae soluta corrupti.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid laudantium accusamus saepe
          dolor vitae eaque veritatis sint quisquam voluptates! Voluptas at ut commodi aliquid quae
          placeat mollitia quidem excepturi nemo.
        </p>

      </div>

    </section>
  );
}
