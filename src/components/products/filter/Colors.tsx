'use client';

import { cn } from '../../../lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { colors } from '@/constants/colors';

interface Props{
  color: string | undefined;
  updateQuery: ({}) => string;
};

export default function ColorsFilter({color: colorInQuery, updateQuery}: Props) {

  const [isOpen, setIsOpen] = useState(false);


  function handlerOpen() {
    setIsOpen(!isOpen)
  
  };

  
  return (
    <li className='py-3 border-b border-slate-300'>
      <button className="flex items-center justify-between w-full p-2" onClick={handlerOpen}>
        <span className="text-lg">Colors</span>

        <ChevronDown className={cn('transition-all', {
          'rotate-180': isOpen
        })} />
      </button>

      <ul className={cn("flex justify-between flex-wrap h-0 px-2 gap-2 overflow-hidden", {
        'h-auto  py-2': isOpen
      })}>
      
          
        { colors.map((color, i) => (
            <li key={i}>
              <Link className={cn("flex-center shadow-md rounded-full border-2 border-gray-200 overflow-hidden hover:border-gray-300 transition-all", {
                'border-gray-500 scale-110 hover:border-gray-500 hover:scale-110': color.label.toLowerCase() === colorInQuery?.toLowerCase()
              })} href={ updateQuery({ color: color.label.toLowerCase() }) }>
                
                <div className={"w-7 h-7 "+color.class} />

              </Link>
            </li>
          ))
        }

      </ul>
    </li>
  );
}
