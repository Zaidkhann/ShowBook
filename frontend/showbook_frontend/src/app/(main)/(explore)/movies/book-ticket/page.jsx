import { cookies } from "next/headers";
import Link from "next/link"
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
    <div className="flex flex-col mt-8 gap-4">
        {theatres.map((theatre)=>(
            <Link href= {`movies/list-theatres/${theatre._id}`}> <div key={theatre._id} className='border border-white bg-mist-900 p-3 h-12 rounded-sm text-white'>
                <h2>{theatre.theatreName}</h2>
            </div></Link>
        ))}

    </div>
  )

}
