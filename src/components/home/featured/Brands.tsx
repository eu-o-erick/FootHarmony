import SkeletonCardProduct from "@/components/card_product/Skeleton";
import { Brand, Media } from "@/payload-types"
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import ItemRoundedFeatured from "./ItemsFeatured";

interface Props {
  brands: TBrandsFeatured[] | undefined | null;
};

export interface TBrandsFeatured {
  cover: string | Media;
  brand: string | Brand;
  id?: string | null | undefined;
}


export default function BrandsFeatured({brands}: Props) {

  return(
    <div className="w-full">

      <h3 className="font-semibold text-gray-700 text-center text-xl">
        Discover Brands Tailored for You
      </h3>

      <p className="text-center mx-auto mt-5 mb-10 font-light max-w-[600px]">
        Indulge in our carefully curated shoe brands, tailored just for you. From chic and trendy to timeless and comfortable,
        discover the perfect fit for your unique style.
      </p>


      { !brands || !brands.length ?
        <SkeletonCardProduct />
      :
        <Swiper
          slidesPerView={4}
          autoplay={true}
          loop={true}
          modules={[Autoplay]}>

            { brands.map((featured, i) => {
              const brand = featured.brand as Brand;
              const media = featured.cover as Media;

              return (
                <SwiperSlide key={i}>
                  <ItemRoundedFeatured
                    key={i}
                    img={media.filename as string}
                    link={'/products?brand='+ encodeURIComponent(brand.name)}
                    name={brand.name}
                  />
              </SwiperSlide>
              )
            })} 
        </Swiper>
      }
    </div>
  );
};
