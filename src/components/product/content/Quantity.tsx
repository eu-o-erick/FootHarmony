'use client';

import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';


interface Props{
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  outOfStock: boolean;
};

export default function Quantity({quantity, setQuantity, outOfStock}: Props) {

  
  function decrease() {
    if(quantity <= 1 || outOfStock) return;
    
    setQuantity(quantity - 1);
  };

  function increase() {
    if(quantity >= 10 || outOfStock) return;
    
    setQuantity(quantity + 1);
  };




  return (
    <div className={cn('flex items-center justify-between bg-gray-100 p-1  w-32 rounded-full', {
      'opacity-50': outOfStock
    })}>

      <button className={cn("w-10 h-6 flex-center bg-gray-950 shadow-md text-gray-200 transition-all rounded-full", {
        'bg-white cursor-default text-gray-700': quantity <= 1 || outOfStock
      })} onClick={decrease}>
        
        <Minus className='w-4 h-4' />
      </button>

      <span className="">{outOfStock ? 0 : quantity}</span>
      
      <button className={cn("w-10 h-6 flex-center bg-gray-950 shadow-md text-gray-200 transition-all rounded-full", {
        'bg-white cursor-default text-gray-700': quantity >= 10 || outOfStock
      })} onClick={increase}>

        <Plus className='w-4 h-4' />
      </button>

    </div>
  );
}
