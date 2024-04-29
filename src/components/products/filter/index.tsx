import { Queries } from '@/app/products/page';
import CategoriesFilter from './Categories';
import { SlidersHorizontal, X } from 'lucide-react';
import BrandsFilters from './Brands';
import { cn, createURLQueries } from '@/lib/utils';
import ColorsFilter from './Colors';
import PriceFilter from './Price';
import SortFilter from './Sort';
import SizeFilter from './Sizes';
import Link from 'next/link';


interface Props{
  queries: Queries;
  query: string;
  isFilterOpen: boolean;
};

export default function Filter({queries, query, isFilterOpen}: Props) {

  return (
    <div className="w-full max-w-[1448px] mx-auto px-14">

      <div className={cn("border-b-2 flex items-center gap-5 px-5 h-14 transition-all", {
        'h-0 opacity-0': !isFilterOpen
      })}>
        <SlidersHorizontal className='text-gray-600 w-5 h-5 mr-3' />

        <BrandsFilters query={query} brand={queries.brand} />
        <CategoriesFilter query={query} category={queries.category} />
        <ColorsFilter query={query} color={queries.color} />
        <PriceFilter query={query} min_price={queries.min_price} max_price={queries.max_price} />
        <SizeFilter query={query} size={queries.size} />

        <SortFilter query={query} sort={queries.sort} />
      </div>

      <ul className={cn("flex gap-5 px-8 mt-2 mb-10 transition-all", {
        'h-0 opacity-0': !isFilterOpen
      })}>

        {Object.entries(queries).map(([key, value]) => {
          const label = value
          
          return filterOption({[key]: undefined}, query, value)
        })}

      </ul>

    </div>
  );
};

function filterOption(opt: { [key: string]: undefined }, query: string, label: string) {

  return(
    <li className=''>
      <Link href={ createURLQueries(query, opt)} className='flex-center gap-2 h-6 px-2 bg-gray-950 text-gray-500'>
        <span className="text-xs font-semibold uppercase">
          {label}
        </span>
        <X className='w-4 h-4 p-0.5 bg-gray-s800 text-gray-80' />
      </Link>
    </li>
  )
};
