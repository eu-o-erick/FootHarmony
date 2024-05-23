'use client';

import { useState, useEffect } from 'react';
import { trpc } from '@/trpc/client';
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Brand, Variation } from '@/payload-types';

import BreadcrumbComponent, { BreadCrumbElement } from '@/components/breadcrumb';
import Navbar from '@/components/navbar';
import Generes from '@/components/home/generes';
import ImagesProduct from '@/components/product/images';
import ContentProduct from '@/components/product/content';
import Similar from '@/components/product/similar';
import Footer from '@/components/footer';



export default function Product() {
  const searchParams = useSearchParams();
  const variationId = searchParams.get('variation');

  const { id } = useParams() as any;

  const { status, data: product } = trpc.product.useQuery({id});

  const [variationIndex, setVariationIndex] = useState(0);


  useEffect(() => {
    if(!product || !product.variations?.length) return setVariationIndex(0);

    const i = product.variations.findIndex(variation => (variation as Variation).id === variationId) ?? 0;

    setVariationIndex(i);

  }, [product, variationId])



  if(status !== 'success' || !product) {

    return(
      <>num tem, ou carregano</>
    );


  } else {
    
    const variations = product.variations as Variation[] | null;
    const variation = variations?.[variationIndex] as Variation | null;

    if(!variations || !variation) return <></>;

    const elements: BreadCrumbElement[] = [
      {
        label: 'home',
        href: '/'
      },{
        label: 'products',
        href: '/products'
      },{
        label: (product.details.brand as Brand).name,
        href: '/products?brand=' + encodeURIComponent((product.details.brand as Brand).name)
      },{
        label: product.name,
      },
    ];

    return (
      <div className='min-h-svh w-full'>
        <Navbar />
        <Generes />

        <div className="max-w-[1278px] mx-auto px-14 mt-20 mb-4 max-[1000px]:px-8 max-[800px]:px-20 max-[600px]:px-5 max-[500px]:px-3">
          <BreadcrumbComponent elements={elements} />
        </div>

        <div className="
          relative flex justify-between items-start max-w-[1278px] mx-auto px-14
          max-[1000px]:px-8 max-[800px]:flex-col max-[800px]:gap-20 max-[800px]:px-20 max-[600px]:px-5 max-[600px]:gap-14 max-[500px]:gap-10 max-[500px]:px-3
        ">

          <ImagesProduct images={variation.images} />

          <ContentProduct product={product} variation={variation} variations={variations} variationIndex={variationIndex}  />
        </div>

        <Similar product={product} />
        <Footer />
      </div>
    );
  };
};
