import Link from "next/link";
import Image from "next/legacy/image";
import { Media } from "@/payload-types";
import {TableCell, TableRow } from "@/components/ui/table";
import { ItemCart } from "..";
import { useEffect, useState } from "react";
import Quantity from "@/components/product/content/Quantity";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice, getPriceOffer } from "@/lib/utils";


interface Props{
  item: ItemCart;
  isBuyMethod: boolean;
  itemsCart: ItemCart[];
  setItemsCart: React.Dispatch<React.SetStateAction<ItemCart[]>>; 
};


export default function ItemCartComponent({item, isBuyMethod, itemsCart, setItemsCart}: Props) {
  const { product, variation, size } = item;

  const priceDefault = variation.standard_price ?? product.standard_price;
  const priceOffer = getPriceOffer(variation, product);

  const invalid = !variation.stock.find( (stock) => stock.size === size && stock.amount > 0 );

  const { updateQuantity, removeItem } = useCart();

  const [quantity, setQuantity] = useState(invalid ? 0 : item.quantity );
  const [amount, setAmount] = useState(0);


  useEffect(() => {

    const stock = variation.stock.find((value) => value.size === size )?.amount;

    setAmount(stock ?? 0)

  }, [item]);


  useEffect(() => {

    if(isBuyMethod) {
      const items = itemsCart.map((itemCart) => {
        if(itemCart !== item) return itemCart;

        return {
          ...itemCart,
          quantity
        };

      });

      setItemsCart(items);

    } else {
      updateQuantity(product.id, variation.id, quantity)

    }
  
  }, [quantity]);


  function remove() {
    if(isBuyMethod) {
      setItemsCart([]);

    } else {
      removeItem(product.id, variation.id, size);
    
    };

  };


  const href = `/product/${product.id}?variation=${variation.id}`



  return (
    <TableRow className={cn("hover:bg-white", {
      'opacity-70': invalid
    })}>


      <TableCell className="flex gap-2 px-0">
      
        <Link href={href} className="relative w-24 aspect-[4/3] group bg-white overflow-hidden">
          { invalid && <span className="z-10 absolute-center px-2 py-1 text-[10px] bg-gray-950 text-gray-200 whitespace-nowrap">OUT OF STOCK</span>  }

          <Image src={'/media/'+(variation.images[0].image as Media).filename} alt="COVER" objectFit="contain" layout="fill" className="group-hover:scale-105 transition-all" />
        </Link>

        <div className="flex flex-col gap-1" style={{maxWidth: 'calc(100% - 1px)'}}>
          <Link href={href} className="text-sm font-semibold text-gray-600 uppercase mb-1 truncate max-w-60">
            {product.name}
          </Link>
          
          <div className="text-xs">
            <span className="text-gray-400 mr-1">SIZE:</span>
            <span className="text-gray-600 font-semibold"> {size}</span>
          </div>

          <div className="text-xs">
            <span className="text-gray-400 mr-1">COLOR:</span>
            <span className="text-gray-600 font-semibold">
              {variation.primary_color}
              { variation.secondary_color && ' / '+variation.secondary_color }
            </span>
          </div>
        </div>

      </TableCell>

      
      <TableCell className="px-0 bg-read-500">
        <div className="flex-center flex-col gap-2">
          <Quantity quantity={quantity} setQuantity={setQuantity} outOfStock={invalid} amount={amount} size="sm" />

          <button className="text-gray-500 hover:underline text-xs" onClick={remove}>
            remove
          </button>
        </div>
      </TableCell>
      
      
      <TableCell className=" bg-purpale-500">
        <div className="flex-center flex-col text-gray-700">
          <span className={priceOffer ? "!text-gray-500 line-through" : "font-semibold"}>
            { formatPrice(priceDefault) }
          </span>

          { priceOffer && 
            <span className="font-semibold">
              { formatPrice( priceOffer) }
            </span>
          }
        </div>
      </TableCell>
      
      
      <TableCell className="bg-yellaow-500">
        <div className="flex items-end flex-col text-gray-700">
          <span className={priceOffer ? "!text-gray-500 line-through" : "font-semibold"}>
            { formatPrice(priceDefault * quantity) }
          </span>

          { priceOffer && 
            <span className="font-semibold">
              { formatPrice(priceOffer * quantity) }
            </span>
          }
        </div>
      </TableCell>

    </TableRow>
  );
};
