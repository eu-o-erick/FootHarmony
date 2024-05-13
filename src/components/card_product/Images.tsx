import Image from 'next/legacy/image';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { Media, Variation } from '@/payload-types';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import isMobile from 'is-mobile';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper as TSwiper } from 'swiper/types';

interface Props{
  available: boolean;
  variation:  Variation;
};

export default function CarouselImages({available, variation}: Props) {
  const images = variation?.images.map(({image}) => (image as Media | undefined)?.filename ?? '')

  const refSwiper = useRef<SwiperRef | null>(null);

  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIsMobileDevice(isMobile());

  }, []);


  function prev() {
    if(!refSwiper?.current) return;

    refSwiper.current.swiper.slidePrev();
  };
  
  
  function next() {
    if(!refSwiper?.current) return;

    refSwiper.current.swiper.slideNext();
  };


  const handleSwiperUpdate = ({activeIndex}: TSwiper) => {
    setIndex(activeIndex);

  };


  return (
    <div className="relative aspect-[4/3] bg-white overflow-hidden select-none">

      <div className={cn("absolute top-2/4 -translate-y-2/4 flex justify-between w-full px-1 z-20 opacity-0 transition-all group-hover:opacity-100", {
        '!opacity-100': isMobileDevice
      })}>

        <button className="flex-center" onClick={prev}>
          <IoIosArrowBack className={cn('text-gray-600 w-7 h-7 p-1 hover:p-0.5 hover:text-gray-900 transition-all max-sm:!w-6 max-sm:!h-6', {
            'opacity-60 cursor-default !text-gray-900 !p-1': index <= 0
          })} />
        </button> 
      
        <button className="flex-center" onClick={next}>
          <IoIosArrowForward className={cn('text-gray-600 w-7 h-7 p-1 hover:p-0.5 hover:text-gray-900 transition-all max-sm:!w-6 max-sm:!h-6', {
            'opacity-60 cursor-default !text-gray-900 !p-1': index >= images.length - 1
          })} />
        </button>
      </div>


      <div className={cn("absolute left-0 bottom-0 border-b border-gray-950  w-full h-5 flex items-end opacity-0 transition-all group-hover:opacity-100", {
        '!opacity-100': isMobileDevice
      })}>
      
        { images.map((_, i) => (
          <div key={i} className={cn("w-full h-0 bg-gray-950 transition-all", {
            'h-px': i == index
          })} />
        )) }
      </div>



      <Swiper className="w-full h-full" ref={refSwiper} onSlideChange={handleSwiperUpdate}>
        { images.map((filename, i) => (
   
          <SwiperSlide key={i}>
   
            <div className={cn(`h-full w-full
              px-7 py-6 group-hover:px-6 group-hover:py-5 transition-all
              max-[1448px]:px-6 max-[1448px]:py-5 max-[1448px]:group-hover:px-5 max-[1448px]:group-hover:py-4
            `, {
              '!px-7 !py-6 max-[1448px]:!p-4 max-[1448px]:!px-6 max-[1448px]:!py-5': available
            })}>
              <div className="relative h-full w-full">
                <Image src={'/media/'+filename} alt='COVER' objectFit='contain' layout='fill' />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};
