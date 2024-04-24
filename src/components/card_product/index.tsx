'use client';

import { Brand, Media, Product, Variation } from '@/payload-types';
import Image from 'next/image';
import { useState } from 'react';
import VariantIcon from '../VariantIcon';
import Link from 'next/link';
import { cn, formatPrice } from '@/lib/utils';


interface Props{
  product: Product;
  className?: string;
};


export default function CardProduct({product, className}: Props) {
  const variations = product.variations as Variation[] | undefined;

  const [variationIndex, setVariationIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);


  if(!variations?.length){
    return <></>
  
  } else {
    const variation = variations[variationIndex];
    const filename = (variation.images[imageIndex].image as Media).filename;

    const priceDefault = variation.standard_price ?? product.standard_price;
    const priceOffer = variation.offer?.offer_price ?? product.offer?.offer_price;

    return (
      <li className='group overflow-hidden bg-gray-50 border shadow-alg hover:shadow-xl transition-all w-56'>

        <Link className='flex flex-col overflow-hidden' href={`/product/${product.id}/`}>

          <div className="relative h-40 p-8 flex-center group-hover:p-7 transition-all bg-white">

            <div className="absolute top-0 left-0 w-full h-full flex z-50">
              { variation.images.map((image, i) => (
                <div key={i} className="w-full h-full" onMouseEnter={ () => setImageIndex(i) } />
              )) }

            </div>

            <Image src={'/media/'+filename} alt='COVER' className='drop-shadow-lg' width={1000} height={1000} />
          </div>

          <span className="z-10 mt-3 px-5 text-xs text-gray-400 font-semibold">{(product.details.brand as Brand).name}</span>
          <h5 className="z-10 mb-2 px-5 font-semibold text-lg truncate">{product.name}</h5>

        </Link>

        <div className="flex-center justify-between px-5 pb-6">
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





// <li className={'group overflow-hidden bg-white border shadow-lg hover:shadow-xl transition-all w-60 max-lg:w-48 max-md:w-60 max-sm:w-48 max-[500px]:w-[154px] ' + className ?? ''}>
//   <Link className='flex flex-col px-5 py-4 overflow-hidden max-lg:px-2 max-lg:py-3 max-md:px-5 max-md:py-4 max-sm:px-2 max-sm:py-3' href={`/product/${product.id}/`}>
//     <div className="h-36 p-2 flex-center group-hover:scale-110 transition-all max-[500px]:h-28 bg-gray-100">
//       <Image src={'/media/'+image.filename} alt='COVER' width={1000} height={1000} />
//     </div>
//     <h5 className="z-10 mt-px font-semibold text-lg truncate max-[500px]:text-base">{product.name}</h5>
//     <span className="z-10 text-xs text-gray-400 font-semibold">{(product.details.brand as Brand).name}</span>
//   </Link>
//   <div className="flex-center justify-between px-5 pb-6 max-lg:px-2 max-lg:pb-3 max-md:px-5 max-md:pb-6 max-sm:px-2 max-sm:pb-3">
//     <VariantIcon className='scale-95' variationIndex={variationIndex} setVariationIndex={setVariationIndex} variations={variations} />
//     <div className='relative text-sm'>
//       <span className={cn("", {
//         'absolute bottom-full left-2/4 -translate-x-2/4 text-xs opacity-80 !line-through': priceOffer
//       })}>
//         { formatPrice(priceDefault) }
//       </span>
//       { priceOffer && <span>{ formatPrice(priceOffer) }</span> }
//     </div>
//   </div>
// </li>