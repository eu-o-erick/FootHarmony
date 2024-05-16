import Button from '@/components/ui/MyButton';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react';


interface Props {
  addProduct: () => void;
  outOfStock: boolean;
}

export default function Buttons({addProduct, outOfStock}: Props) {

  return (
    <div className='flex gap-3 my-4'>

      { !outOfStock ?
        
        <Fragment>
          <Button handler={addProduct} className='w-full h-10 gap-2'>
            <ShoppingCart className='w-4 h-4' />
            Add to cart
          </Button>

          <Button href={'/'} className='w-full max-w-[25%] h-10 text-gray-950 !border !bg-gray-100 hover:!bg-white hover:!border-2 hover:font-semibold'>
            BUY
          </Button>
        </Fragment>
      :
        <p className="font-bold text-gray-300 flex-center bg-gray-100 shadow-inner w-full h-10">OUT OF STOCK</p>
      
      }


    </div>
  );
}
