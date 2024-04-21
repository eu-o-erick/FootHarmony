import CardProduct from "@/components/card_product"
import SkeletonCardProduct from "@/components/card_product/Skeleton";
import { Product } from "@/payload-types"
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/navigation';
import { useCallback, useRef } from "react";

interface Props {
  products: Product[] | undefined;
};



export default function ProductsFeatured({products}: Props) {


  const sliderRef = useRef<any>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = () => {
    console.log('PROXIMOOO')

    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  };

  return(
    <div className="w-full m-auto mt-20 max-w-[950px]">

      <h3 className="font-semibold text-4xl">
        Discover Our Latest Shoe Collection!
      </h3>

      { !products || !products.length ?
        <SkeletonCardProduct />
      :
        <Swiper
          slidesPerView={3}
          autoplay={true}
          loop={true}
          modules={[Navigation]}
          ref={sliderRef}>

            <div className="absolute z-50 bg-green-900 top-2/4 -translate-x-2/4 left-0 w-10 h-10" onClick={handlePrev} />
            <div className="absolute z-50 bg-green-900 top-2/4 -translate-x-2/4 right-0 w-10 h-10" onClick={handleNext} />

            { products.map((product, i) => (
              <SwiperSlide key={i}>
                <CardProduct product={product} />
              </SwiperSlide>
            ))} 

        </Swiper>
      }

    </div>
  );
};
