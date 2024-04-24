'use client';

import { createURLQueries } from '../../../lib/utils';
import { useSearchParams } from 'next/navigation';
import { Queries } from '@/app/products/page';
import CategoriesFilter from './Categories';
import BrandsFilter from './Brands';
import ColorsFilter from './Colors';
import PriceFilter from './Price';
import SortFilter from './Sort';

interface Props{
  queries: Queries;
};

export default function FilterComponents({queries}: Props) {
  const { brand, category, color, min_price, max_price, sort } = queries;


  const params = useSearchParams();

  const query = params.toString();

  function updateQuery(obj: {}) {
    return createURLQueries(query, obj);
  
  };

  
  return (
    <ul className='flex flex-col'>
      <BrandsFilter brand={brand} updateQuery={updateQuery} />
      <CategoriesFilter category={category} updateQuery={updateQuery} />
      <ColorsFilter color={color} updateQuery={updateQuery} />
      <PriceFilter min_price={min_price} max_price={max_price} updateQuery={updateQuery}  />
      <SortFilter sort={sort} updateQuery={updateQuery} />
    </ul>
  );
}
