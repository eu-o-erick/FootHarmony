"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link';
import Item from './Item';
import { useEffect } from 'react';


const SHOES = [
  {
    name: 'Shoe Under Armour',
    brand: "Under Armour",
    variations: [
      {
        primary_color: 'Gray',
        img: '/shoes/D_NQ_NP_929581-MLA51356222200_082022-O.webp',
        price: 130,
        price_offer: null
      },{
        primary_color: 'Green',
        secondary_color: 'Gray',
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
        primary_color: 'Green',
        img: '/shoes/D_NQ_NP_929581-MLA51356222200_082022-O.webp',
        price: 130,
        price_offer: null
      },{
        primary_color: 'Green',
        secondary_color: 'Gray',
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
        primary_color: 'Green',
        secondary_color: 'Gray',
        img: '/shoes/D_NQ_NP_929581-MLA51356222200_082022-O.webp',
        price: 130,
        price_offer: null
      },{
        primary_color: 'Green',
        secondary_color: 'Gray',
        img: '/shoes/D_NQ_NP_694209-MLA51356202561_082022-O.webp',
        price: 130,
        price_offer: 109
      },
    ]
  },
]


interface Props {
  value: string;
}

export default function ListItems({value}: Props) {

  useEffect(() => {
    if(!value) return;

    // query for tRPC

  }, [value]);


  return(
    <div className={
      cn(`
        absolute z-10 w-full mt-6 p-3 bg-white top-full shadow-md opacity-0 scale-75 pointer-events-none transition-all
      `,{
          "opacity-100 scale-100 pointer-events-auto": value,
        }
      )}>
      
      <ul className='max-h-60 overflow-y-auto overflow-x-hidden'>
        { SHOES.map((shoe, i) =>
          <Item key={i} shoe={shoe}/>
        )}
      </ul>

      <div className="flex justify-center py-2">
        <Link href={'/products?search='+value} className='text-sm font-semibold opacity-70 hover:opacity-90 hover:underline transition-all'>see more results</Link>
      </div>
    </div>
  );
};