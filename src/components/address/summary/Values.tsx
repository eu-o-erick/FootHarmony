import { ItemCart } from '@/components/cart';
import { formatPrice, getPriceOffer } from '@/lib/utils';
import { useState, useEffect } from 'react';


interface Props{
  itemsCart: ItemCart[];
};

export default function Values({itemsCart}: Props) {

  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [delivery, setDelivery] = useState(0);


  useEffect(() => {

    const valueAmount = itemsCart.reduce((acc, item) => {
      const priceDefault = item.variation.standard_price ?? item.product.standard_price;
      const priceOffer = getPriceOffer(item.variation, item.product);

      const value = acc + (priceOffer ?? priceDefault) * item.quantity;

      return value;

    }, 0);



    setTotal(valueAmount + delivery);
    setAmount(valueAmount);

  }, [itemsCart]);


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