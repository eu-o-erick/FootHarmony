'use client';

import { Queries } from '@/app/products/page';
import { cn, createURLQueries } from '@/lib/utils';
import { Offer } from '@/payload-types';
import { trpc } from '@/trpc/client';
import { Filter } from 'lucide-react';
import Link from 'next/link';

interface Props {
  queries: Queries;
  query: string;
  toggleFilter: () => void;
  isFilterOpen: boolean;
  offers: Offer[] | undefined | null;
  status: 'success' | ''
};



export default function OptionsHeader({queries, query, toggleFilter, isFilterOpen}: Props) {
  const { genere, offer } = queries;

  const { data: offers } = trpc.offers.useQuery();

  const updateQuery = (item: {genere?: string, offer?: string}) => {

    if(item.genere) {
      return createURLQueries(query, { genere: item.genere });

    } else {
      return createURLQueries(query, { offer: (item.offer as string) });

    }
  };


  return (
    <nav className='flex-center gap-7'>

      <ul className='flex gap-8'>

        { ['men', 'women', 'unisex'].map((item, i) => (
          <li key={i}>
            <Link href={updateQuery({ genere: item })} className={cn('relative p-2 py-1 text-gray-500 hover:text-gray-800 group transition-all', {
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

              <span className={cn("absolute bottom-0 left-0 bg-gray-800 h-px w-0 group-hover:w-full transition-all", {
                'w-full': item === genere
              })} />
              
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

      <button className={cn('relative py-1 flex-center gap-1 transition-all', { 'opacity-70': !isFilterOpen })} onClick={toggleFilter}>
        <Filter className='w-4 h-4' />

        <span className="font-bold text-gray-700">
          FILTERS
        </span>

        <span className={cn("absolute bottom-0 left-0 bg-gray-800 h-px w-0 group-hover:w-full transition-all", {
          'w-full': isFilterOpen
        })} />
      </button>
    </nav>
  );
}
