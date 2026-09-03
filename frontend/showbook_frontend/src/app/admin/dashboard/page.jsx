"use client"
import React from 'react'
import {Button} from "../../../components/ui/button"
import { useRouter } from 'next/navigation'
function dashboard() {
    const router = useRouter()
  return (
    <div>
    <div>
        <Button onClick={()=>(router.push("/admin/dashboard/upload-movie"))} variant={"default"}>Upload Movie</Button>
    </div>
    <div>
        <Button onClick={()=>(router.push("/admin/dashboard/post-theatre"))} variant={"default"}>Post Theatre</Button>
    </div>
    <div>
        <Button onClick={()=>(router.push("/admin/dashboard/upload-show"))} variant={"default"}>Upload Show</Button>
    </div>
    </div>
  )
}

export default dashboard