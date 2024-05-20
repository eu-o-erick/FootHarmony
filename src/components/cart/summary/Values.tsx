import { formatPrice } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { ItemCart } from '..';


interface Props{
  itemsCart: ItemCart[];
};

export default function Values({itemsCart}: Props) {

  const [subtotal, setSubtotal] = useState(0);
  const [amount, setAmount] = useState(0);


  useEffect(() => {

    const valueSubtotal = itemsCart.reduce((acc, item) => {
      const value = acc + (item.variation.standard_price ?? item.product.standard_price) * item.quantity;
      
      return value;

    }, 0);

    const valueAmount = itemsCart.reduce((acc, item) => {
      const priceDefault = item.variation.standard_price ?? item.product.standard_price;
      const priceOffer = item.variation.offer?.offer_price ?? item.product.offer?.offer_price;

      const value = acc + (priceOffer ?? priceDefault) * item.quantity;

      return value;

    }, 0);

    setSubtotal(valueSubtotal);
    setAmount(valueAmount);

  }, [itemsCart]);


  return (
    <div className='mx-5 my-2 flex flex-col gap-4'>

      <Item label={'subtotal'} value={subtotal} className='text-sm opacity-80' />
      <Item label={'sales tax'} value={'free'} className='text-sm opacity-80' />
      <Item label={'delivery'} className='text-sm opacity-80' />
      <Item label={'savings'} value={subtotal - amount} className='text-sm opacity-80' />

      <div className="bg-gray-100 flex flex-col gap-2 px-3 py-2 mb-2">
        <Item label={'discount'} value={subtotal - amount} className='text-xs opacity-80' />
        <Item label={'code'} value={0} className='text-xs opacity-80' />
      </div>

      <Item label={'AMOUNT'} value={amount} className='border-b py-3' />

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