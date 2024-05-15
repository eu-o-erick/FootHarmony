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
    <div className='bg-white shadow-md w-[68%] flex flex-col gap-2'>
      <h2 className="p-4 text-lg font-semibold bg-gray-950 text-gray-200">ORDER</h2>

      <div className="px-6">

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-white">
              <TableHead className="max-w-2/4">Product Details</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-end">Amount</TableHead>
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
  
      <Link href={'/products'} className="font-semibold text-xs text-gray-400 hover:underline m-6 mb-10">
        CONTINUE SHOPPING
      </Link>

    </div>
  );
};
