import { formatPrice } from '@/lib/utils';
import { useState, useEffect } from 'react';


interface Props{

};

export default function Values(props: Props) {

  return (
    <div className='mx-5 my-2 flex flex-col gap-3'>

      <Item label={'subtotal'} value={268} className='text-sm opacity-80' />
      <Item label={'sales tax'} value={'free'} className='text-sm opacity-80' />
      <Item label={'delivery'} className='text-sm opacity-80' />
      <Item label={'savings'} value={-15} className='text-sm opacity-80' />

      <div className="bg-gray-100 flex flex-col gap-2 p-3 mb-2">
        <Item label={'discount'} value={-15} className='text-xs opacity-80' line='bg-gray-300' />
        <Item label={'code'} value={0} className='text-xs opacity-80' line='bg-gray-300' />
      </div>


      <Item label={'total'} value={253} className='border-b py-3' line='' />

    </div>
  );
};



function Item({
  label, value, className, line = 'bg-gray-200'
}: {
  label: string;
  value?: string | number;
  className?: string;
  line?: string;
}) {

  return(
    <div className={"flex items-center gap-2 font-semibold "+className}>
      <h4 className="uppercase text-gray-800 whitespace-nowrap">{label}</h4>

      <div className={"w-full h-px " + line}></div>

      { value !== undefined ? 
        <span className="text-gray-950 whitespace-nowrap">{typeof value === 'string' ? value : formatPrice(value) }</span>
        :
        <div className="min-w-fit w-8 h-0.5 bg-gray-500" />
      }

    </div>
  )
}