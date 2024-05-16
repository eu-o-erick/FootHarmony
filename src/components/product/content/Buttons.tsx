import Button from '@/components/ui/MyButton';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";


interface Props {
  addProduct: () => void;
  outOfStock: boolean;
  size: number | undefined;
}

export default function Buttons({addProduct, outOfStock, size}: Props) {

  const [state, setState] = useState<'none' | 'load' | 'added'>('none');

  useEffect(() => {
    if(state === 'none') return;

    setTimeout(() => {
      setState('added');

    }, 500)

    setTimeout(() => {
      setState('none');

    }, 3000)

  }, [state]);


  useEffect(() => {
    setState('none');

  }, [size]);



  function handler() {
    addProduct();

    if(state !== 'none' || !size) return;

    setState('load');
  };


  return (
    <div className='flex gap-3 my-4'>

      { !outOfStock ?
        
        <Fragment>
          <Button handler={handler} className='w-full h-10 gap-2'>
            <Fragment>
              { state === 'none' ?
                <>
                  <ShoppingCart className='w-4 h-4' />
                  Add to Cart
                </>
               :
                state === 'load' ?
                  <ClipLoader size={20} color="#eee"/>
                :
                  <span className="font-semibold">Added</span>
              }
            </Fragment>
          </Button>

          <Link href={'/'} className='
            flex-center w-full max-w-[25%] h-10 shadow-md font-bold bg-white text-gray-950
            border-2 border-gray-700 opacity-70 hover:opacity-100 transition-all'>
            BUY
          </Link>
        </Fragment>
      :
        <p className="font-bold text-gray-300 flex-center bg-gray-100  w-full h-10">OUT OF STOCK</p>
      }

    </div>
  );
};
