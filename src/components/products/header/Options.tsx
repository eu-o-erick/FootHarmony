'use client';

import { Queries } from '@/app/products/page';
import { cn, createURLQueries } from '@/lib/utils';
import { Offer } from '@/payload-types';
import { trpc } from '@/trpc/client';
import { Filter } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Props {
  isFilterOpen: boolean;
  queries: Queries;
  toggleFilter: () => void;
  offers: Offer[] | undefined | null;
  status: "error" | "success" | "loading";
};



export default function OptionsHeader({status, queries, toggleFilter, isFilterOpen}: Props) {
  const { genere, offer } = queries;

  const { data: offers } = trpc.offers.useQuery();

  const searchParams = useSearchParams();

  const query = searchParams.toString();
  
  const updateQuery = (item: {genere?: string, offer?: string}) => {

    if(item.genere) {
      return createURLQueries(query, { genere: item.genere });

    } else {
      return createURLQueries(query, { offer: (item.offer as string) });

    }
  };


  return (
    <nav className='flex justify-between items-center gap-7 bg-gray-a950 w-full p-3'>

      <ul className='flex'>

        { ['men', 'women', 'unisex'].map((item, i) => {
          const actived = item === genere;

          return (
            <li key={i}>
              <Link href={updateQuery({ genere: item })} className={
                cn('relative p-4 py-2 text-gray-800 border-b-2 border-gray-950 hover:text-gray-800 hover:bg-gray-100 group transition-all', {
                  'mr-6': i === 2,
                  'bg-gray-950 hover:bg-gray-950': actived
                })}>

                <span className={cn("font-semibold z-50 uppercase", {
                  'text-gray-200': actived
                })}>
                  {item}
                </span>

              </Link>
            </li>
          )}
        )}


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

      <button className={
        cn('relative p-4 py-2 border-b-2 border-gray-950 flex-center gap-2 transition-all', {
          'bg-gray-950 hover:bg-gray-950': isFilterOpen
        })}
        onClick={toggleFilter}>
        
        <Filter className={cn("w-4 h-4 mt-px -mb-px", {
          'text-gray-200': isFilterOpen
        })} />

        <span className={cn("font-semibold z-50 uppercase", {
          'text-gray-200': isFilterOpen
        })}>
          FILTERS
        </span>


      </button>
    </nav>
  );
}
