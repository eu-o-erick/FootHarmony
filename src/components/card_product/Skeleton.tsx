import { Skeleton } from "../ui/skeleton";



export default function SkeletonCardProduct() {

  return (
    <ul className='flex-center py-8'>

      { [0,1,2,3].map((i) => (
        <li key={i} className="bg-white shadow-lg rounded-md px-2 py-3 w-40 mx-4">
          <Skeleton className="w-full h-32" />
          <Skeleton className="w-12 h-3 my-1" />
          <Skeleton className="w-4/5 h-4 mb-3" />
          <Skeleton className="w-full h-6" />
        </li>
      )) }

    </ul>
  );
};
