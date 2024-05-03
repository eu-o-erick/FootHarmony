'use client';

import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';


interface Props{
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export default function Quantity({quantity, setQuantity}: Props) {

  return (
    <div className='flex items-center justify-between bg-gray-100 p-1  w-32 rounded-full'>

      <button className={cn("w-10 h-6 flex-center bg-gray-950 shadow-md text-gray-200 transition-all rounded-full", {
        'bg-white cursor-default text-gray-700': quantity <= 1
      })} onClick={() => setQuantity(quantity - 1 < 1 ? 1 : quantity - 1 )}>
        
        <Minus className='w-4 h-4' />
      </button>

      <span className="">{quantity}</span>
      
      <button className={cn("w-10 h-6 flex-center bg-gray-950 shadow-md text-gray-200 transition-all rounded-full", {
        'bg-white cursor-default text-gray-700': quantity >= 10
      })} onClick={() => setQuantity(quantity + 1 > 10 ? 10 : quantity + 1 )}>

        <Plus className='w-4 h-4' />
      </button>

    </div>
  );
}
