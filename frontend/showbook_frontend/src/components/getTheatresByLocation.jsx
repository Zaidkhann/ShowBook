import React from 'react'
import { cookies } from "next/headers";
async function getTheatresByLocation() {
    try{
        const cookieStore = await cookies();
        const res = await fetch("http://localhost:5000/api/theatre/get-theaters",{
            headers:{
                "Content-Type":"application/json",
                Cookie: cookieStore.toString(),
            },
            credentials:"include",
        }
        )
        if (!res.ok) { console.log("Response status:", res.status); throw new Error("Failed to fetch theatres"); }
        const data = await res.json()
        return data.theaters || []
     
 
    }catch(err){
    
        console.log("Unable to fetch theatres by Location ",err)
        return []
    }
}
export default async function theatresByLocation(){
    const theatres = await getTheatresByLocation()


  return (
    <div>
        {theatres.map((theatre)=>(
            <div key={theatre._id} className='border-2 border-white rounded-2xl text-white'>
                <h2>{theatre.theatreName}</h2>
            </div>
        ))}

    </div>
  )

}
