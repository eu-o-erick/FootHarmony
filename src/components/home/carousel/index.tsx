"use client";

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { trpc } from '@/trpc/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Media } from '@/payload-types';

export default function Carousel() {

  const { status, data: carousels } = trpc.carousel.useQuery();


  function handlerClick(i: number) {

  }

  return(
    <section className='w-full mb-20'>
      <Swiper spaceBetween={0} slidesPerView={1} autoplay={true} loop={true} modules={[Autoplay]}>

        { status === 'success' && carousels?.length ?
        
          carousels.map((item, i) => {
            const imagDesktop = item.image_desktop as Media;
            const imagMobile = item.image_mobile as Media;

            return(
              <SwiperSlide key={i} className='cursor-pointer' onClick={() => handlerClick(i)}>
              
                <Image src={`/media/${imagDesktop.filename}`} alt='DESKTOP IMAGE' width={10000} height={1000} className='max-md:hidden' />

                <Image src={`/media/${imagMobile.filename}`} alt='DESKTOP IMAGE' width={10000} height={1000} className='md:hidden' />
              
              </SwiperSlide>
            )
          })

        :

        [0,1,2].map((item) => (
          <SwiperSlide key={item}>
            <Skeleton className='w-full h-[550px]' />
          </SwiperSlide>
        ))

      }


      </Swiper>
    </section>
  )

}