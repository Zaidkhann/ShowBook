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
<div className="fixed top-0 left-0 right-0 z-50 flex h-14 w-full items-center overflow-visible rounded-sm bg-transparent backdrop-blur-2xl">
    <div className="flex shrink-0 items-center px-4">
        <Link href="/">
            <Image
                src="/logo3.png"
                alt="Show Book"
                width={150}
                height={40}
                priority
                className="h-auto w-27.5 md:w-auto"
            />
        </Link>
    </div>

    <div className="min-w-0 mr-4 md:mr-0 flex-1 overflow-x-auto scrollbar-hide">
        <Tags />
    </div>

    <div className="ml-auto flex shrink-0 items-center mr-3 gap-2 md:mr-4 md:gap-6">

        <div className="hidden md:flex">
            <LocationSelector />
        </div>

        {user ? (
            <DropdownMenuIcons image={user.image} />
        ) : (
            <LoginButton />
        )}

    </div>

</div>

  );
}

export default Navbar;