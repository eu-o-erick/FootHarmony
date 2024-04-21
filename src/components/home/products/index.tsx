import CardProduct from "@/components/card_product"
import SkeletonCardProduct from "@/components/card_product/Skeleton";
import { Product } from "@/payload-types"
import Link from "next/link";

interface Props {
  products: Product[] | undefined;
};


export default function ProductsFeatured({products}: Props) {

  return(
    <div className="w-full m-auto mt-20 max-w-[1024px] max-lg:px-10 flex flex-col max-sm:px-5 max-[480px]:px-3">

      <h3 className="font-semibold text-5xl mb-16 max-md:mb-10 max-sm:text-2xl">
      Step into Style
      </h3>

      { !products || !products.length ?
        <SkeletonCardProduct />
      :
        <ul className="w-full flex justify-between max-md:flex-wrap max-md:gap-y-5">
          { products.map((product, i) => (
            i < 4 && <CardProduct key={i} product={product} />
          ))} 
        </ul>
      }

      <Link href={'/products'} className="rounded-full bg-gray-900 h-12 w-52 mx-auto my-20 text-gray-200 shadow-md flex-center hover:shadow-lg hover:bg-gray-950 transition-all max-sm:my-10">
        See All Products
      </Link>
    </div>
  );
};






// { !products || !products.length ?
//   <SkeletonCardProduct />
// :
//   <div className="relative">
//     <button className="absolute z-50 top-2/4 -translate-y-2/4 -left-10 flex-center" onClick={handlePrev}>
//       <ChevronLeft className="w-10 h-10" />
//     </button>
//     <button className="absolute z-50 top-2/4 -translate-y-2/4 -right-10 flex-center" onClick={handleNext}>
//       <ChevronRight className="w-10 h-10" />
//     </button>
//     <Swiper
//       slidesPerView={4}
//       autoplay={true}
//       loop={true}
//       modules={[Navigation]}
//       ref={sliderRef} className="">
//         { products.map((product, i) => (
//           <SwiperSlide key={i} className="">
//             <CardProduct product={product} />
//           </SwiperSlide>
//         ))} 
//     </Swiper>
//   </div>
// }