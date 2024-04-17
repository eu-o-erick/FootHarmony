import Logo from "./Logo";
import Search from "./search";
import Icons from "./icons";
import { Separator } from "../ui/separator";

export default function Navbar() {

  return(
    <header className="w-full bg-white flex flex-col ">
      <div className="relative flex justify-between items-center mx-16 my-3 max-lg:justify-end max-lg:mx-8 max-sm:mx-4">
        <Logo />
        <Search />
        <Icons />
      </div>

      <Separator />
    </header>
  )
}