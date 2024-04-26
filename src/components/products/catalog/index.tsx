'use client';

import { Product } from '@/payload-types';
import FilterComponents from '../filter';
import { Queries } from '@/app/products/page';
import { cn } from '@/lib/utils';
import CardProduct from '@/components/card_product';


interface Props{
  products: Product[] | undefined;
  status: "success" | "error" | "loading";
  queries: Queries;
  isFilterOpen: boolean;
  toggleFilter: () => void;
};
`
`
export default function CatalogProducts({status, products, queries, isFilterOpen, toggleFilter}: Props) {

  // console.log('status: ', status)
  // console.log('products: ', products)
  
  return (
    <section className='relative w-full max-w-[1448px] px-14 mx-auto overflow-x-hidden flex py-6'>
      
      {/* aside filter */}
      <aside className={cn("bg-white border border-gray-100 min-w-72 w-72 px-6 py-8 transition-all mr-8 max-lg:hidden", {
        'min-w-0 w-0 px-0 overflow-hidden opacity-0 mr-0': !isFilterOpen  
      })}>
        <FilterComponents queries={queries} />
      </aside>

    {/*
    import { Sheet, SheetContent } from "@/components/ui/sheet";

    sheet filter
       <Sheet open={isFilterOpen} onOpenChange={toggleFilter}>
        <SheetContent>
          <FilterComponents queries={queries} />
        </SheetContent>
      </Sheet>
    */}


      { status === 'success' ?

        products?.length ?
          <ul className={cn(`w-full h-full grid gap-y-10 grid-cols-3 justify-items-center
            max-lg:grid-cols-4
          `, {
            'lg:grid-cols-4': !isFilterOpen
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
