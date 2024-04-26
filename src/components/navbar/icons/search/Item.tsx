"use client";

import Image from "next/image"
import VariantIcon from "../../../VariantIcon"
import { cn, formatPrice } from "@/lib/utils"
import { useState } from "react";
import { Brand, Media, Product, Variation } from "@/payload-types";
import Link from "next/link";




export default function Item({product}: {product: Product}) {
  const [variationIndex, setVariationIndex] = useState(0);

  const brand = product.details.brand as Brand;
  const variations = product.variations as Variation[];
  const variation = variations[variationIndex];
  const { filename } = variation.images[0].image as Media;

  const priceDefault = variation.standard_price ?? product.standard_price;
  const priceOffer = variation.offer?.offer_price ?? product.offer?.offer_price;

  return (
    <li className="flex-center border-b mx-4 group">

      <Link href={`/product/${product.id}?variation=${variation.id}`} className="h-24 w-24 flex-center group-hover:scale-105 transition-all">
        <Image src={'/media/'+filename} width={1000} height={1000} alt='COVER' />
      </Link>

      <div className="flex flex-col justify-between w-full pl-5 pr-2">

        <Link href={`/products?brand=${encodeURIComponent(brand.name)}`} className="text-xs font-semibold text-gray-500">
          {brand.name}
        </Link>

        <Link href={`/product/${product.id}?variation=${variation.id}`} className="text-lg font-semibold mb-2 truncate uppercase">
          {product.name}
        </Link>
        
        <div className="flex items-center justify-between">

          <VariantIcon variations={variations} variationIndex={variationIndex} setVariationIndex={setVariationIndex} limit={6} />

          <div className="flex-center gap-1 font-semibold">

            <span className={cn("", { 'text-sm opacity-60 !line-through': priceOffer })}>
              { formatPrice(priceDefault) }
            </span>

            { priceOffer && <span>{ formatPrice(priceOffer) }</span> }
          </div>
        </div>
      </div>
    </li>
  );
};
