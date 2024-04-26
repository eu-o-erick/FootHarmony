'use client';

import { Queries } from '@/app/products/page';
import { cn, createURLQueries } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import { Filter } from 'lucide-react';
import Link from 'next/link';
import TitleProducts from './Title';
import BreadcrumbProducts from './Breadcrumb';

interface Props {
  queries: Queries;
  query: string;
  toggleFilter: () => void;
  isFilterOpen: boolean;
};



export default function HeaderProducts({queries, query, toggleFilter, isFilterOpen}: Props) {
  const { status, data: offers } = trpc.offers.useQuery();

  const updateQuery = (item: {genere?: string, offer?: string}) => {

    if(item.genere) {
      return createURLQueries(query, { genere: item.genere });

    } else {
      return createURLQueries(query, { offer: (item.offer as string) });

    }
  };


  return (
    <header className='relative flex flex-col items-start max-w-[1448px] w-full mx-auto mt-20 p-2 px-14'>

      <BreadcrumbProducts />

      <TitleProducts queries={queries} offers={offers} />


      <div className="">

        <div className="">
          <input type="text" className='' />

        </div>

        {/* <OptionsHeader updateQuery={updateQuery} status={status} offers={offers} queries={queries} toggleFilter={toggleFilter} isFilterOpen= /> */}

      </div>
    </header>
  );
}
