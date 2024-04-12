import { Skeleton } from "@/components/ui/skeleton";



export default function SkeletonMessage() {

  return(
    <div className="w-full flex flex-col gap-5 pb-8">

      { [0, 1].map(i => {

        return(
          <div key={i} className="flex gap-3 p-4">
            <Skeleton className="w-16 h-16" />
      
            <div className="relative flex flex-col gap-3 w-3/4 bg-sgreen-400">
              <Skeleton className="w-3/5 h-5" />
              <Skeleton className="w-4/4 h-4" />
            </div>
          </div>
        )
      })}
    </div>
  );
};