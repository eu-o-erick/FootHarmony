'use client';

import { Queries } from '@/app/products/page';
import { cn, createURLQueries } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import { Filter, Tally1 } from 'lucide-react';
import Link from 'next/link';


interface Props {
  queries: Queries;
  query: string;
  toggleFilter: () => void;
  isFilterOpen: boolean;
};



export default function HeaderProducts({queries, query, toggleFilter, isFilterOpen}: Props) {
  const { category, brand, genere, offer } = queries;

  const { status, data: offers } = trpc.offers.useQuery();


  const updateQuery = (item: {genere?: string, offer?: string}) => {

    if(item.genere) {
      return createURLQueries(query, { genere: item.genere });

    } else {
      return createURLQueries(query, { offer: (item.offer as string) });

    }
  };


  return (
    <header className='w-full max-w-[1024px] mx-auto mt-20 py-2 flex justify-between items-end border-b border-gray-300'>

      <h4 className="text-lg font-bold flex-center uppercase text-gray-600">
        <span>{genere ?? 'shoes' }</span>
        <Tally1 className='flex-center ml-2 -mr-2' />
        <span>
          {
            brand ?? ( category ?? ( offers?.find( off => off.id === offer )?.name ?? 'catalog' ) )
          }
        </span>
      </h4>

      <nav className='flex-center gap-7'>
        <ul className='flex gap-8'>

          { ['men', 'women', 'unisex'].map((item, i) => (
            <li key={i}>
              <Link href={updateQuery({ genere: item })} className={cn('relative p-2 text-gray-500 hover:text-gray-800 transition-all', {
                'mr-6': i === 2,
              })}>

                <span className={cn("font-semibold z-50 uppercase", {
                  'opacity-0': item === genere
                })}>
                  {item}
                </span>

                <span className={cn("absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 font-bold text-gray-800 opacity-0 uppercase", {
                  'opacity-100': item === genere
                })}>
                  {item}
                </span>
                
              </Link>
            </li>
          ))}


          { status === 'success' && offers?.map(({id, name}, i) => (
            <li key={i}>
              <Link href={updateQuery({ offer: id })} className='relative p-2 font-semibold text-gray-500 hover:text-gray-800 transition-all'>

                <span className={cn("font-semibold z-50", {
                  'opacity-0': id === offer
                })}>
                  {name}
                </span>

                <span className={cn("absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 font-bold text-gray-800 opacity-0 text-nowrap", {
                  'opacity-100':id === offer
                })}>
                  {name}
                </span>

              </Link>
            </li>
          ))}
        
        </ul>

        <button className={cn('flex-center gap-1 transition-all', { 'opacity-70': !isFilterOpen })} onClick={toggleFilter}>
          <Filter className='w-5 h-5' />

          <span className="font-bold text-gray-700">
            FILTERS
          </span>
        </button>
      </nav>

    </header>
  );
}
