import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import {getSession} from "../lib/auth.js"
import {LoginButton} from "../components/LoginButton.jsx"
import { DropdownMenuIcons } from "../components/ProfileDropDown.jsx"
async function Navbar() {
  
 
  const session = await getSession()
  const user = session?.user


  return (
    <div className="top-0 mt-0 rounded-sm flex h-14 w-full items-center bg-[#111318]">

      {/* Logo */}
      <div className="flex items-center px-4">
        <Link href="/">
          <Image src="/logo3.png" alt={"Show Book"} width={150} height={40} priority className="h-auto w-auto" />
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="search"
          placeholder="Search for Movies, Events, Place, Sports and Activities"
          className="h-8 w-xl rounded-lg border border-[#292D35] bg-[#1B1E24] p-3 pl-9 text-sm text-[#F5F5F5] placeholder-[#8B909A] outline-none"
        />
      </div>

      {/* Location */}
      <div className="ml-auto px-8 text-white">
        {user ? user.location : 'Choose location'}
      </div>

      {/* Profile */}
      
      <div className="px-8 text-white">
        {user ?(
          <DropdownMenuIcons image={user.image}/>
          ):(<LoginButton/>) }
      </div>

    </div>
  );
}

export default Navbar;