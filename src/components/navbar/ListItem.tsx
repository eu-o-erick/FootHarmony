"use client"

import Image from "next/image"
import VariantIcon from "../VariantIcon"
import { formatPrice } from "@/lib/utils"
import { useState } from "react";


interface TShoes {
  name: string;
  brand: string;
  variations: {
    colors: string[];
    img: string;
    price: number;
    price_offer: number | null;
  }[];
}



export default function ListItem({shoe}: {shoe: TShoes}) {
  const { name, brand, variations } = shoe;

  const [variationIndex, setVariantIndex] = useState(0);

  return (
    <li className="grid grid-cols-[80px,190px,60px] gap-3 border-b-2">

      <div className="w-full relative">
        <Image src={variations[variationIndex].img} fill objectFit="contain" alt='image' />
      </div>

      <div className="flex flex-col justify-between py-2">
        <span className="text-xs opacity-60">{brand}</span>

        <h4 className="mb-2 truncate">{name}</h4>

        <ul className="flex gap-1">
          { variations.map((item, i) => {

            return(
              <VariantIcon key={i} i={i} colors={item.colors} variationIndex={variationIndex} setVariantIndex={setVariantIndex} />
            )
          })}
        </ul>

      </div>

      <div className="py-2 flex flex-col justify-end items-center">

        { variations[variationIndex].price_offer ?
          <>
            <span className="text-xs opacity-80 line-through">{formatPrice(variations[variationIndex].price)}</span>
            <span className="text-sm">{formatPrice(variations[variationIndex].price_offer as number)}</span>
          </>
          :
          <span className="text-sm">{formatPrice(variations[variationIndex].price)}</span>
        }

      </div>
    </li>
  )
}