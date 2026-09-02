"use client"
import Image from "next/image"
function TheatreLayout({rows,columns}){
    
    const totalSeats = rows * columns;
    

    return(
        <div className="border w-auto h-auto p-8 rounded-2xl border-slate-800 flex-col gap-3 items-center justify-center">
        <div className="grid items-center justify-center gap-5 "
        style={{ gridTemplateColumns: `repeat(${columns},1fr)`,gridTemplateRows:`repeat(${rows},1fr)`,rowGap:"3px"}}
         id="layout">
        {Array.from({ length: totalSeats }).map((_,seat)=>(
            <div  key={seat} className="flex justify-center gap-5 items-center cursor-pointer h-8 w-8 border-2 bg-slate-500 rounded-lg">
                {seat+1}
            </div>
        ))}
            </div>
            <div className="flex justify-center items-center mt-32" >
            <Image className="self-center" src = "/screen.png" alt="All eyes here" width={500} height={100}/>
            </div>
        </div>
        
    ) 
}
export default TheatreLayout


