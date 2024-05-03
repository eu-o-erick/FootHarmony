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
    <div className='mt-5'>

      <Swiper
        slidesPerView={4}
        className='!w-full'>

        { variations.map((variation, i) => (
          <SwiperSlide key={i} className="!py-4 !px-1">
            <Link
              href={`/product/${product.id}?variation=${variation.id}`}
              className={cn("relative !w-24 aspect-[4/3] p-2 border shadow-md flex hover:p-1.5 transition-all", {
                'border-gray-950 border-b-2': variationIndex === i
              })}>

              <div className="flex relative w-full h-full">
                <Image src={'/media/' + (variation.images[0].image as Media).filename} objectFit='contain' layout='fill' alt={variation.name} />
              </div>
            
            </Link>
          </SwiperSlide>
        )) }

      </Swiper>
    </div>
  );
}
