import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ProductCart from "./ProductCart";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export interface TShoesShoppingCart{
  information: {
    variationIndex: number;
    sizeIndex: number; 
  };
  shoe: {
    name: string;
    brand: string;
    variations:{
      primary_color: string;
      secondary_color?: string,
      img: string;
      price: number;
      price_offer?: number;
      stock:{
        size: string
        amount: number;
      }[];
    }[];
  };
};

const shoes: TShoesShoppingCart[] = [
  {
    information: {
      variationIndex: 0,
      sizeIndex: 0 
    },
    shoe: {
      name: 'Shoe Under Armour',
      brand: "Under Armour",
      variations: [
        {
          primary_color: 'Gray',
          img: '/shoes/D_NQ_NP_929581-MLA51356222200_082022-O.webp',
          price: 130,
          price_offer: 119,
          stock: [
            {
              size: '6',
              amount: 9
            },{
              size: '6.5',
              amount: 4
            },{
              size: '7',
              amount: 0
            }
          ]
        },{
          primary_color: 'Gray',
          secondary_color: 'Green',
          img: '/shoes/D_NQ_NP_694209-MLA51356202561_082022-O.webp',
          price: 120,
          stock: [
            {
              size: '6',
              amount: 9
            },{
              size: '6.5',
              amount: 4
            },{
              size: '7',
              amount: 0
            }
          ]
        },{
          primary_color: 'White',
          img: '/shoes/D_NQ_NP_694209-MLA51356202561_082022-O.webp',
          price: 120,
          stock: [
            {
              size: '6',
              amount: 9
            },{
              size: '6.5',
              amount: 4
            },{
              size: '7',
              amount: 0
            }
          ]
        },
      ]
    }
  },{
    information: {
      variationIndex: 0,
      sizeIndex: 0 
    },
    shoe: {
      name: 'Shoe Under Armour',
      brand: "Under Armour",
      variations: [
        {
          primary_color: 'Green',
          secondary_color: 'Gray',
          img: '/shoes/D_NQ_NP_694209-MLA51356202561_082022-O.webp',
          price: 130,
          price_offer: 109,
          stock: [
            {
              size: '6',
              amount: 9
            },{
              size: '6.5',
              amount: 4
            },{
              size: '7',
              amount: 0
            }
          ]
        },
      ]
    }
  }
];



export default function Cart() {

  return(
    <Sheet>
      <SheetTrigger className="relative text-gray-800 flex items-center justify-center opacity-90 hover:scale-105 hover:opacity-100 transition-all">
        <ShoppingCart className="w-7 h-7" />

        <span className="max-w-3.5 h-3 p-2 text-xs font-bold text-center bg-white flex items-center justify-center absolute top-0 left-4 -translate-x-1/2 scale-90">
          {shoes.length}
        </span>
      </SheetTrigger>


      <SheetContent className="flex flex-col justify-between max-[450px]:w-full">
        <SheetHeader>
          <SheetTitle className="p-5 pb-0 text-start">Your Cart</SheetTitle>
        </SheetHeader>

        { shoes.length ?
          <>
            <ul className="w-full h-4/5 p-2 flex flex-col gap-5 !max-w-80 m-auto">

              { shoes.map( (item, i) => {
                return(
                  <li key={i} className="flex flex-col gap-3">
                    <ProductCart item={item} />

                    <Separator />
                  </li>
                )
              }) }
            </ul>

            <Link href="/" className="w-48 h-10 bg-gray-950 text-gray-200 flex-center m-auto shadow-md hover:shadow-lg hover:bg-gray-900 transition-all">
              CHECKOUT
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
    </Sheet>
  )
}