import { cn } from "@/lib/utils"


export default function Logo() {

  return(
    <div className="relative min-w-64 h-14">

      { [0, 1].map((i) => {

        return(
          <h3
            key={i} 
            className={cn(
              "absolute left-1/2 transform -translate-x-1/2 text-2xl",
              {
                "top-1/3 -translate-y-1/3 opacity-30": i === 0,
                "top-2/3 -translate-y-2/3": i === 1,
              }
            )}>FOOTHARMONY</h3>
        )
      
      })}

    </div>
  )
}