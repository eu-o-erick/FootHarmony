import Button from "@/components/ui/MyButton";
import { Fragment } from "react";
import Link from "next/link";


interface Props{
  query: string | null;
};



export default function Checkout({ query }: Props) {

  return (
    <div className="m-4 mb-6">
      <Button href={`/cart/address${query ? `?product=${query}` : ''}`} className="py-2 mb-2">CHECKOUT</Button>
      
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
