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
    <div className='w-[58%] bg-white border select-none'>

      <div className="relative">

        <div className="absolute top-2/4 -translate-y-2/4 flex justify-between w-full px-3 z-20 opacity-100 transition-all">
          <button className="flex-center" onClick={prev}>
            <IoIosArrowBack className={cn('text-gray-500 w-10 h-10 p-1.5 hover:p-1 hover:text-gray-950 transition-all max-sm:!p-1 max-sm:!w-8 max-sm:!h-8', {
              'opacity-0 cursor-default': index <= 0
            })} />
          </button> 

          <button className="flex-center" onClick={next}>
            <IoIosArrowForward className={cn('text-gray-500 w-10 h-10 p-1.5 hover:p-1 hover:text-gray-950 transition-all max-sm:!p-1 max-sm:!w-8 max-sm:!h-8', {
              'opacity-0 cursor-default': index >= images.length - 1
            })} />
          </button>
        </div>

        <Swiper
          ref={refSwiper}
          onSlideChange={handleSwiperUpdate}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className=''>

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
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className='!py-6 !px-2'>

          { filenames.map((filename, i) => (
            <SwiperSlide key={i} className='!px-3'>
              <div className={cn('relative aspect-[4/3] p-5 shadow-md hover:p-4 transition-all border', {
                'border-gray-700 !border-y-2 !p-2': i === index,
              })}>

                <div className="relative w-full h-full">
                  <Image src={'/media/'+filename} layout='fill' objectFit='contain' alt="" />
                </div>
              </div>
            </SwiperSlide>
          )) }
      </Swiper>
    </div>
  );
};
