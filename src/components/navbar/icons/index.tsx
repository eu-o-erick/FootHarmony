import Cart from "./cart";
import Messages from "./message";


export default function IconsNavbar() {

  return(
    <div className="w-44 h-14 flex items-center justify-end gap-10 max-lg:w-auto max-lg:ml-8 max-lg:gap-6 max-sm:ml-5 max-sm:gap-5">
      <Messages />
      <Cart />
    </div>
  );
};