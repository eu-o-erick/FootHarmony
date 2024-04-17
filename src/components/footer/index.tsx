import { Separator } from "../ui/separator";
import Information from "./Infromations";
import Logo from "./Logo";
import Navigation from "./Navigation";


export default function Footer() {

  return(
    <footer className="flex-center flex-col gap-5 pb-5 bg-white mt-20">
      <Separator className="mb-10" />
      <Information/>
      <Navigation />
      <Logo />
      <p className="font-bold text-sm opacity-60 max-md:text-xs">&copy;2024 ALL RIGHTS RESERVED</p>
    </footer>
  );
};