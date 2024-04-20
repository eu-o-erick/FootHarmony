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
    <article className="w-full max-w-[800px] m-auto mt-28 mb-16">

      <h3 className="font-semibold text-gray-700 text-center text-4xl">
        Top Brands
      </h3>

      <p className="text-center mx-auto mt-5 mb-10 max-w-[650px]">
        Indulge in our carefully curated shoe brands, tailored just for you. From chic and trendy to timeless and comfortable,
        discover the perfect fit for your unique style.
      </p>


      { !brands || !brands.length ?
        <ul className="flex justify-between">

          { [0,1,2,3,4,5].map(i => (
            <li className="" key={i}>
              <Skeleton className="w-24 h-14 shadow-md" />
            </li>
          ))}

        </ul>
      :
        <Swiper
          slidesPerView={6}
          autoplay={true}
          loop={true}
          modules={[Autoplay]}>

            { brands.map((featured, i) => {
              const brand = featured.brand as Brand;
              const media = featured.cover as Media;

              return (
                <SwiperSlide key={i}>
                  <Link href={'/products?brand='+encodeURIComponent(brand.name)} className="w-20 h-20 flex-center m-auto group">
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
