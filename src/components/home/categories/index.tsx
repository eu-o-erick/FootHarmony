import SkeletonCardProduct from "@/components/card_product/Skeleton";
import { Category, Media } from "@/payload-types"
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import ItemRoundedFeatured from "../featured/ItemsFeatured";

interface Props {
  categories: TCategoryFeatured[] | undefined | null;
};

export interface TCategoryFeatured {
  cover: string | Media;
  category: string | Category;
  id?: string | null | undefined;
}


export default function CategoriesFeatured({categories}: Props) {

  return(
    <div className="w-full">

      <h3 className="font-semibold text-gray-700 text-center text-xl">
        Browse by Style
      </h3>

      <p className="text-center mx-auto mt-5 mb-10 font-light max-w-[600px]">
        Explore our curated categories designed to streamline your search for the perfect pair.
        Whether you&apos;re into sneakers, boots, or sandals, we&apos;ve organized our collection
        to make finding your ideal style effortless
      </p>


      { !categories || !categories.length ?
        <SkeletonCardProduct />
      :
        <Swiper
          slidesPerView={4}
          autoplay={true}
          loop={true}
          modules={[Autoplay]}>

            { categories.map((featured, i) => {
              const category = featured.category as Category;
              const media = featured.cover as Media;

              return (
                <SwiperSlide key={i}>
                  <ItemRoundedFeatured
                    key={i}
                    img={media.filename as string}
                    link={'/products?category='+ encodeURIComponent(category.name)}
                    name={category.name}
                  />
              </SwiperSlide>
              )
            })} 
        </Swiper>
      }
    </div>
  );
};
