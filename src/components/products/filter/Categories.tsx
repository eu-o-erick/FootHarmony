'use client';

import { cn } from '../../../lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { trpc } from '@/trpc/client';
import Link from 'next/link';

interface Props{
  category: string | undefined;
  updateQuery: ({}) => string;
};


export default function CategoriesFilter({category: categoryInQuery, updateQuery}: Props) {

  const { status, data: categories } = trpc.category.useQuery();

  const [isOpen, setIsOpen] = useState(false);


  function handlerOpen() {
    if(status !== 'success' || !categories?.length ) return;
    
    setIsOpen(!isOpen)
  }

  
  return (
    <li className='py-2 border-b border-slate-300'>
      <button className="flex items-center justify-between w-full p-2" onClick={handlerOpen}>
        <span className="text-lg">Categories</span>

        <ChevronDown className={cn('transition-all', {
          'rotate-180': isOpen
        })} />
      </button>

      <ul className={cn("flex flex-col gap-px px-2 h-0 overflow-hidden", {
        'h-auto': isOpen
      })}>
      
        { (status === 'success' && categories?.length ) && 
          
          categories.map((category, i) => (
            <li key={i}>
              <Link className={cn("relative flex-center justify-between font-semibold opacity-50 hover:opacity-70 transition-all", {
                'opacity-100 hover:opacity-100': category.name.toLowerCase() === categoryInQuery?.toLowerCase()
              })} href={ updateQuery({ category: encodeURIComponent(category.name)}) }>
                
                <span className="z-50 bg-white px-2 text-sm">
                  {category.name}
                </span>

                <span className="z-50 bg-white px-2">
                  {category.quantity}
                </span>

                <div className="absolute top-2/4 left-0 translate-y-2/4 w-full h-px bg-gray-300" />
              
              </Link>
            </li>
          ))
        }

        <li  className="flex-center">
          <button className="text-xs mt-2 underline opacity-70 hover:opacity-100 transition-all" onClick={handlerOpen}>
            see less
          </button>
        </li>

      </ul>
    </li>
  );
}
