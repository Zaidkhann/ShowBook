"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
export const LoginButton = ()=> {
    const router = useRouter();
    return(
        <Button onClick={()=>{router.push("/login")}} className={"hover:bg-white hover:text-black rounded-lg w-32 font-bold text-sm"}>Login</Button>
    )
  
}
