import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import Tags from "./Tags"
import {getSession} from "../lib/auth.js"
import {LoginButton} from "../components/LoginButton.jsx"
import LocationSelector from "../components/LocationSelector.jsx"
import { DropdownMenuIcons } from "../components/ProfileDropDown.jsx"
async function Navbar() {
  
 
  const session = await getSession()
  const user = session?.user


  return (
    <div className="z-50 flex h-14 w-full items-center backdrop-blur-2xl overflow-visible fixed rounded-sm bg-transparent">


      <div className="flex items-center px-4">
        <Link href="/">
          <Image src="/logo3.png" alt={"Show Book"} width={150} height={40} priority className="h-auto w-auto" />
        </Link>
      </div>

     
      
    <Tags/>
     

      
      <div className="flex ml-auto shrink-0 mr-4 gap-6">
        <LocationSelector />
        {user ?(
          <DropdownMenuIcons image={user.image}/>
          ):(<LoginButton/>) }
      </div>
</div>

  );
}

export default Navbar;