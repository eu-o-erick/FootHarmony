import Link from "next/link";
import { ItemCart } from "..";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ItemCartComponent from "./Item";
import SkeletonCartItem from "./Skeleton";
import Image from "next/legacy/image";

interface Props{
  status: "error" | "success" | "loading";
  itemsCart: ItemCart[];
};


export default function ItemsCart({ status, itemsCart }: Props) {


  return (
    <div className='bg-white shadow-md w-[65%] flex flex-col gap-2'>
      <h2 className="p-4 text-lg font-semibold bg-gray-950 text-gray-200">ORDER</h2>

      <div className="px-6">

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-white">
              <TableHead className="!w-2/4">Product Details</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-end">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            { (status === "success" && itemsCart?.length) ? 
              itemsCart.map((item, i) =>
                <ItemCartComponent key={i} item={item} />
              )
              :
              undefined
            }

            { status === "loading" ?
              [0, 1, 2].map((i) =>
                <SkeletonCartItem key={i} />
              )
              :
              undefined
            }
          </TableBody>

        </Table>
      </div>

      { (status !== "loading" && !itemsCart?.length) ? 
          <div className="flex-center flex-col py-10">
            <Image src={'/empty-cart.png'} alt="cart-empty" width={200} height={200} className="opacity-70" />
            <p className="text-lg text-gray-400 font-semibold">Your Cart is Empty</p>
          </div>
        :
        undefined
      }

  
      <Link href={'/products'} className="font-semibold text-xs text-gray-400 hover:underline m-6 mb-10">
        CONTINUE SHOPPING
      </Link>

    </div>
  );
};
