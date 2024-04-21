import { Skeleton } from "../ui/skeleton";



export default function SkeletonCardProduct() {

  return (
    <ul className="w-full flex justify-between max-md:flex-wrap max-md:gap-y-5">

      { [0,1,2,3].map((i) => (
        <li key={i} className="
              bg-white shadow-lg rounded-md
              w-60 max-lg:w-48 max-md:w-60 max-sm:w-48 max-[500px]:w-40
              px-5 py-4 max-lg:px-2 max-lg:py-3 max-md:px-5 max-md:py-4 max-sm:px-2 max-sm:py-3
            ">

          <Skeleton className="w-full h-32" />
          <Skeleton className="w-4/5 h-4 my-4" />
          <Skeleton className="w-12 h-3 mb-3" />
          <Skeleton className="w-full h-6" />
        </li>
      )) }

    </ul>
  );
};
