import { CartItem } from "@/hooks/use-cart";
import { ItemCart } from "..";
import Link from "next/link";
import Image from "next/legacy/image";
import { Media } from "@/payload-types";


import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";



interface Props{
  items: CartItem[];
  status: "error" | "success" | "loading";
  itemsCart: ItemCart[];
};

export default function ItemsCart({ items, status, itemsCart }: Props) {

  return (
    <div className='bg-white shadow-md w-[63%] flex flex-col gap-2 px-5 pt-6\\\'>

      { status !== "success" ?
        <>carregano</>  
      :
        itemsCart?.length ?

          <Table>

            <TableHeader>
              <TableRow>
                <TableHead className="w-2/4">PRODUCT DETAILS</TableHead>
                <TableHead>QUANTITY</TableHead>
                <TableHead>PRICE</TableHead>
                <TableHead className="text-right">TOTAL</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              { itemsCart.map(({product, variation, size, quantity}, i) => {

                return(
                  <TableRow key={i} className="hover:bg-white">
                    <TableCell className="flex">
                      <Link href={`/product/${product.id}?variation=${variation.id}`} className="relative w-24 aspect-[4/3] group bg-white overflow-hidden">
                        <Image src={'/media/'+(variation.images[0].image as Media).filename} alt="COVER" objectFit="contain" layout="fill" className="group-hover:scale-110 transition-all" />
                      </Link>

                      <div className=""></div>

                    </TableCell>
                    
                    <TableCell>vvvvv</TableCell>
                    <TableCell>cccccc</TableCell>
                    <TableCell>llll</TableCell>
                  </TableRow>
                );
              })}

            </TableBody>

          </Table>

          :
          <>não tem nenhum item</>
      }

      <Link href={'/products'} className="font-semibold text-xs text-gray-400 hover:underline my-5">
        CONTINUE SHOPPING
      </Link>

    </div>
  );
};






{/*
<TableCaption>A list of your recent invoices.</TableCaption>
<TableFooter>
  <TableRow>
    <TableCell colSpan={3}>Total</TableCell>
    <TableCell className="text-right">$2,500.00</TableCell>
  </TableRow>
</TableFooter>
<ul className="">
{ itemsCart.map(({product, variation, size, quantity}, i) => {
  return(
    <li key={i} className="flex p-4">
      <Link href={`/product/${product.id}?variation=${variation.id}`} className="block relative w-24 aspect-[4/3]">
        <Image src={'/media/'+(variation.images[0].image as Media).filename} alt="COVER" objectFit="contain" layout="fill"  />
      </Link>
      {product.name}
    </li>
  );
})}
</ul>
 */}