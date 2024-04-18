"use client";

import { trpc } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Brand, Category, Media, Modal, Offer, Product, Variation } from '@/payload-types';
import { setId } from '@/store/reducers/modal';

import 'swiper/css/pagination';



export default function Carousel() {

  const { status, data: carousels } = trpc.carousel.useQuery();

  const dispatch = useDispatch();

  const router = useRouter();


  function handlerClick(i: number) {
    const carousel = carousels?.[i];

    if(!carousel) return;


    if(carousel.type === 'Modal') {
      const id = (carousel.modal as Modal).id;

      dispatch( setId(id) );

    } else {

      let url = '';

      switch (carousel.type_link) {
        case 'Product':
          url = `/product/${(carousel.product as Product).id}`;
          break;

        case 'Variation':
          const variation = carousel.variation as Variation
          const product = variation.product as Product
          url = `/product/${product.id}?variation=${variation.id}`;
          break;

        case 'Brand':
          url = `/products?brand=${encodeURIComponent((carousel.brand as Brand).name)}`;
          break;
  
        case 'Category':
          url = `/products?category=${encodeURIComponent((carousel.category as Category).name)}`;
          break;
  
        case 'Offer':
          url = `/products?offer=${(carousel.offer as Offer).id}`;
          break;
      }

      router.push(url)
    }
  };


  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return `<button class="${className} !bg-gray-800" />`;
    },
  };


  return(
    <section className='w-full mb-20'>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={true}
        loop={true}
        modules={[Autoplay, Pagination]}
        pagination={pagination}
        className='!pb-10'>

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