"use client"

import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { handleLogout } from "@/app/(auth)/logout/page"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function DropdownMenuIcons({ image }){
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger  className="flex h-8 w-8 items-center justify-center rounded-full outline-none ring-offset-[#111318] transition hover:opacity-80 focus:ring-2 focus:ring-gray-600"  >
      
        {image?(
            <Image
              src={image}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full object-cover"
              alt="Profile"
            />
          ) : 
            (<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#252525]">
              <UserIcon size={18} />
            </div>)}
          
        
        </DropdownMenuTrigger>
      <DropdownMenuContent  align="end"
  sideOffset={8}
  className="w-36 rounded-xl border border-[#303030] bg-[#181818] p-1.5 text-white shadow-xl">
        <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 text-[14px] 
               focus:bg-[#252525] focus:text-white">
          <UserIcon className="mr-1 h-5 w-5"  />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2.5 text-[14px]
               focus:bg-[#252525] focus:text-white">
          <CreditCardIcon className="mr-1 h-5 w-5" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem    className="cursor-pointer rounded-lg px-3 py-2.5 text-[14px]
               focus:bg-[#252525] focus:text-white"
>
          <SettingsIcon className="mr-1 h-5 w-5" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 bg-[#303030]" />
        <DropdownMenuItem onClick={()=>handleLogout(router)}  variant="destructive"  className="cursor-pointer rounded-lg px-3 py-2.5 text-[14px]
               text-red-400 focus:bg-[#252525] focus:text-red-400">
          <LogOutIcon className="mr-1 h-5 w-5"  />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
