'use client';

import { Minus } from 'lucide-react';
import InputRange, { Range } from 'react-input-range';
import 'react-input-range/lib/css/index.css';

interface Props{
  stateMin: number;
  setStateMin: React.Dispatch<React.SetStateAction<number>>;
  stateMax: number;
  setStateMax: React.Dispatch<React.SetStateAction<number>>;
};

export default function PriceFilter({stateMin, setStateMin, stateMax, setStateMax}: Props) {

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
    <li>
      <span className="font-bold text-gray-800">PRICE</span>

      <div className="flex flex-col items-end mt-3 mb-10 board_price_range">

        <div className="flex items-center justify-between gap-2 w-full my-3">

          <div className="relative w-2/5">
            <span className="absolute -top-4 left-0 text-xs font-bold scale-90 text-gray-600">min</span>
            <input id="inputMin" value={stateMin} type="number" className="w-full p-2 text-sm font-bold text-gray-600 border-2 rounded-md border-gray-100 focus:outline-none" onChange={changeInputValue} /> 
          </div>

          <Minus className='w-4 h-4 text-gray-400' />
          
          <div className="relative w-2/5">
            <span className="absolute -top-4 left-0 text-xs font-bold scale-90 text-gray-600">max</span>
            <input id="inputMax" value={stateMax} type="number" className="w-full p-2 text-sm font-bold text-gray-600 border-2 rounded-md border-gray-100 focus:outline-none" onChange={changeInputValue} /> 
          </div>

        </div>

        <div className="w-full px-2">
          <InputRange
            formatLabel={() =>''}
            maxValue={500}
            minValue={0}
            value={{min: stateMin ?? 0, max: stateMax ?? 500}}
            onChange={handlerUpdate}
          />
        </div>

      </div>
    </li>
  );
}
