"use client"

import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Link from 'next/link';
import ListItem from './ListItem';


const SHOES = [
  {
    name: 'Shoe Under Armour',
    brand: "Under Armour",
    variations: [
      {
        colors: ['gray'],
        img: '/shoes/D_NQ_NP_929581-MLA51356222200_082022-O.webp',
        price: 130,
        price_offer: null
      },{
        colors: ['lime', 'gray'],
        img: '/shoes/D_NQ_NP_694209-MLA51356202561_082022-O.webp',
        price: 130,
        price_offer: 109
      },
    ]
  },{
    name: 'Shoe Under Armour',
    brand: "Under Armour",
    variations: [
      {
        colors: ['gray'],
        img: '/shoes/D_NQ_NP_929581-MLA51356222200_082022-O.webp',
        price: 130,
        price_offer: null
      },{
        colors: ['lime', 'gray'],
        img: '/shoes/D_NQ_NP_694209-MLA51356202561_082022-O.webp',
        price: 130,
        price_offer: 109
      },
    ]
  },{
    name: 'Shoe Under Armour',
    brand: "Under Armour",
    variations: [
      {
        colors: ['gray'],
        img: '/shoes/D_NQ_NP_929581-MLA51356222200_082022-O.webp',
        price: 130,
        price_offer: null
      },{
        colors: ['lime', 'gray'],
        img: '/shoes/D_NQ_NP_694209-MLA51356202561_082022-O.webp',
        price: 130,
        price_offer: 109
      },
    ]
  },
]


export default function SearchNavbar() {
  const refInput = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');

  const router = useRouter();


  function handlerOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;

    setValue(v);
  }

  function handlerKeyDown(e: React.KeyboardEvent) {
    if(e.code === "Enter") search();
  }

  function clear() {
    (refInput.current as HTMLInputElement).value = '';
    
    setValue('');
  }

  function search() {
    if(!value) {
      (refInput.current as HTMLInputElement).focus()

    } else {
      router.push(`/products?search=`+value)

    };
  }


  return(
    <div className="relative w-96">

      <div className="relative flex items-center border-b-2 border-b-neutral-400">

        <button className='p-2 cursor-pointer opacity-60 hover:opacity-100 transition-all' onClick={search}>
          <Search className='text-gray-700' />
        </button>

        <input
          ref={refInput}
          className="p-2 w-80 focus:outline-none"
          id="search_input"
          placeholder="Search..."
          onChange={handlerOnChange}
          onKeyDown={handlerKeyDown}
          />

        <div
         className={cn("rounded-full bg-gray-50 p-1 cursor-pointer opacity-60 hover:opacity-100 transition-all", {
          "opacity-0 hover:opacity-0 cursor-default": !value
         })}
         onClick={clear}>
          <X className="w-4 h-4 text-gray-700" />
        </div>

      </div>

      <div className={
        cn(
          `
            absolute max-h-72 w-full mt-6 p-3 bg-white top-full shadow-md rounded-sm
            overflow-y-auto overflow-x-hidden opacity-0 scale-75 pointer-events-none transition-all
          `,{
            "opacity-100 scale-100 pointer-events-auto": value
          }
        )}>
        
        <ul>
          { SHOES.map((shoe, i) =>
            <ListItem key={i} shoe={shoe}/>
          )}
        </ul>

        <div className="flex justify-center py-2">
          <Link href={'/products?search='+value} className='text-sm font-semibold opacity-70 hover:opacity-90 hover:underline transition-all'>see more results</Link>
        </div>
      </div>
      

    </div>
  )
}