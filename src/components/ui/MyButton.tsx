import Link from "next/link";

interface Props {
  children: React.ReactNode;
  className?: string;
  handler?: () => void;
  href?: string;
}

export default function Button({children, className, handler, href}: Props) {


  if(handler) {

    return(
      <button onClick={handler} className={`
        flex-center text-sm !uppercase shadow-md transition-all 
        border-2 border-gray-950 bg-gray-950 text-gray-200 hover:!bg-zinc-900
        ${className}
      `}>
        {children}
      </button>
    );

  } else if(href) {

    return(
      <Link href={href} className={`
        flex-center text-sm shadow-md transition-all 
        border-2 border-gray-950 bg-gray-950 text-gray-200 hover:!bg-zinc-900
        ${className}
      `}>
        {children}
      </Link>
    );
  };
};
