import Navbar from "@/components/navbar";
import { colors } from "@/constants/colors";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col m-6">
        { colors.map((color, i) => {
          return(
            <div key={i} className="flex gap-2">
              <div className={"w-6 h-6 shadow-lg "+color.class}>{i}</div>
              <span>{color.label}</span>
            </div>
          )
        }) }
      </div>

    </div>
  );
}
