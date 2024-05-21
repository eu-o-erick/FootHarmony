import { useCart } from "@/hooks/use-cart";
import ItemsCart from "./items";
import SummaryCart from "./summary";
import { useEffect, useState } from "react";
import { Product, Variation } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { useSearchParams } from "next/navigation";


export interface ItemCart {
  product: Product;
  variation: Variation;
  size: string;
  quantity: number;
};


export default function CartContent() {
  const { items } = useCart();

  const ids = items.map(item => item.productId).join(',');
  const query = useSearchParams().get('product');
  const json = JSON.parse(query ?? '{}');
  const [isBuyMethod, setIsBuyMethod] = useState( Object.keys(json).length > 0 );

  const { data, status } = trpc.products.useQuery({ ids: json?.product ? json.product : ids });

  const [itemsCart, setItemsCart] = useState<ItemCart[]>([]);



  useEffect(() => {
    const products = data?.products;

    if(!products?.length) {
      setItemsCart([]);

    } else if( isBuyMethod ) {

      const product = products[0];

      const variation = (product.variations as Variation[])?.find(({id}) => id === (json.variation ?? '') );

      if(!variation) return setItemsCart([]);


      setItemsCart([{
        product,
        variation,
        size: json.size,
        quantity: json.quantity,
      }]);


    } else {

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
    
    };

  }, [data, items, query]);



  return (
    <section className="mt-10 flex items-start justify-between ">
      <ItemsCart status={status} itemsCart={itemsCart} setItemsCart={setItemsCart} isBuyMethod={isBuyMethod} />

      <SummaryCart itemsCart={itemsCart} />
    </section>
  );
}
