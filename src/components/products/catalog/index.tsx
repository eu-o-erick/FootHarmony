'use client';

import { Product } from '@/payload-types';
import FilterComponents from '../filter';
import { Queries } from '@/app/products/page';
import { Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import CardProduct from '@/components/card_product';


interface Props{
  products: Product[] | undefined;
  status: "success" | "error" | "loading";
  queries: Queries;
  isFilterOpen: boolean;
};

export default function CatalogProducts({status, products, queries, isFilterOpen}: Props) {

  console.log('status: ', status)
  console.log('products: ', products)
  
  return (
    <section className='relative w-full max-w-[1024px] mx-auto overflow-x-hidden flex py-6'>
      
      <aside className={cn("bg-white border border-gray-100 min-w-72 w-72 min-h-screen p-5 transition-all mr-8", {
        'min-w-0 w-0 px-0 overflow-hidden opacity-0 mr-0': !isFilterOpen  
      })}>

        <FilterComponents queries={queries} />
      </aside>

      { status === 'success' ?

        products?.length ?
          <ul className={cn("w-full h-full grid grid-cols-3 gap-y-10 justify-items-center", {
            'grid-cols-4': !isFilterOpen
          })}>
            { products.map((product, i) => (
              <CardProduct key={i} product={product} />
            ))}
          </ul>
          :
          <p className="">nenhum produto</p>
        : 
        <h4 className="text-4xl">loading</h4>
      }

    </section>
  );
}
