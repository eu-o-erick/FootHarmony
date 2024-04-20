import Logo from "./Logo";
import Search from "./search";
import Icons from "./icons";
import { Separator } from "../ui/separator";

export default function Navbar() {

  return(
    <header className="w-full bg-white flex justify-between items-center px-16 py-3 max-lg:justify-end max-lg:px-8 max-sm:px-4">
      <Logo />
      <Search />
      <Icons />

    </header>
  )
}