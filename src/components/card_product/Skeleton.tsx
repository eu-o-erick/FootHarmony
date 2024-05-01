import { Skeleton } from "../ui/skeleton";



export default function SkeletonCardProduct() {

  return (
    <li className="relative flex flex-col justify-between w-full bg-gray-50 shadow-lg border">

      <Skeleton className="w-full aspect-[4/3] bg-white" color="black" />

      <div className="flex flex-col justify-between">
        <div className="px-[5%]">
          <Skeleton className="w-12 h-4 bg-gray-200 my-[2%] max-[500px]:mb-1.5 max-[500px]:h-3.5" />
          <Skeleton className="w-3/5 h-5 bg-gray-300 mb-[4%] max-[500px]:h-[18px]" />
        </div>

        <div className="flex">
          <div className="w-2/4 h-9 bg-gray-300 flex items-center gap-1.5 px-4 max-md:px-2 max-[500px]:gap-1">
            <Skeleton className="w-5 h-5 rounded-full bg-gray-400 max-[500px]:scale-90" />
            <Skeleton className="w-5 h-5 rounded-full bg-gray-400 max-[500px]:scale-90" />
          </div>
      
          <div className="w-2/4 h-9 bg-zinc-500 flex items-center justify-end px-4">
            <Skeleton className="w-12 h-4 bg-zinc-400 my-[2%]" />
          </div>
        </div>
      </div>
    </li>
  );
};
