import Button from '@/components/ui/MyButton';
import { sizes } from '@/constants/sizes';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";


interface Props {
  addProduct: () => void;
  outOfStock: boolean;
  product: string;
  variation: string;
  size: number | undefined;
  quantity: number;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Buttons({addProduct, outOfStock, product, variation, size, quantity, setIsError}: Props) {

  const router = useRouter();

  const [state, setState] = useState<'none' | 'load' | 'added'>('none');

  useEffect(() => {
    if(state === 'none') return;

    setTimeout(() => {
      setState('added');

    }, 100)

    setTimeout(() => {
      setState('none');

    }, 2000)

  }, [state]);


  useEffect(() => {
    setState('none');

  }, [size]);



  function handler() {
    if(state !== 'none') return;

    addProduct();

    if(!size) return;

    setState('load');
  };


  function handlerBuy() {
    if(typeof size !== 'number') return setIsError(true);

    const json = {
      product,
      variation,
      size: encodeURIComponent(sizes[size]),
      quantity
    }

    router.push(`/cart?product=${JSON.stringify(json)}`)
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

          <button className='
            flex-center w-full max-w-[25%] h-10 shadow-md font-bold bg-white text-gray-950
            border-2 border-gray-700 opacity-70 hover:opacity-100 transition-all'
            onClick={handlerBuy}>

            BUY
          </button>
        </Fragment>
      :
        <p className="font-bold text-gray-300 flex-center bg-gray-100  w-full h-10">OUT OF STOCK</p>
      }

    </div>
  );
};
