import React from 'react'
import Link from 'next/link'

function Tags() {
  return (
    <div className='flex rounded-sm h-6  w-full items-center gap-6 bg-[#111318] px-12 text-sm text-white mt-3'> 

    <Link className='hover:text-red-600' href={"/Movies"}>Movies</Link>
    <Link className='hover:text-red-600' href={"/stream"}>Stream</Link>
    <Link className='hover:text-red-600' href={"/events"}>Events</Link>
    <Link className='hover:text-red-600' href={"/sports"}>Sports</Link>
    <Link className='hover:text-red-600' href={"/activities"}>Activities</Link>
    </div>
  )
}

export default Tags