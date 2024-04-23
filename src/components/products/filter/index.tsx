'use client';

import { cn, createURLQueries } from '../../../lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { trpc } from '@/trpc/client';
import Link from 'next/link';

interface Props{

};

export default function FilterComponents(props: Props) {

  const { status: statusBrands, data: brands } = trpc.brands.useQuery();

  console.log('status: ', statusBrands)
  console.log('brands: ', brands)

  const [categoriesIsOpen, setCategoriesIsOpen] = useState(false);
  const [brandsIsOpen, setBrandsIsOpen] = useState(false);
  const [priceIsOpen, setPriceIsOpen] = useState(false);
  const [colorsIsOpen, setColorsIsOpen] = useState(false);
  const [sortIsOpen, setSortIsOpen] = useState(false);

  const params = useSearchParams();

  const queries = params.toString();

  function updateQuery(obj: {}) {
    return createURLQueries(queries, obj);
  
  };

  
  return (
    <ul className='flex flex-col'>

      <li className="">

        <button className="flex items-center justify-between w-full p-2" onClick={ () => setCategoriesIsOpen(!categoriesIsOpen) }>
          <span className="text-lg">Categories</span>

          <ChevronDown className={cn('transition-all', {
            'rotate-180': categoriesIsOpen
          })} />
        </button>

        <ul className="flex flex-col gap-px px-2">
        
          { (statusBrands !== 'success' || !brands?.length ) ?

            <>alou</>
            :

            brands.map((brand, i) => (
              <li key={i}>
                <Link className="relative flex-center justify-between font-semibold text-gray-400" href={ updateQuery({ brand: encodeURIComponent(brand.name)}) }>
                  <span className="z-50 bg-white px-2 text-sm">
                    {brand.name}
                  </span>

                  <span className="z-50 bg-white px-2">
                    {brand.quantity}
                  </span>

                  <div className="absolute top-2/4 left-0 translate-y-2/4 w-full h-px bg-gray-200" />
                
                </Link>
              </li>
            ))

          }

        </ul>

      </li>

    </ul>
  );
}
