'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';


interface Props{

};

export default function Buttons({}: Props) {

  return (
    <div className='flex gap-4 my-4'>

      <button className="
        uppercase w-full h-10 flex-center gap-2 bg-gray-950 text-gray-200
        border-2 border-gray-950 hover:bg-gray-900 transition-all
      ">
        <ShoppingCart className='w-4 h-4 ' />
        Add to cart
      </button>

      <Link className="
        uppercase !w-[30%] h-10 flex-center gap-2
        border border-gray-950 bg-gray-100 
        hover:bg-white transition-all
      " href={'/'}>
        buy
      </Link>

    </div>
  );
}
