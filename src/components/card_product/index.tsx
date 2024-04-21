'use client';

import { Brand, Media, Product, Variation } from '@/payload-types';
import Image from 'next/image';
import { useState } from 'react';
import VariantIcon from '../VariantIcon';
import Link from 'next/link';
import { cn, formatPrice } from '@/lib/utils';


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
    const image = variation.images[0].image as Media;

    const priceDefault = variation.standard_price ?? product.standard_price;
    const priceOffer = variation.offer?.offer_price ?? product.offer?.offer_price;

    return (
      <li className='group overflow-hidden bg-white shadow-lg rounded-md hover:shadow-xl transition-all w-60 max-lg:w-48 max-md:w-60 max-sm:w-48 max-[500px]:w-40'>

        <Link className='flex flex-col px-5 py-4 overflow-hidden max-lg:px-2 max-lg:py-3 max-md:px-5 max-md:py-4 max-sm:px-2 max-sm:py-3' href={`/product/${product.id}/`}>

          <div className="h-36 p-2 flex-center group-hover:scale-110 transition-all">
            <Image src={'/media/'+image.filename} alt='COVER' width={1000} height={1000} />
          </div>

          <h5 className="z-10 mt-px font-semibold text-lg truncate max-[500px]:text-base">{product.name}</h5>
          <span className="z-10 text-xs text-gray-400 font-semibold">{(product.details.brand as Brand).name}</span>

        </Link>

        <div className="flex-center justify-between px-5 pb-6 max-lg:px-2 max-lg:pb-3 max-md:px-5 max-md:pb-6 max-sm:px-2 max-sm:pb-3">
          <VariantIcon className='scale-95' variationIndex={variationIndex} setVariationIndex={setVariationIndex} variations={variations} />

          <div className='relative text-sm'>

            <span className={cn("", {
              'absolute bottom-full left-2/4 -translate-x-2/4 text-xs opacity-80 !line-through': priceOffer
            })}>
              { formatPrice(priceDefault) }
            </span>

            { priceOffer && <span>{ formatPrice(priceOffer) }</span> }

          </div>
        </div>
      </li>
    );
  };
};
