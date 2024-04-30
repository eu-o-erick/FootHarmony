import { Brand, Media, Product, Variation } from '@/payload-types';
import { useEffect, useState } from 'react';
import VariantIcon from '../VariantIcon';
import Link from 'next/link';
import { cn, formatPrice } from '@/lib/utils';
import Image from "next/legacy/image";


interface Props{
  product: Product;
  offer?: undefined | string;
  color?: undefined | string;
};


export default function CardProduct({product, offer, color}: Props) {
  const variations = product.variations as Variation[] | undefined;

  const [variationIndex, setVariationIndex] = useState(0);

  useEffect(() => {
    if(!variations?.length) return;

    if(offer) {
      const indexOffer = variations.findIndex(variation => {
        return variation.offer?.relationTo === offer;
      });
      
      if(indexOffer >= 0) return setVariationIndex(indexOffer);
    };


    if(color) {

      const indexPrimary = variations.findIndex(variation => {
        return variation.primary_color.toLocaleLowerCase() === color.toLocaleLowerCase();
      });
      
      if(indexPrimary >= 0) return setVariationIndex(indexPrimary);

      
      const indexSecondary = variations.findIndex(variation => {
        return variation.secondary_color?.toLocaleLowerCase() === color.toLocaleLowerCase();
      });

      if(indexSecondary >= 0) return setVariationIndex(indexSecondary);
    };


    const indexOffer = variations.findIndex(variation => {
      return variation.offer?.relationTo ? true : false;
    });
    
    if(indexOffer >= 0) return setVariationIndex(indexOffer);


    let maxSold = -Infinity;
    let indexBestSaller = -1;
    
    for (let i = 0; i < variations.length; i++) {
      if(variations[i].sold <= maxSold ) return;

      maxSold = variations[i].sold;
      indexBestSaller = i;
    };
    
    if(indexBestSaller >= 0) return setVariationIndex(indexBestSaller);

  
  }, [variations]);


  if(!variations?.length) return <></>;

  const variation = variations[variationIndex];
  const { filename } = variation.images[0].image as Media;

  const priceDefault = variation.standard_price ?? product.standard_price;
  const priceOffer = variation.offer?.offer_price ?? product.offer?.offer_price;
  const available = !variation.stock.find( (stock) => stock.amount > 0);


  return (
    <li className='relative group overflow-hidden bg-gray-50 border border-gray-200 shadow-md hover:shadow-lg transition-all w-56'>

      { available && <span className="absolute-center font-bold text-xs z-[10] py-3 px-4 text-gray-200 bg-gray-950 shadow-lg flex-center text-nowrap">OUT OF STOCK</span> }

      <Link className={cn('flex flex-col', {
         'opacity-60': available
        })}
        href={`/product/${product.id}/`}>

        <div className={cn("relative flex-center h-44 bg-white overflow-hidden p-5 group-hover:p-4 transition-all", {
          '!p-4': available
        })}>
          <div className="relative w-full h-full">
            <Image src={'/media/'+filename} alt='COVER' objectFit='contain' layout='fill' className='' />
          </div>
        </div>

        <span className="z-10 mt-3 px-3 text-xs text-[10px] text-gray-500 font-semibold uppercase">{(product.details.brand as Brand).name}</span>
        <h5 className="z-10 mb-2 px-3 font-semibold truncate uppercase">{product.name}</h5>

      </Link>

      <div className="flex justify-between mt-2">
        <VariantIcon className='px-3 bg-gray-300 w-2/4' limit={4} variationIndex={variationIndex} setVariationIndex={setVariationIndex} variations={variations} />

        <div className={cn('relative px-4 py-2 w-2/4 flex justify-between items-center gap-1 text-sm font-semibold bg-gray-950 text-gray-200', {
          'px-1.5': priceOffer,
          'opacity-60': available
        })}>

          <span className={cn("", { 'text-xs opacity-60 !line-through': priceOffer })}>
            { formatPrice(priceDefault) }
          </span>

          { priceOffer && <span>{ formatPrice(priceOffer) }</span> }

        </div>
      </div>

    </li>
  );
};
