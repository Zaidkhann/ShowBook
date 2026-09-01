"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
export const LoginButton = ()=> {
    const router = useRouter();
    return(
        <Button onClick={()=>{router.push("/login")}} className={"bg-white text-black hover:bg-red-500 hover:text-white rounded-lg w-32 font-bold text-sm"}>Login</Button>
    )
  
}
