import Link from "next/link";


export default function Logo() {

  return(
    <Link href={'/'} className="relative mt-12 mb-8 group max-md:mb-3">

      <h3 className="text-6xl font-semibold max-md:text-3xl">FOOTHARMONY</h3>

      <h3 className="text-6xl font-semibold opacity-30 absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 group-hover:mt-3 max-sm:group-hover:mt-1.5 max-sm:mt-1.5 max-md:text-3xl transition-all">FOOTHARMONY</h3>

    </Link>
  )
}