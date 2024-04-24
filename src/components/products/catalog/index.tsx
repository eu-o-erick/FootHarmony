'use client';

import { Product } from '@/payload-types';
import FilterComponents from '../filter';
import { Queries } from '@/app/products/page';


interface Props{
  products: Product[] | undefined;
  status: "success" | "error" | "loading";
  queries: Queries; 
};

export default function CatalogProducts({status, products, queries}: Props) {


  
  return (
    <section className='w-full max-w-[1024px] mx-auto'>

      <aside className="bg-white border border-gray-100 shadow-lg w-72 min-h-screen mt-5 p-5 ">
        <FilterComponents queries={queries} />
      </aside>


    </section>
  );
}
