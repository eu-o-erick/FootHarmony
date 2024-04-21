import Link from "next/link";

export default function Logo() {

  return(
    <Link href={'/'} className="relative text-2xl font-semibold group flex-center cursor-default max-lg:text-xl">
      <span className="absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 group-hover:mt-1.5 opacity-30 transition-all max-md:mt-1.5">FOOTHARMONY</span>
      <span>FOOTHARMONY</span>
    </Link>
  );
};
