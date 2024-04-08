import Logo from "./Logo";
import Search from "./search";
import Icons from "./icons";

export default function Navbar() {

  return(
    <div className="w-full bg-white h-20 px-16 flex justify-between items-center">
      <Logo />
      <Search />
      <Icons />
    </div>
  )
}