'use client';

import { createURLQueries } from '../../../lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { Queries } from '@/app/products/page';
import CategoriesFilter from './Categories';
import BrandsFilter from './Brands';
import ColorsFilter from './Colors';
import PriceFilter from './Price';
import SortFilter from './Sort';
import { useState } from 'react';

interface Props{
  queries: Queries;
};

export default function FilterComponents({queries}: Props) {
  const { brand, category, color, min_price, max_price, sort } = queries;

  const navigation = useRouter();

  const [stateBrand, setStateBrand] = useState(brand);
  const [stateCategory, setStateCategory] = useState(category);
  const [stateColor, setStateColor] = useState(color);
  const [stateMinPrice, setStateMinPrice] = useState(Number(min_price));
  const [stateMaxPrice, setStateMaxPrice] = useState(Number(max_price));
  const [stateSort, setStateSort] = useState(sort);


  const params = useSearchParams();

  const query = params.toString();

  function updateQuery(obj: {}) {

    navigation.push( createURLQueries(query, {
      brand: stateBrand ?? '',
      category: stateCategory ?? '',
      color: stateColor ?? '', 
      min_price: String(stateMinPrice), 
      max_price: String(stateMaxPrice),
      sort: stateSort ?? ''
    }) );
  
  };

  
  return (
    <ul className='flex flex-col'>
      <BrandsFilter state={stateBrand} setState={setStateBrand} />
      <CategoriesFilter state={stateBrand} setState={setStateCategory} />
      <ColorsFilter state={stateColor} setState={setStateColor} />
      <PriceFilter stateMin={stateMinPrice} stateMax={stateMaxPrice} setStateMin={setStateMinPrice} setStateMax={setStateMaxPrice} />
      {/* <SortFilter state={stateSort} setState={setStateSort} /> */}

      
      {/* <Link href={ updateQuery({ min_price: valueMin, max_price: valueMax }) } className="mt-4 flex-center w-24 h-8 text-sm font-semibold bg-gray-950 text-gray-200">
        Apply
      </Link> */}
    </ul>
  );
};
