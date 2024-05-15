import Link from "next/link";
import { ItemCart } from "..";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ItemCartComponent from "./Item";

interface Props{
  status: "error" | "success" | "loading";
  itemsCart: ItemCart[];
};

export default function ItemsCart({ status, itemsCart }: Props) {


  return (
    <div className='bg-white shadow-md w-[63%] flex flex-col gap-2'>
      <h2 className="p-4 mb-4 text-lg font-semibold bg-gray-950 text-gray-200">ORDER</h2>

      <div className="px-4">

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-white">
              <TableHead className="max-w-2/4">Product Details</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            { status !== "success" ?
              // <>carregano</>
              undefined  
            :
              itemsCart?.length ?
            
                itemsCart.map((item, i) =>
                  <ItemCartComponent key={i} item={item} />
                )
              :
              undefined
              // <>não tem nenhum item</>
          }
          </TableBody>

        </Table>
      </div>
  
      <Link href={'/products'} className="font-semibold text-xs text-gray-400 hover:underline m-5 mb-10">
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