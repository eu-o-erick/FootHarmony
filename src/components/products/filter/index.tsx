import { Queries } from '@/app/products/page';
import CategoriesFilter from './Categories';
import { SlidersHorizontal, X } from 'lucide-react';
import BrandsFilters from './Brands';
import { cn, createURLQueries } from '@/lib/utils';
import ColorsFilter from './Colors';
import PriceFilter from './Price';
import SortFilter from './Sort';
import SizeFilter from './Sizes';


interface Props{
  queries: Queries;
  query: string;
  isFilterOpen: boolean;
};

export default function Filter({queries, query, isFilterOpen}: Props) {

  return (
    <div className="w-full max-w-[1448px] mx-auto px-14">

      <div className={cn("border-b-2 flex justify-between items-center px-5 h-14 transition-all", {
        'h-0 opacity-0': !isFilterOpen
      })}>
        <div className="flex items-center gap-5 ">
          <SlidersHorizontal className='text-gray-600 w-5 h-5 mr-3' />

          <BrandsFilters query={query} brand={queries.brand} />
          <CategoriesFilter query={query} category={queries.category} />
          <ColorsFilter query={query} color={queries.color} />
          <PriceFilter query={query} min_price={queries.min_price} max_price={queries.max_price} />
          <SizeFilter query={query} size={queries.size} />
        </div>

        <SortFilter query={query} sort={queries.sort} />
      </div>

    </div>
  );
};
