import { Skeleton } from "@/components/ui/skeleton";


export default function SkeletonItem() {

  return (
    <li className="flex p-4 w-full">

      <Skeleton className="!w-20 !h-20" />

      <div className="flex flex-col justify-center gap-1.5 w-3/4 pl-5 pr-2">
        <Skeleton className="w-16 h-4" />

        <Skeleton className="w-32 h-6 mb-1" />

        <div className="flex items-center justify-between">
          <Skeleton className="w-20 h-5" />

          <Skeleton className="w-20 h-5" />
        </div>
      </div>
    </li>
  );
};
