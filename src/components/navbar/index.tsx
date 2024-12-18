import Logo from "./logo";
import Icons from "./icons";
import NavigationDesktop from "./navigation/Desktop";


export default function Navbar() {

  return(
    <header className="relative z-[40] w-full bg-white flex justify-between items-center px-16 py-6  max-lg:px-8 max-sm:px-4">
      <Logo />
      <NavigationDesktop />
      <Icons />
    </header>
  )
}