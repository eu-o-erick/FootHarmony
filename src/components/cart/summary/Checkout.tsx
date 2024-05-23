import Button from "@/components/ui/MyButton";
import { useState } from "react";
import Link from "next/link";
import { ItemCart } from "..";
import { useRouter } from "next/navigation";
import Error from "@/components/Error";


interface Props{
  query: string | null;
  itemsCart: ItemCart[];
};



export default function Checkout({ query, itemsCart }: Props) {

  const router = useRouter();

  const [isError, setIsError] = useState(false);


  function redirect() {
    
    if(query) {
      router.push(`/cart/address?product=${query}`)
      return;
    
    };

    if(itemsCart.length) {
      router.push('/cart/address')
      return;

    };

    setIsError(true);
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
