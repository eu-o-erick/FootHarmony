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
import { useCart } from '@/hooks/useCart';
import { sizes } from '@/constants/sizes';
import Error from '@/components/Error';


interface Props{
  product: Product;
  variation: Variation;
  variations: Variation[];
  variationIndex: number;
};

export default function ContentProduct({product, variation, variations, variationIndex}: Props) {

  const [isNew, setIsNew] = useState(false);
  const [isError, setIsError] = useState(false);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [outOfStock, setOutOfStock] = useState(false);
  const [amount, setAmount] = useState(0);

  const { addItem } = useCart();


  useEffect(() => {
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const variationDate = new Date(product.createdAt);
  
    const isNew = (currentDate.getTime() - variationDate.getTime()) < oneWeekInMilliseconds;
 
    setIsNew(isNew);

  }, []);


  useEffect(() => {
    setSize(undefined);
    setQuantity(1);

    const isOut = !variation.stock.find( ({amount}) => amount > 0 );

    setOutOfStock(isOut);

  }, [variationIndex]);

  
  useEffect(() => {
    if(!size) return;

    const stock = variation.stock.find((value) => value.size === sizes[size] )?.amount;

    setQuantity(1);
    setAmount(stock ?? 0)

  }, [size]);


  function addProduct() {
    if(!size) return setIsError(true);

    addItem( product.id, variations[variationIndex].id, sizes[size], quantity );
  };


  return (
    <section className='
      relative flex flex-col w-[38%] px-5
      max-[1000px]:px-2 max-[800px]:w-full
    '>
      
      { isNew && <span className="absolute top-0 right-0 flex-center w-16 h-7 bg-gray-950 text-gray-200 text-xs mb-2">NEW</span> }

      <Info product={product} />
      <VariationsImages product={product} variations={variations} variationIndex={variationIndex} />

      <p className="flex items-center gap-1 text-xs">
        <span className="text-gray-500">COLORS:</span>
        <span className="text-gray-500 font-semibold">{variation.primary_color}</span>

        {variation.secondary_color && 
          <>
            <span className="text-gray-500 font-semibold">/</span>
            <span className="text-gray-500 font-semibold">{variation.secondary_color}</span>
          </>
        }

      </p>

      <Sizes outOfStock={outOfStock} variation={variation} size={size} setSize={setSize} isError={isError} />

      <div className="flex justify-between items-center my-6">
        <Quantity outOfStock={outOfStock} quantity={quantity} setQuantity={setQuantity} amount={amount} />
        <Price outOfStock={outOfStock} product={product} variation={variation} />
      </div>

      <Buttons addProduct={addProduct} outOfStock={outOfStock} product={product.id} variation={variation.id} size={size} quantity={quantity} setIsError={setIsError} />

      <OfferComponent product={product} variation={variation} />

      <Accordions product={product} variation={variation}  />

      <Error isError={isError} setIsError={setIsError} label={'Sizes is empty'} />

    </section>
  );
};
