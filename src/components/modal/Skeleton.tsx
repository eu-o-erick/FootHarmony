import { Skeleton } from "@/components/ui/skeleton";



export default function SkeletonModal() {

  return(
    <div className="w-full flex flex-col gap-5 pt-8 overflow-hidden">
      <Skeleton className="w-full h-60" />

      <div className="relative flex flex-col gap-3 bg-sgreen-400">
        <Skeleton className="w-2/5 h-10 mb-4" />
        <Skeleton className="w-4/4 h-4" />
        <Skeleton className="w-4/4 h-4" />
        <Skeleton className="w-4/4 h-4 mb-2" />
        <Skeleton className="w-2/5 h-4" />
        <Skeleton className="w-3/5 h-4" />
        <Skeleton className="w-2/6 h-4" />
      </div>
    </div>
  );
};