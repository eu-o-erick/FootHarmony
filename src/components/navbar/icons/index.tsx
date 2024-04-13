import Cart from "./cart";
import Messages from "./message";


export default function IconsNavbar() {

  return(
    <div className="w-44 h-14 flex items-center justify-end gap-10">
      <Messages />
      <Cart />
    </div>
  );
};