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
      <li className='group overflow-hidden drop-shadow-md bg-white shadow-md rounded-lg hover:shadow-xl transition-all w-48 mx-auto my-8'>
        
        <Link className='flex flex-col px-2 pb-5 overflow-hidden' href={`/product/${product.id}/`}>

          <div className="h-36 p-2 flex-center group-hover:scale-110 transition-all">
            <Image src={'/media/'+image.filename} alt='COVER' width={1000} height={1000} />
          </div>

          <span className="z-10 text-xs text-gray-400 font-semibold px-2">{(product.details.brand as Brand).name}</span>
        
          <h5 className="mt-px truncate px-2">{product.name}</h5>

        </Link>

        <div className="flex-center justify-between px-4 pb-4">
          <VariantIcon className='scale-95' variationIndex={variationIndex} setVariationIndex={setVariationIndex} variations={variations} />

          <div className='relative text-sm'>

            <span className={cn("", {
              'absolute bottom-full left-2/4 -translate-x-2/4  text-xs opacity-80 !line-through': priceOffer
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
