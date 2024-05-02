'use client';

import BreadcrumbComponent, { BreadCrumbElement } from '@/components/breadcrumb';
import Footer from '@/components/footer';
import Generes from '@/components/home/generes';
import Navbar from '@/components/navbar';
import ImagesProduct from '@/components/product/images';
import { Brand, Variation } from '@/payload-types';
import { trpc } from '@/trpc/client';
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';



export default function Product() {
  const searchParams = useSearchParams();
  const variationId = searchParams.get('variation');

  const { id } = useParams() as any;

  const { status, data: product } = trpc.product.useQuery({id})


  if(status !== 'success' || !product) {

    return(
      <>num tem, ou carregano</>
    );

  } else {
    const variation = product.variations?.[0] as Variation | null;

    if(!variation) return <></>;

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
    ]

    return (
      <div className='min-h-svh w-full '>
        <Navbar />
        <Generes />

        <div className="max-w-[1278px] mx-auto px-14 mt-20 mb-4">
          <BreadcrumbComponent elements={elements} />
        </div>

        <div className="grid grid-cols-2 gap-10 max-w-[1278px] mx-auto px-14">
          <ImagesProduct images={variation.images} />

          <div className="w-full h-full bg-red-500" />
        </div>
        
        <Footer />
      </div>
    );
  };
};
