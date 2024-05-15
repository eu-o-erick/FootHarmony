import Link from "next/link";
import Image from "next/legacy/image";
import { Media } from "@/payload-types";
import {TableCell, TableRow } from "@/components/ui/table";
import { ItemCart } from "..";
import { useEffect, useState } from "react";
import Quantity from "@/components/product/content/Quantity";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";


interface Props{
  item: ItemCart;
};


export default function ItemCartComponent({item}: Props) {
  const { product, variation, size } = item;

  const { updateQuantity } = useCart();

  const [quantity, setQuantity] = useState(item.quantity);


  useEffect(() => {
    updateQuantity(product.id, variation.id, quantity)
  
  }, [quantity]);



  const priceDefault = variation?.standard_price ?? product.standard_price;
  const priceOffer = variation?.offer?.offer_price ?? product.offer?.offer_price;
  const available = !variation?.stock.find( (stock) => stock.amount > 0 );


  return (
    <TableRow className="hover:bg-white">


      <TableCell className="flex gap-2 px-0">
      
        <Link href={`/product/${product.id}?variation=${variation.id}`} className="relative w-24 aspect-[4/3] group bg-white overflow-hidden">
          <Image src={'/media/'+(variation.images[0].image as Media).filename} alt="COVER" objectFit="contain" layout="fill" className="group-hover:scale-105 transition-all" />
        </Link>

        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1 truncate w-44">{product.name}feaf aef aef aeffae</h4>
          
          <div className="text-xs mr-1">
            <span className="text-gray-400">SIZE:</span>
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

      
      <TableCell className="px-0">
        <Quantity quantity={quantity} setQuantity={setQuantity} outOfStock={available} size="sm" />
      </TableCell>
      
      
      <TableCell>
        <div className="flex flex-col items-end">
          <span className={priceOffer ? "text-gray-500 line-through" : ""}>
            { formatPrice(priceDefault) }
          </span>

          { priceOffer && 
            <span className="">
              { formatPrice( priceOffer) }
            </span>
          }
        </div>
      </TableCell>
      
      
      <TableCell>
        <div className="flex flex-col items-end">
          <span className={priceOffer ? "text-gray-500 line-through" : ""}>
            { formatPrice(priceDefault * quantity) }
          </span>

          { priceOffer && 
            <span className="">
              { formatPrice(priceDefault * quantity) }
            </span>
          }
        </div>


      </TableCell>

    </TableRow>
  );
};
