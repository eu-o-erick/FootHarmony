import ItemFilter from './Item';
import { createURLQueries } from '@/lib/utils';
import { Minus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import InputRange, { Range } from 'react-input-range';
import 'react-input-range/lib/css/index.css';


interface Props{
  query: string;
  min_price: string | undefined;
  max_price: string | undefined;
};


export default function PriceFilter({query, min_price, max_price}: Props) {

  const [stateMin, setStateMin] = useState(0);
  const [stateMax, setStateMax] = useState(500);

  useEffect(() => {
    const min = Number(min_price);
    const max = Number(max_price);

    setStateMin( min && !isNaN(min) && min > 0 && min <= max ? min : 0 );
    setStateMax( max && !isNaN(max) && max > 0 && max >= min ? max : 500 );

  }, []);


  function handlerUpdate(value: number | Range) {
    const min = (value as Range).min >= 0 ? (value as Range).min : 0;
    const max = (value as Range).max <= 500 ? (value as Range).max : 500;

    setStateMin(min);
    setStateMax(max);
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
      value > stateMax && setStateMax(value);

      setStateMin(value);

    } else {
      value < stateMin && setStateMin(value);

      setStateMax(value);

    };
  };



  return (
    <ItemFilter label="Price" using={(min_price && Number(min_price) > 0 ? true : false ) || (max_price && Number(max_price) < 500 ? true : false )}>

      <div className="flex flex-col gap-2 w-44 p-4 board_price_range">

        <div className="flex items-center justify-between gap-2 w-full my-3">

          <div className="relative w-2/5">
            <span className="absolute -top-4 left-0 text-xs font-bold scale-90 text-gray-600">min</span>
            <input id="inputMin" value={stateMin} type="number" className="w-full px-1 py-2 text-xs font-bold text-gray-600 border border-gray-300 bg-gray-50 focus:outline-none" onChange={changeInputValue} /> 
          </div>

          <Minus className='w-4 h-4 text-gray-400' />

          <div className="relative w-2/5">
            <span className="absolute -top-4 left-0 text-xs font-bold scale-90 text-gray-600">max</span>
            <input id="inputMax" value={stateMax} type="number" className="w-full px-1 py-2 text-xs font-bold text-gray-600 border border-gray-300 bg-gray-50 focus:outline-none" onChange={changeInputValue} /> 
          </div>

        </div>

        <div className="w-full px-2">
          <InputRange
            formatLabel={() =>''}
            maxValue={500}
            minValue={0}
            value={{min: stateMin, max: stateMax}}
            onChange={handlerUpdate}
          />
        </div>


        <div className="flex justify-end mt-4">
          <Link href={ createURLQueries(query, { min_price: String(stateMin), max_price: String(stateMax) })} className="text-xs px-4 py-2 shadow-md bg-gray-950 text-gray-200 hover:bg-gray-900 transition-all">
            APPLY
          </Link>
        </div>

      </div>
    </ItemFilter>
  );
};
