import { formatPrice } from '@/lib/utils';
import { useState, useEffect } from 'react';


interface Props{
};

export default function Values({}: Props) {

  const [amount, setAmount] = useState(253);
  const [total, setTotal] = useState(253);



  return (
    <div className='mx-5 my-2 flex flex-col gap-4'>

      <Item label={'amount'} value={amount} className='text-sm opacity-80' />
      <Item label={'delivery'} className='text-sm opacity-80' />

      <Item label={'TOTAL'} value={total} className='border-b py-3' />

    </div>
  );
};



function Item({
  label, value, className
}: {
  label: string;
  value?: string | number;
  className?: string;
}) {

  return(
    <div className={"flex items-center justify-between gap-2 font-semibold "+className}>
      <h4 className=" text-gray-800 whitespace-nowrap">{label}</h4>

      { value !== undefined ? 
        <span className="text-gray-950 whitespace-nowrap">{typeof value === 'string' ? value : formatPrice(value) }</span>
        :
        <div className="min-w-fit w-8 h-0.5 bg-gray-500" />
      }

    </div>
  )
}