import { useRef, useState } from 'react';
import { Media } from '@/payload-types';
import Image from 'next/legacy/image';

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Swiper as TSwiper } from 'swiper/types';
import { FreeMode, Thumbs } from 'swiper/modules';

import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { cn } from '@/lib/utils';



interface Props{
  images: {
    image: string | Media;
    id?: string | null | undefined;
  }[];
};


export default function ImagesProduct({images}: Props) {
  const filenames = images.map(({image}) => (image as Media | undefined)?.filename ?? '')

  const [thumbsSwiper, setThumbsSwiper] = useState<TSwiper | null>(null);

  const refSwiper = useRef<SwiperRef | null>(null);

  const [index, setIndex] = useState(0);



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
    <div>

      <div className="relative">

        <div className="absolute top-2/4 -translate-y-2/4 flex justify-between w-full px-3 z-20 opacity-100 transition-all">
          <button className="flex-center" onClick={prev}>
            <IoIosArrowBack className={cn('bg-gray-50 rounded-full -ml-px text-gray-600 w-7 h-7 p-1.5 hover:p-1 hover:text-gray-900 transition-all max-sm:!p-1 max-sm:!w-6 max-sm:!h-6', {
              'opacity-60 cursor-default !text-gray-900 !p-1.5': index <= 0
            })} />
          </button> 

          <button className="flex-center" onClick={next}>
            <IoIosArrowForward className={cn('bg-gray-50 rounded-full -mr-px text-gray-600 w-7 h-7 p-1.5 hover:p-1 hover:text-gray-900 transition-all max-sm:!p-1 max-sm:!w-6 max-sm:!h-6', {
              'opacity-60 cursor-default !text-gray-900 !p-1.5': index >= images.length - 1
            })} />
          </button>
        </div>


        <Swiper
          ref={refSwiper}
          onSlideChange={handleSwiperUpdate}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className='bg-white shadow-mad'>

          { filenames.map((filename, i) => (
            <SwiperSlide key={i} className="w-full aspect-[4/3] p-14">
              <div className="relative w-full h-full">
                <Image src={'/media/'+filename} layout='fill' objectFit='contain' alt="" />
              </div>
            </SwiperSlide>
          )) }
        </Swiper>
      </div>


      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={0}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className='bg-white'>

          { filenames.map((filename, i) => (
            <SwiperSlide key={i} className='relative aspect-[4/3] p-4 shadow-amd'>
              <div className="relative w-full h-full">
                <Image src={'/media/'+filename} layout='fill' objectFit='contain' alt="" />
              </div>

              <div className={cn("absolute bottom-0 left-0 w-full h-0 bg-gray-950 transition-all", {
                'h-px': i === index,
              })} />
            </SwiperSlide>
          )) }
      </Swiper>
    </div>
  );
}