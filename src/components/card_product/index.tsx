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
      <li className='group overflow-hidden bg-gray-50 border shadow-md hover:shadow-lg transition-all w-56'>

        <Link className='flex flex-col' href={`/product/${product.id}/`}>

          <div className="relative h-44 bg-white overflow-hidden">
            <Image src={'/media/'+filename} alt='COVER' objectFit='contain' fill className='p-4 group-hover:p-3 transition-all' />
          </div>

          <span className="z-10 mt-3 px-3 text-xs text-[10px] text-gray-500 font-semibold uppercase">{(product.details.brand as Brand).name}</span>
          <h5 className="z-10 mb-2 px-3 font-semibold truncate uppercase">{product.name} products extends name</h5>

        </Link>

        <div className="flex justify-between pt-3">
          <VariantIcon className='px-3 bg-gray-50 w-2/4' variationIndex={variationIndex} setVariationIndex={setVariationIndex} variations={variations} />

          <div className='relative px-3 py-2 w-2/4 flex justify-end text-sm font-semibold bg-gray-950 text-gray-200'>

            <span className={cn("", {
              'absolute top-2/4 left-2 -translate-y-2/4 text-xs opacity-80 !line-through': priceDefault
            })}>
              { formatPrice(priceDefault) }
            </span>

            { priceDefault && <span>{ formatPrice(priceDefault) }</span> }

          </div>
        </div>

        {/* <div className="flex-center justify-between px-5 pb-5 pt-3 bg-gray-950">
          <VariantIcon className='bg-' variationIndex={variationIndex} setVariationIndex={setVariationIndex} variations={variations} />

          <div className='relative text-sm font-semibold text-gray-600'>

            <span className={cn("", {
              'absolute bottom-full left-2/4 -translate-x-2/4 text-xs opacity-80 !line-through': priceOffer
            })}>
              { formatPrice(priceDefault) }
            </span>

            { priceOffer && <span>{ formatPrice(priceOffer) }</span> }

          </div>
        </div> */}

      </li>
    );
  };
};




