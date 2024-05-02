'use client';

import { Product, Variation } from '@/payload-types';
import { useState } from 'react';
import Info from './Info';
import Sizes from './Sizes';
import VariantIcon from '@/components/VariantIcon';
import Buttons from './Buttons';
import Price from './price';


interface Props{
  product: Product;
  variations: Variation[];
  variationIndex: number;
  setVariationIndex: React.Dispatch<React.SetStateAction<number>>
};

export default function ContentProduct({product, variations, variationIndex, setVariationIndex}: Props) {

  const [size, setSize] = useState<number | undefined>(undefined);



  return (
    <section className='relative flex flex-col bg-whiate px-10 py-8 bg-white'>
      <span className="absolute top-7 right-10 flex-center w-16 h-7 bg-gray-950 text-gray-200 text-xs mb-2">NEW</span>
      <Info product={product} />
      <VariantIcon className='mt-4' variations={variations} variationIndex={variationIndex} setVariationIndex={setVariationIndex} />
      <Sizes variation={variations[variationIndex]} size={size} setSize={setSize} />
      <Price product={product} variation={variations[variationIndex]} />
      <Buttons />
    </section>
  );
}
