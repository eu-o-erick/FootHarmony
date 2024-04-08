import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import ProductCart from "./ProductCart";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";


export default function Cart({shoes}: {shoes: any[]}) {

  

  return(
    <SheetContent className="flex flex-col justify-between">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      {/* { shoes.length !== 2 ?  */}

      { shoes.length ?

        <>
          <ul className="w-full h-4/5 p-2 flex flex-col gap-5">

            { shoes.map( (item, i) => {
              return(
                <li key={i} className="flex flex-col gap-3">
                  <ProductCart item={item} />

                  <Separator />
                </li>
              )
            }) }
          </ul>

          <Link href={'/'} className="w-5/6 m-auto text-center font-light text-gray-300 p-2 shadow-lg bg-gray-900">
            Checkout
          </Link>
        </>

        :
        <div className="flex items-center justify-center flex-col gap-3 h-4/5 pb-16">

          <ShoppingCart className="w-24 h-24 opacity-60" />
        
          <h2 className="text-lg mb-10 opacity-70">
            Your Cart Is Empty
          </h2>

          <Link href={'/'} className="w-3/4 text-center font-light text-gray-300 p-2 shadow-md bg-gray-900">
            Continue Shopping
          </Link>

        </div>
      }

    </SheetContent>
  )
}