"use client"
import { useState,useEffect } from "react";
import { useParams } from "next/navigation";
import TheatreLayout from "../../../../../../../components/TheatreLayout.jsx"

function page(){
    const {theaterId} = useParams()
    const [theatre,setTheatre] = useState("")
    const [loading,setLoading] = useState(true)

    const getTheatre = async()=>{
        try{
            console.log(`fetching for theatre ID: ${theaterId}`)

            const res = await fetch(`http://localhost:5000/api/theatre/get-theaterById/${theaterId}`,{
                credentials:"include"
            })
            const data = await res.json()
            if (!res.ok) {
                    throw new Error(
                        data.message || "Failed to fetch theatre"
                    )
                }
            setTheatre(data.theater || null)
        }catch (error) {
            console.error("Error fetching theatre:", error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
            getTheatre()
        }, [theaterId])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0b0c0f] text-white">

                <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center">

                    <div className="flex flex-col items-center">

                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2a2c31] border-t-[#f84464]" />

                        <p className="mt-4 text-sm text-[#8b8d93]">
                            Finding ...
                        </p>

                    </div>

                </div>

            </div>
        )
    }

    return(
        <TheatreLayout theaterId={theaterId} rows={theatre.rows} columns={theatre.columns}/>
    )
}

export default page
