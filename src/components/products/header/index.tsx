'use client';

import { cn, createURLQueries } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import { Tally1 } from 'lucide-react';
import Link from 'next/link';


interface Props {
  queries: {
    categories: string | undefined;
    brand: string | undefined;
    genere: string | undefined;
    offer: string | undefined;
  };
  query: string;
};


const NAV_ITEMS = [
  {
    label: 'Men',
    genere: 'men',
  },{
    label: 'Women',
    genere: 'women',
  },{
    label: 'Unisex',
    genere: 'unisex',
  },
];



export default function HeaderProducts({queries, query}: Props) {
  const { categories, brand, genere, offer } = queries;

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
            brand ?? ( categories ?? ( offers?.find( off => off.id === offer )?.name ?? 'catalog' ) )
          }
        </span>
      </h4>

      <nav>
        <ul className='flex gap-8'>

          { NAV_ITEMS.map((item, i) => (
            <li key={i}>
              <Link href={updateQuery({ genere: item.genere })} className={cn('relative p-2 text-gray-500 hover:text-gray-800 transition-all', {
                'mr-6': i === 2,
              })}>

                <span className={cn("font-semibold z-50", {
                  'opacity-0': item.genere === genere
                })}>
                  {item.label}
                </span>

                <span className={cn("absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 font-bold text-gray-800 opacity-0", {
                  'opacity-100': item.genere === genere
                })}>
                  {item.label}
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
      </nav>
    </header>
  );
}
