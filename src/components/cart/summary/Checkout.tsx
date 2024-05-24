import Button from "@/components/ui/MyButton";
import { useState } from "react";
import Link from "next/link";
import { ItemCart } from "..";
import { useRouter } from "next/navigation";
import Error from "@/components/Error";


interface Props{
  isBuyMethod: boolean;
  itemsCart: ItemCart[];
};



export default function Checkout({ isBuyMethod, itemsCart }: Props) {

  const router = useRouter();

  const [isError, setIsError] = useState(false);


  function redirect() {
    
    if(!itemsCart.length) return setIsError(true);


    if(isBuyMethod) {
      const { product, variation, size, quantity } = itemsCart[0];

      router.push(`/cart/address?product=${
        JSON.stringify({
          product: product.id,
          variation: variation.id,
          size,
          quantity
        })
      }`);

      return;
    
    };

    router.push('/cart/address');
    
  };

  return (
    <div className="m-4 mb-6">
      <Error label="no products in your cart" isError={isError} setIsError={setIsError} />

      <Button handler={redirect} className="py-2 mb-2 w-full">CHECKOUT</Button>
      
      <p className="font-light text-sm text-gray-500">
        By continuing to Checkout, you are agreeing to our
        <Link href="#" className="underline mx-1 text-gray-950">Terms of Use</Link>
        and
        <Link href="#" className="underline mx-1 text-gray-950">Privacy Policy</Link>
        .
      </p>
    </div>
  );
};
