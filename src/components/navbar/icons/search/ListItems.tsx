"use client";

import { cn } from '@/lib/utils';
import Item from './Item';
import { trpc } from '@/trpc/client';
import SkeletonItem from './Skeleton';
import { SearchX } from 'lucide-react';


interface Props {
  value: string;
  search: () => void;
}


export default function ListItems({value, search}: Props) {

  const { status, data: products } = trpc.search.useQuery({value});


  return(
    <div className={ cn('max-w-[422px] w-full p-3 bg-white border border-gray-800 -mt-10 shadow-lg hidden', {
      "block": value.replace(/ /g, '').length >= 3,
    })}>

      { value.replace(/ /g, '').length >= 3 &&
        status === "loading" ?
          <ul className='flex flex-col gap-4 py-4'>
            <SkeletonItem />
          </ul>
          :
          products?.length ?
            <ul className='max-h-60 overflow-y-auto overflow-x-hidden py-4'>
              { products.map((product, i) =>
                <Item key={i} product={product}/>
              )}
            </ul>
            :
            <div className="py-10 flex-center flex-col gap-4">
              <SearchX className='w-16 h-16 text-gray-400' />
              <p className='text-gray-300 font-bold text-lg'>No results found</p>
            </div>
      }

      <div className={cn("justify-center pb-2 hidden", {
        "flex": products?.length,
      })}>

        <button onClick={search} className='opacity-70 hover:opacity-100 group transition-all'>
          <span className="text-sm font-semibold">
            see all results
          </span>

          <div className="w-0 h-px bg-gray-800 transition-all group-hover:w-full" />
        </button>
      </div>
    </div>
  );
};
