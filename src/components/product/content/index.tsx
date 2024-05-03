'use client';

import { Product, Variation } from '@/payload-types';
import { useEffect, useState } from 'react';
import Info from './Info';
import Sizes from './Sizes';
import Buttons from './Buttons';
import Price from './Price';
import VariationsImages from './Variations';
import Quantity from './Quantity';


interface Props{
  product: Product;
  variations: Variation[];
  variationIndex: number;
  setVariationIndex: React.Dispatch<React.SetStateAction<number>>
};

export default function ContentProduct({product, variations, variationIndex, setVariationIndex}: Props) {

  const [size, setSize] = useState<number | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSize(undefined);
    setQuantity(1);

  }, [variationIndex]);


  return (
    <section className='relative flex flex-col bg-whiate px-10 py-12 bg-white'>
      <span className="absolute top-11 right-10 flex-center w-16 h-7 bg-gray-950 text-gray-200 text-xs mb-2">NEW</span>
      <Info product={product} />
      <VariationsImages product={product} variations={variations} variationIndex={variationIndex} />
      <Sizes variation={variations[variationIndex]} size={size} setSize={setSize} />

      <div className="flex justify-between items-center my-6">
        <Quantity quantity={quantity} setQuantity={setQuantity} />
        <Price product={product} variation={variations[variationIndex]} />
      </div>
      <Buttons />
    </section>
  );
}
