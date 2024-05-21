import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

interface Props{
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  outOfStock?: boolean;
  amount: number;
  size?: 'sm' | 'md';
};

export default function Quantity({quantity, setQuantity, outOfStock, amount, size = 'md'}: Props) {
  
  function decrease() {
    if(quantity <= 1 || outOfStock) return;
    
    setQuantity(quantity - 1);
  };

  function increase() {
    if(quantity >= 10 || outOfStock || quantity >= amount) return;
    
    setQuantity(quantity + 1);
  };


  return (
    <div className={cn('flex items-center justify-between bg-gray-100 p-1 rounded-full', {
      'opacity-50': outOfStock,
      'w-32': size === 'md',
      'w-24': size === 'sm'

    })}>

      <button className={cn("flex-center bg-gray-950 shadow-md text-gray-200 transition-all rounded-full", {
        'bg-white cursor-default text-gray-700': quantity <= 1 || outOfStock,
        'w-10 h-6 ': size === 'md',
        'w-7 h-5': size === 'sm'

      })} onClick={decrease}>
        
        <Minus className={ size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>

      <span className="select-none">{outOfStock ? 0 : quantity}</span>
      
      <button className={cn("flex-center bg-gray-950 shadow-md text-gray-200 transition-all rounded-full", {
        'bg-white cursor-default text-gray-700': quantity >= 10 || outOfStock || quantity >= amount,
        'w-10 h-6 ': size === 'md',
        'w-7 h-5': size === 'sm'

      })} onClick={increase}>

        <Plus className={ size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>

    </div>
  );
}
