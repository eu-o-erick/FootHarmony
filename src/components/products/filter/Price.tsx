'use client';

import { cn } from '@/lib/utils';
import { ChevronDown, Minus } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import InputRange, { Range } from 'react-input-range';
import 'react-input-range/lib/css/index.css';

interface Props{
  min_price: string | undefined;
  max_price: string | undefined;
  updateQuery: ({}) => string;
};

export default function Price({min_price, max_price, updateQuery}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [valueMin, setValueMin] = useState(0);
  const [valueMax, setValueMax] = useState(500);

  useEffect(() => {
    const nMin = Number(min_price);
    const nMax = Number(max_price);

    console.log('nMin: ', nMin)
    console.log('nMax: ', nMax)

    if(!isNaN(nMin)) {
      setValueMin(nMin);

    } else {
      setValueMin(0);

    }

    if(!isNaN(nMax)) {
      setValueMax(nMax);

    } else {
      setValueMax(500);

    }


  }, [min_price, max_price]);


  function handlerOpen() {
    setIsOpen(!isOpen)
  
  };

  function handlerUpdate(value: number | Range) {
    const min = (value as Range).min >= 0 ? (value as Range).min : 0;
    const max = (value as Range).max <= 500 ? (value as Range).max : 500;

    setValueMin(min);
    setValueMax(max);
  };

  function changeInputValue(e: React.ChangeEvent<HTMLInputElement>){
    const id = e.target.id;

    const value = (() => {
      const n = Number(e.target.value);

      if(n > 500) {
        return 500;

      } else if(n < 0) {
        return 0;

      } else {
        return n;

      };
    })();

    if(isNaN(value)) return;


    if(id === "inputMin") {
      value > valueMax && setValueMax(value);

      setValueMin(value);

    } else {
      value < valueMin && setValueMin(value);

      setValueMax(value);

    };
  };



  return (
    <li className='py-3 border-b border-slate-300'>
      <button className="flex items-center justify-between w-full p-2" onClick={handlerOpen}>
        <span className="text-lg">Price</span>

        <ChevronDown className={cn('transition-all', {
          'rotate-180': isOpen
        })} />
      </button>

      <div className={cn("flex flex-col items-end h-0 px-2 gap-3 overflow-hidden board_price_range", {
        'h-auto py-2': isOpen
      })}>

        <div className="flex-center gap-2 m-auto my-3">

          <div className="relative">
            <span className="absolute -top-4 left-0 text-xs font-bold scale-90 text-gray-400">min</span>
            <input id="inputMin" value={valueMin} type="number" className="w-16 p-2 text-sm font-bold text-gray-600 border-2 rounded-md border-gray-100 focus:outline-none" onChange={changeInputValue} /> 
          </div>

          <Minus className='w-4 h-4 text-gray-400' />
          
          <div className="relative">
            <span className="absolute -top-4 left-0 text-xs font-bold scale-90 text-gray-400">max</span>
            <input id="inputMax" value={valueMax} type="number" className="w-16 p-2 text-sm font-bold text-gray-600 border-2 rounded-md border-gray-100 focus:outline-none" onChange={changeInputValue} /> 
          </div>

        </div>

        <InputRange
          formatLabel={() =>''}
          maxValue={500}
          minValue={0}
          value={{min: valueMin, max: valueMax}}
          onChange={handlerUpdate}
        />

        <Link href={ updateQuery({ min_price: valueMin, max_price: valueMax }) } className="mt-4 flex-center w-24 h-8 text-sm font-semibold bg-gray-950 text-gray-200">
          Apply
        </Link>

      </div>
    </li>
  );
}
