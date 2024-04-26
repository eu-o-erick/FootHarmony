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
import Link from 'next/link';

interface Props{
  queries: Queries;
};


export default function FilterComponents({queries}: Props) {
  const { brand, category, color, min_price, max_price, sort } = queries;

  const navigation = useRouter();

  const [stateBrand, setStateBrand] = useState(brand);
  const [stateCategory, setStateCategory] = useState(category);
  const [stateColor, setStateColor] = useState(color);
  const [stateMinPrice, setStateMinPrice] = useState( isNaN(Number(min_price)) ? 0 : Number(min_price) );
  const [stateMaxPrice, setStateMaxPrice] = useState( isNaN(Number(max_price)) ? 500 : Number(max_price) );
  const [stateSort, setStateSort] = useState(sort);


  const params = useSearchParams();

  const query = params.toString();

  function reset() {
    setStateBrand(undefined);
    setStateCategory(undefined);
    setStateColor(undefined);
    setStateMinPrice(0);
    setStateMaxPrice(500);
    setStateSort(undefined);

    navigation.push('/products');
  };

  function updateQuery() {

    navigation.push( createURLQueries(query, {
      brand: stateBrand,
      category: stateCategory,
      color: stateColor,
      min_price: String(stateMinPrice),
      max_price: String(stateMaxPrice),
      sort: stateSort,
    }));
  };


  return (
    <ul className='flex flex-col !min-w-60'>
      <BrandsFilter state={stateBrand} setState={setStateBrand} />
      <CategoriesFilter state={stateCategory} setState={setStateCategory} />
      <ColorsFilter state={stateColor} setState={setStateColor} />
      <PriceFilter stateMin={stateMinPrice} stateMax={stateMaxPrice} setStateMin={setStateMinPrice} setStateMax={setStateMaxPrice} />
      <SortFilter state={stateSort} setState={setStateSort} />

      <div className="flex justify-between mt-6">
        <button onClick={reset} className='flex-center  font-semibold shadow-md w-24 h-9 bg-gray-100 text-gray-800'>
          RESET
        </button>

        <button className="flex-center w-24 h-9 font-semibold shadow-md bg-gray-950 text-gray-200 hover:bg-gray-900 transition-all" onClick={updateQuery}>
          APPLY
        </button>
      </div>
    </ul>
  );
};
