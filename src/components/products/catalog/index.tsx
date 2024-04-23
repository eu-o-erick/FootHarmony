'use client';

import { Product } from '@/payload-types';
import FilterComponents from '../filter';


interface Props{
  products: Product[] | undefined;
  status: "success" | "error" | "loading";
};

export default function CatalogProducts({status, products}: Props) {


  
  return (
    <section className='w-full max-w-[1024px] mx-auto'>

      <aside className="bg-white border border-gray-300 w-80 mt-5 p-5 ">
        <FilterComponents />
      </aside>


    </section>
  );
}
