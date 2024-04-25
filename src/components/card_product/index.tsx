'use client';

import { Brand, Media, Product, Variation } from '@/payload-types';
import { useState } from 'react';
import VariantIcon from '../VariantIcon';
import Link from 'next/link';
import { cn, formatPrice } from '@/lib/utils';
import Image from 'next/image';


interface Props{
  product: Product;
};


export default function CardProduct({product}: Props) {
  const variations = product.variations as Variation[] | undefined;

  const [variationIndex, setVariationIndex] = useState(0);


  if(!variations?.length){
    return <></>
  
  } else {
    const variation = variations[variationIndex];
    const { filename } = variation.images[0].image as Media;

    const priceDefault = variation.standard_price ?? product.standard_price;
    const priceOffer = variation.offer?.offer_price ?? product.offer?.offer_price;

    return (
      <li className='group overflow-hidden bg-gray-50 border border-gray-200 shadow-md hover:shadow-lg transition-all w-56'>

        <Link className='flex flex-col' href={`/product/${product.id}/`}>

          <div className="relative h-44 bg-white overflow-hidden ">
            <Image src={'/media/'+filename} alt='COVER' objectFit='contain' fill className='p-4 group-hover:p-3 transition-all' />
          </div>

          <span className="z-10 mt-3 px-3 text-xs text-[10px] text-gray-500 font-semibold uppercase">{(product.details.brand as Brand).name}</span>
          <h5 className="z-10 mb-2 px-3 font-semibold truncate uppercase">{product.name}</h5>

        </Link>

        <div className="flex justify-between mt-2">
          <VariantIcon className='px-3 bg-gray-300 w-2/4' limit={4} variationIndex={variationIndex} setVariationIndex={setVariationIndex} variations={variations} />

          <div className={cn('relative px-4 py-2 w-2/4 flex justify-between items-center gap-1 text-sm font-semibold bg-gray-950 text-gray-200', { 'px-1.5': priceOffer })}>

            <span className={cn("", { 'text-xs opacity-60 !line-through': priceOffer })}>
              { formatPrice(priceDefault) }
            </span>

            { priceOffer && <span>{ formatPrice(priceOffer) }</span> }

          </div>
        </div>

      </li>
    );
  };
};




