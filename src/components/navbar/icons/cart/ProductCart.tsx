'use client';

import { useState } from "react";
import VariantIcon from "@/components/VariantIcon";
import { formatPrice } from "@/lib/utils";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SizeDropdown from "./Size";

import type { TShoesShoppingCart } from '..'; 

 
export default function ProductCart({item}: {item: TShoesShoppingCart}) {

  const [sizeIndex, setSizeIndex] = useState(item.information.sizeIndex);
  const [variationIndex, setVariationIndex] = useState(item.information.variationIndex);

  const variations = item.shoe.variations;


  return(
    <div className='w-full flex justify-between'>

      <div className="relative w-3/12 h-20 flex">
        <Image src={variations[variationIndex].img} fill objectFit="contain" alt="IMAGE" />
      </div>

      <div className="flex flex-col justify-between w-7/12">
        {/* <Link href={`/product/${'item.shoe.id'}/${'item.shoe.variations[variationIndex].id'}`}> */}
        <Link href={`/`}>
          <h3 className="font-semibold text-sm truncate">
            {item.shoe.name}
          </h3>
        </Link>

        <VariantIcon variations={variations} variationIndex={variationIndex} setVariationIndex={setVariationIndex} className='scale-95' />
      
        <SizeDropdown sizeIndex={sizeIndex} setSizeIndex={setSizeIndex} options={variations[variationIndex].stock} />

      </div>

      <div className="flex flex-col justify-between items-end gap-2 w-1/12 pr-1">
        {/*  REMOVE ITEM HANDLER  */}
        <button className="w-6 h-6 flex-center scale-90 opacity-80 hover:opacity-100 hover:scale-100 transition-all">
          <Trash className="w-5 h-5"/>
        </button>

        <div className="h-5 flex flex-col items-end justify-end scale-90 font-semibold">

          { variations[variationIndex].price_offer ?
            <>
              <span className="text-xs opacity-80 line-through select-none">{formatPrice(variations[variationIndex].price)}</span>
              <span className="text-sm">{formatPrice(variations[variationIndex].price_offer as number)}</span>
            </>
          :
            <span className="text-sm">{formatPrice(variations[variationIndex].price)}</span>
          }

        </div>
      </div>

    </div>
  )
}





{/*

const [many, setMany] = useState(0);

function handlerDecrease() {
  const n = many - 1;

  if(n <= 0) {
    // remove product

  } else {
    setMany(n);

  };
};

function handlerIncrease() {
  setMany( many + 1 );
};


<div className="flex gap-5 items-center">
  <div className="flex items-center">
    <button className="w-4 h-4 flex-center rounded-s-sm border border-gray-300" onClick={handlerDecrease}>
      <Minus />
    </button>
    <span className="w-5 h-4 text-center font-bold text-xs bg-gray-300">{many}</span>
    <button className="w-4 h-4 flex-center rounded-e-sm border border-gray-300" onClick={handlerIncrease}>
      <Plus />
    </button>
  </div>
</div>
 */}