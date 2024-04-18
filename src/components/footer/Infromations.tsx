import { Facebook, Instagram, Mail, Phone } from "lucide-react";


export default function Information() {


  return(
    <div className="flex gap-20 w-full max-w-[1100px] mb-5 px-10 max-sm:flex-col max-sm:gap-10">

      <ul className="flex flex-col gap-2">
        <li className="mb-2 font-semibold text-lg">FOLLOW US</li>
        
        <li className="flex items-center gap-2">
          <Facebook className="w-4 h-4" />
          <a href='https://facebook.com/' target="_blank">FACEBOOK</a> 
        </li>

        <li className="flex items-center gap-2">
          <Instagram className="w-4 h-4" />
          <a href='https://instagram.com/' target="_blank">INSTAGRAM</a> 
        </li>
      </ul>


      <ul className="flex flex-col gap-2">
        <li className="mb-2 font-semibold text-lg">CONTACT US</li>
        
        <li className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <p>COMPANY@GMAIL.COM</p> 
        </li>
        
        <li className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <p>+12 3456789-0000</p> 
        </li>
      </ul>

    </div>
  )
}