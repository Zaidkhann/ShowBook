"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
    MapPin,
    Clock3,
    ChevronRight,
    CalendarDays,
    Film,
} from 'lucide-react'
import Link from 'next/link'
function page() {

    const { movieId } = useParams()

    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(true)

    const getShows = async () => {
        try {
            console.log("Fetching shows for:", movieId)

            const res = await fetch(
                `http://localhost:5000/api/show/getShowsByMovie/${movieId}`,
                {
                    credentials: "include",
                }
            )

            const data = await res.json()

            console.log("SHOW API STATUS:", res.status)
            console.log("SHOW API RESPONSE:", data)

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to fetch shows"
                )
            }

            setShows(data.shows || [])

        } catch (error) {
            console.error("Error fetching shows:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getShows()
    }, [movieId])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0b0c0f] text-white">

                <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center">

                    <div className="flex flex-col items-center">

                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2a2c31] border-t-[#f84464]" />

                        <p className="mt-4 text-sm text-[#8b8d93]">
                            Finding available shows...
                        </p>

                    </div>

                </div>

            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0b0c0f] text-white">

            

            <header className="border-b border-[#202126] bg-[#101114]">

                <div className="mx-auto max-w-6xl px-5 py-7 md:px-8">

                    <div className="flex items-center gap-2">

                        <span className="h-1.5 w-1.5 rounded-full bg-[#f84464]" />

                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f84464]">
                            Showtimes
                        </span>

                    </div>

            

                    <p className="mt-1.5 text-sm text-[#85878d]">
                        Select a theatre and showtime to book your tickets
                    </p>

                </div>

            </header>


   

            <main className="mx-auto max-w-6xl px-5 py-7 md:px-8">

                {shows.length === 0 ? (


                    <div className="flex min-h-95 flex-col items-center justify-center rounded-xl border border-[#22242a] bg-[#111216] px-6 text-center">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1b1d22]">

                            <CalendarDays
                                size={24}
                                className="text-[#707279]"
                            />

                        </div>

                        <h2 className="mt-5 text-lg font-semibold text-[#e8e8ea]">
                            No shows available
                        </h2>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-[#777980]">
                            There are currently no shows scheduled for this
                            movie. Please check again later.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-3">

                        {shows.map((show) => (

                            <article
                                key={show._id}
                                className="group overflow-hidden rounded-xl border border-[#22242a] bg-[#111216] transition-all duration-200 hover:border-[#303238] hover:bg-[#131419]"
                            >

                            

                                <div className="flex flex-col gap-5 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">

                                    <div className="flex items-start gap-4">


                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1b1d22]">

                                            <Film
                                                size={19}
                                                strokeWidth={1.8}
                                                className="text-[#a4a6ac]"
                                            />

                                        </div>



                                        <div>

                                            <h2 className="text-[16px] font-semibold text-[#eeeeef]">
                                                {show.theater.theatreName}
                                            </h2>

                                            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#777980]">

                                                <MapPin
                                                    size={14}
                                                    strokeWidth={1.8}
                                                />

                                                <span>
                                                    {show.theater.location}
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    {/* Movie Name */}

                                    <div className="hidden md:block">

                                        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#55575d]">
                                            Movie
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-[#b7b8bd]">
                                            {show.movie.movieName}
                                        </p>

                                    </div>

                                </div>



                                <div className="border-t border-[#202126]" />



                                <div className="flex flex-col gap-5 px-5 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#191b20]">

                                            <Clock3
                                                size={17}
                                                strokeWidth={1.8}
                                                className="text-[#8d8f96]"
                                            />

                                        </div>

                                        <div>

                                            <p className="text-[11px] uppercase tracking-wider text-[#5f6168]">
                                                Show Time
                                            </p>

                                            <p className="mt-0.5 text-sm font-medium text-[#d7d7da]">
                                                {new Date(show.showAt).toLocaleString()}
                                            </p>

                                        </div>

                                    </div>


                                    <Link href={`/movies/book-ticket/${show.movie._id}/${show.theater._id}`}>
                                    <button

                                        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#f84464] px-7 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#e63d5c] active:scale-[0.98] md:w-auto"
                                    >

                                        Book Tickets

                                        <ChevronRight
                                            size={16}
                                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                                        />

                                    </button>
                                    </Link>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </main>

        </div>
    )
}

export default page