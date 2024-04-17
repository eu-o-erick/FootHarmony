"use client";

import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import ListItems from './ListItems';
import Link from 'next/link';



export default function SearchNavbar() {
  const refInput = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');

  const router = useRouter();



  function clear() {
    (refInput.current as HTMLInputElement).value = '';
    setValue('');
  }



  function search() {
    if(!value) {
      (refInput.current as HTMLInputElement).focus();

    } else {
      router.push(`/products?search=`+value)

    };
  }


  return(
    <div className="relative">

      <div className="relative z-10 flex items-center border-b-2 border-b-neutral-400 max-lg:hidden">

        <button className='p-2 cursor-pointer opacity-60 hover:opacity-100 transition-all' onClick={search}>
          <Search className='text-gray-700' />
        </button>

        <input
          ref={refInput}
          className="p-2 w-80 focus:outline-none transition-all"
          autoComplete='off'
          id="search_input"
          placeholder="Search..."
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.code === "Enter" && search()}
          />


        <div className={cn("rounded-full bg-gray-50 p-1 cursor-pointer opacity-60 hover:opacity-100 transition-all", {
            "opacity-0 hover:opacity-0 cursor-default": !value
          })}
          onClick={clear}>
    
          <X className="w-4 h-4 text-gray-700" />
    
        </div>

      </div>

      {/* mobile search */}
      <Link className="flex-center opacity-90 hover:scale-105 hover:opacity-100 transition-all lg:hidden" href="/products">
        <Search />
      </Link>


      <ListItems value={value} />
      
    </div>
  )
}