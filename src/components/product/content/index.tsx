'use client';

import { Product, Variation } from '@/payload-types';
import { useEffect, useState } from 'react';
import Info from './Info';
import Sizes from './Sizes';
import Buttons from './Buttons';
import Price from './Price';
import VariationsImages from './Variations';
import Quantity from './Quantity';
import Accordions from './Accordions';
import OfferComponent from './Offer';


interface Props{
  product: Product;
  variations: Variation[];
  variationIndex: number;
  setVariationIndex: React.Dispatch<React.SetStateAction<number>>
};

export default function ContentProduct({product, variations, variationIndex, setVariationIndex}: Props) {

  const [size, setSize] = useState<number | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [outOfStock, setOutOfStock] = useState(false);


  useEffect(() => {
    setSize(undefined);
    setQuantity(1);

    const isOut = !variations[variationIndex].stock.find( ({amount}) => amount > 0 );

    setOutOfStock(isOut);

  }, [variationIndex]);


  return (
    <section className='relative flex flex-col px-10 w-[40%]'>
      <span className="absolute top-11 right-10 flex-center w-16 h-7 bg-gray-950 text-gray-200 text-xs mb-2">NEW</span>
      <Info product={product} />
      <VariationsImages product={product} variations={variations} variationIndex={variationIndex} />
      <Sizes outOfStock={outOfStock} variation={variations[variationIndex]} size={size} setSize={setSize} />

      <div className="flex justify-between items-center my-6">
        <Quantity outOfStock={outOfStock} quantity={quantity} setQuantity={setQuantity} />
        <Price outOfStock={outOfStock} product={product} variation={variations[variationIndex]} />
      </div>
      <Buttons />

      <OfferComponent product={product} variation={variations[variationIndex]} />

      <Accordions product={product} variation={variations[variationIndex]}  />
    </section>
  );
}
