import CardProduct from '@/components/card_product';
import SkeletonCardProduct from '@/components/card_product/Skeleton';
import { Brand, Category, Product, Tag } from '@/payload-types';
import { trpc } from '@/trpc/client';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';


interface Props{
  product: Product;
};


export default function Similar({ product }: Props) {

  const { data: products } = trpc.similar.useQuery({
    id: product.id,
    category: (product.details.categories[0] as Category).name,
    brand: (product.details.brand as Brand).name,
    tags: (product.details.tags as Tag[] || undefined)?.map((tag) => tag.name).join(','),
  });



  return (
    <section className="relative max-w-[1278px] mx-auto px-14 mt-20">
      <h3 className="font-semibold text-2xl uppercase">explore more product</h3>

      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        className='w-full !py-6'>

        { !products || !products.length ?

            [0,1,2,3].map((i) => (
              <SwiperSlide className='' key={i}>
                <SkeletonCardProduct key={i} />
              </SwiperSlide>
            ))
          :
            [...products, ...products, ...products].map((product, i) => (

              <SwiperSlide className='' key={i}>
                <CardProduct product={product} />
              </SwiperSlide>
            )) 
        }

      </Swiper>

    </section>
  );
};
