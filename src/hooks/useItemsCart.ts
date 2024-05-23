import { ItemCart } from "@/components/cart";
import { Product, Variation } from "@/payload-types";
import { useEffect, useState } from "react";
import { useCart } from "./useCart";

interface Props {
  json: any;
  products: Product[] | undefined;
};



const useItemsCart = ({json, products}: Props) => {
  const { items } = useCart();
  
  const isBuyMethod = Object.keys(json).length > 0;

  const [itemsCart, setItemsCart] = useState<ItemCart[]>([]);


  useEffect(() => {

    if(!products?.length) {
      setItemsCart([]);
      return;

    };


    if( isBuyMethod ) {

      const product = products[0];

      const variation = (product.variations as Variation[])?.find(({id}) => id === (json.variation ?? '') );

      if(!variation) {
        setItemsCart([]);
        return;
      };

      setItemsCart([{
        product,
        variation,
        size: json.size,
        quantity: json.quantity,
      }]);

      return;
    };
    

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
  

  }, [items, json, products]);


  return { itemsCart, setItemsCart, isBuyMethod };

};


export default useItemsCart;
