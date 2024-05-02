'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';


interface Props{

};

export default function Buttons({}: Props) {

  return (
    <div className='flex justify-between'>

      <button className="uppercase w-[70%] h-10 flex-center gap-2 bg-gray-950 text-gray-200 r">
        <ShoppingCart className='w-4 h-4 ' />
        Add to cart
      </button>

      <Link className="uppercase w-[28%] h-10 flex-center gap-2 border border-gray-950 bg-gray-100 font-semi/bold" href={'/'}>
        buy
      </Link>

    </div>
  );
}
