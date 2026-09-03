import React from 'react'
import { Search } from 'lucide-react'
function SearchNav() {
  return (
    <div className="relative mt-6">
        <Search
          size={20}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="search"
          placeholder="Search for Movies, Events, Place, Sports and Activities"
          className="h-8 w-xl rounded-lg border border-[#292D35] bg-[#1B1E24] p-3 pl-9 text-sm text-[#F5F5F5] placeholder-[#8B909A] outline-none"
        />
      </div>
  )
}

export default SearchNav