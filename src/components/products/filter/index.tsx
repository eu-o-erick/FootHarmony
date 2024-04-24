'use client';

import { createURLQueries } from '../../../lib/utils';
import { useSearchParams } from 'next/navigation';
import { Queries } from '@/app/products/page';
import CategoriesFilter from './Categories';
import BrandsFilter from './Brands';
import ColorsFilter from './Colors';

interface Props{
  queries: Queries;
};

export default function FilterComponents({queries}: Props) {
  const { brand, category, color, genere, min_price, max_price, offer, sort } = queries;


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

    </ul>
  );
}
