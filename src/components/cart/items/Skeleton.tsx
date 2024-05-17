import { Skeleton } from "@/components/ui/skeleton";
import {TableCell, TableRow } from "@/components/ui/table";



export default function SkeletonCartItem() {


  return (
    <TableRow>

      <TableCell className="flex gap-2 px-0">
        <Skeleton className="w-24 aspect-[4/3]" />

        <div className="flex flex-col gap-1" style={{maxWidth: 'calc(100% - 1px)'}}>
          <Skeleton className="w-32 h-5 mb-1" />

          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-20 h-4" />
          
        </div>

      </TableCell>


      <TableCell>
        <div className="flex-center">
          <Skeleton className="w-28 h-6 rounded-full" />
        </div>
      </TableCell>


      <TableCell>
        <div className="flex-center">
          <Skeleton className="w-16 h-5" />
        </div>
      </TableCell>


      <TableCell>
        <div className="flex justify-end">
          <Skeleton className="w-16 h-5" />
        </div>
      </TableCell>


    </TableRow>
  );
};
