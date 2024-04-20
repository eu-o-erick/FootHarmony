import CardProduct from "@/components/card_product"
import SkeletonCardProduct from "@/components/card_product/Skeleton";
import { Product } from "@/payload-types"
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';


interface Props {
  products: Product[] | undefined;
};



export default function ProductsFeatured({products}: Props) {


  return(
    <div className="w-full">

      <h3 className="font-semibold text-center text-4xl">
        Discover Our Latest Shoe Collection!
      </h3>

      <p className="m-auto mt-5 mb-10 text-center max-w-[850px]">
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
          modules={[Navigation]}>

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



{/*   

*/}