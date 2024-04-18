'use client';

import { Brand, Media, Product, Variation } from '@/payload-types';
import Image from 'next/image';
import { useState } from 'react';
import VariantIcon from '../VariantIcon';
import Link from 'next/link';


interface Props{
  product: Product;
};


export default function CardProduct({product}: Props) {
  const variations = product.variations as Variation[] | undefined;
  const { name: brandName } = product.details.brand as Brand;

  const [variationIndex, setVariationIndex] = useState(0);



  if(!variations?.length){
    return <></>
  
  } else {
    const variation = variations[variationIndex];
    const image = variation.images[0].image as Media;

    return (
      <li className='bg-white shadow-lg rounded-sm'>
        <Link className='flex flex-col p-3 group' href={'/'}>

          <div className="w-36 h-36 flex-center group-hover:scale-110 transition-all">
            <Image src={'/media/'+image.filename} alt='COVER' width={1000} height={1000} />
          </div>

          <span className="z-10 text-xs text-gray-400 font-semibold">{brandName}</span>
        
          <h5 className="mt-px mb-2">{product.name}</h5>

          <div className="flex justify-between">
            <VariantIcon className='mb-2' variationIndex={variationIndex} setVariationIndex={setVariationIndex} variations={variations} />


          </div>
        
        
        </Link>
      </li>
    );
  };
};
