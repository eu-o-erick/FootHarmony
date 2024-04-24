'use client';

import { cn } from '../../../lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface Props{
  sort: string | undefined;
  updateQuery: ({}) => string;
};


const SORT = [
  {
    label: 'Best Sallers',
    value: 'sold'
  },{
    label: 'New Arrivals',
    value: 'createAt'
  },{
    label: 'Lowest Price',
    value: 'standard_price'
  },{
    label: 'Highest Price',
    value: '-standard_price'
  },
];

export default function SortFilter({sort, updateQuery}: Props) {

  const [isOpen, setIsOpen] = useState(false);


  function handlerOpen() {
    setIsOpen(!isOpen)
  
  };

  
  return (
    <li className='py-3 border-b border-slate-300'>
      <button className="flex items-center justify-between w-full p-2" onClick={handlerOpen}>
        <span className="text-lg">Sort</span>

        <ChevronDown className={cn('transition-all', {
          'rotate-180': isOpen
        })} />
      </button>

      <ul className={cn("h-0 px-2 gap-x-2 gap-y-3 overflow-hidden", {
        'h-auto  py-2': isOpen
      })}>

        { SORT.map(({value, label}, i) => (
          <li key={i}>
            <Link className="flex items-center gap-2" href={ updateQuery({ sort: value }) }>

              <div className="relative w-4 h-4 rounded-full bg-gray-950 flex-center">
                <div className={cn("absolute-center h-4 w-4 rounded-full bg-gray-50 transition-all", {
                  'w-2 h-2': value.toLowerCase() === sort?.toLowerCase()
                })} />
              </div>

              <span className="">
                {label}
              </span>              
    
            </Link>
          </li>
        ))}

      </ul>
    </li>
  );
};
