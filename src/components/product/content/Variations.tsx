import { cn } from '@/lib/utils';
import { Media, Product, Variation } from '@/payload-types';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';


interface Props{
  product: Product;
  variations: Variation[];
  variationIndex: number;
};

export default function VariationsImages({ product, variations, variationIndex }: Props) {

  return (
    <Swiper
      slidesPerView={4}
      className='!w-full'>

      { variations.map((variation, i) => {
        const isOut = !variation.stock.find( ({amount}) => amount > 0 );

        return(
          <SwiperSlide key={i} className="!py-4 !px-1">
            <Link
              href={`/product/${product.id}?variation=${variation.id}`}
              className={cn("relative bg-white !w-full aspect-[4/3] p-2 border shadow-md flex hover:p-1.5 transition-all", {
                '!border-gray-700 [700px]:!border-y-2': variationIndex === i,
                'opacity-80 border-transparent !shadow-none': isOut,
                '!border-gray-300': variationIndex === i && isOut
              })}>

              <div className="flex relative w-full h-full">
                <Image src={'/media/' + (variation.images[0].image as Media).filename} objectFit='contain' layout='fill' alt={variation.name} />
              </div>
            
            </Link>
          </SwiperSlide>
        )}
      )}

    </Swiper>
  );
};
