import CardProduct from "@/components/card_product"
import SkeletonCardProduct from "@/components/card_product/Skeleton";
import { Featured, Product } from "@/payload-types"
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';


interface Props {
  items: Featured[] | null | undefined;
  isLoading: boolean;
};



export default function ProductsFeatured({items, isLoading}: Props) {

  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  useEffect(() => {
    if(isLoading && !items?.length) return;

    setProducts( items?.[0].products as Product[] )

  }, [items, isLoading]);


  return(
    <div className="w-full max-w-[760px]">

      <h3 className="font-semibold text-gray-700 text-center text-xl">
        Discover Our Latest Shoe Collection!
      </h3>

      <p className="text-center mx-5 mt-5 mb-10 font-light max-w-[850px]">
        Step into comfort and style with our latest shoe collection! From sleek sneakers to elegant loafers,
        our shoes are designed to elevate every step you take. Crafted with premium materials and attention to detail,
        they offer the perfect blend of fashion and function. Discover your perfect pair today and make every stride a statement!
      </p>


      { !products || !products.length ?
        <SkeletonCardProduct />

      :

        <Swiper
          slidesPerView={4}
          autoplay={true}
          loop={true}
          modules={[Autoplay]}>

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
