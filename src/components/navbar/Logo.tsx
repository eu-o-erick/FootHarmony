import { cn } from "@/lib/utils"


export default function Logo() {

  return(
    <div className="relative w-44 h-14 max-lg:absolute max-lg:left-0">

      { [0, 1].map((i) => {

        return(
          <h3
            key={i} 
            className={cn(
              "absolute left-0 transform top-2/4 -translate-y-2/4 text-2xl max-sm:text-xl",
              {
                "-mt-1 opacity-30": i === 0,
                "mt-1 ": i === 1,
              }
            )}>FOOTHARMONY</h3>
        )
      
      })}

    </div>
  )
}
// "top-1/3 -translate-y-1/3 opacity-30": i === 0,
// "top-2/3 -translate-y-2/3 ": i === 1,