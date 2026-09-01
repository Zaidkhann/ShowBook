"use client"
import React from 'react'
import {Button} from "../../../components/ui/button"
import { useRouter } from 'next/navigation'
function dashboard() {
    const router = useRouter()
  return (
    <div>
        <Button onClick={()=>(router.push("/admin/dashboard/upload-movie"))} variant={"default"}>Upload Movie</Button>
    </div>
  )
}

export default dashboard