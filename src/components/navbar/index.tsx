
import Input from "./Input";
import Logo from "./Logo";


export default function Navbar() {


  return(
    <div className="w-full bg-white h-20 flex justify-between items-center">
      <Logo />
      <Input />
      <div />
    </div>
  )
}