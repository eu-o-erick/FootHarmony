import { Brand, Media } from "@/payload-types";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { TBrandsFeatured } from "@/app/page";

interface Props {
  brands: TBrandsFeatured[] | undefined | null;
};


export default function Brands({brands}: Props) {

  return(
    <article className="w-full m-auto pt-28 pb-16 bg-white max-md:pb-8">

      <h3 className="font-semibold text-center text-4xl">
        Top Brands
      </h3>

      <p className="text-center mx-auto mt-8 mb-10 max-w-[650px] max-sm:mx-6">
        Indulge in our carefully curated shoe brands, tailored just for you. From chic and trendy to timeless and comfortable,
        discover the perfect fit for your unique style.
      </p>


      { !brands || !brands.length ?
        <div className="w-full h-20 max-w-[850px] max-[440px]:h-16" />
      :
        <Swiper
          slidesPerView={4}
          breakpoints={{
            '@0.00': {
              slidesPerView: 4,
            },
            '@0.75': {
              slidesPerView: 5,
            },
          }}
          className="max-w-[850px] max-[850px]:!mx-5"
          autoplay={true}
          loop={true}
          modules={[Autoplay]}>

            { brands.map((featured, i) => {
              const brand = featured.brand as Brand;
              const media = featured.cover as Media;

              return (
                <SwiperSlide key={i}>
                  <Link href={'/products?brand='+encodeURIComponent(brand.name)} className="w-20 h-20 flex-center m-auto group max-[440px]:w-16 max-[440px]:h-16">
                    <Image src={'/media/'+media.filename} alt={brand.name} width={100} height={100} className="group-hover:scale-110 transition-all" />
                  </Link>
                </SwiperSlide>
              )
            })} 
        </Swiper>
      }
    </article>
  );
};
