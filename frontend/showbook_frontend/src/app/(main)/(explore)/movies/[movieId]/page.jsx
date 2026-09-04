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
import Image from 'next/image'
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

            

            <header className="mt-16 border-b border-[#24252b] bg-[#0b0c0f]">
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">

        <div className="relative overflow-hidden rounded-2xl border border-[#25262c] bg-[#14151a] shadow-2xl">

            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#f84464]/10 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#f84464]/5 blur-3xl" />

            <div className="relative flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:p-6 md:p-7">

                <div className="relative h-48 w-32 shrink-0 overflow-hidden rounded-xl border border-[#35363d] bg-[#1b1d22] shadow-xl">
                    {shows[0]?.movie?.coverImage ? (
                        <Image
                            src={shows[0].movie.coverImage}
                            alt={shows[0].movie.movieName || "Movie"}
                            fill
                            className="object-cover"
                            sizes="128px"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <Film
                                size={30}
                                className="text-[#666870]"
                            />
                        </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                <div className="min-w-0 flex-1">

                    <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f84464] shadow-[0_0_8px_#f84464]" />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f84464]">
                            Now Showing
                        </span>
                    </div>

                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                        {shows[0]?.movie?.movieName}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-2">

                        {shows[0]?.movie?.rating && (
                            <span className="flex items-center gap-1.5 rounded-lg border border-[#383941] bg-[#202126] px-3 py-1.5 text-sm font-semibold text-white">
                                ⭐ {shows[0].movie.rating}
                            </span>
                        )}

                        {shows[0]?.movie?.language && (
                            <span className="rounded-lg border border-[#292a30] bg-[#1b1c21] px-3 py-1.5 text-xs font-medium text-[#b8b9be]">
                                {shows[0].movie.language}
                            </span>
                        )}

                        {shows[0]?.movie?.duration && (
                            <span className="rounded-lg border border-[#292a30] bg-[#1b1c21] px-3 py-1.5 text-xs font-medium text-[#b8b9be]">
                                {shows[0].movie.duration}
                            </span>
                        )}

                    </div>

                    <div className="mt-6 flex items-start gap-3 border-t border-[#292a30] pt-5">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f84464]/10">
                            <CalendarDays
                                size={17}
                                className="text-[#f84464]"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-[#e7e7e9]">
                                Choose your show
                            </p>

                            <p className="mt-1 text-xs leading-5 text-[#777980]">
                                Select a theatre and showtime below to book your tickets
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>

        <div className="flex items-end justify-between pt-8">

            <div>
                <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f84464]" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f84464]">
                        Available Theatres
                    </span>
                </div>

                <h2 className="mt-1.5 text-xl font-bold text-white md:text-2xl">
                    Select a theatre
                </h2>
            </div>

            <span className="hidden text-xs text-[#62646b] sm:block">
                {shows.length} {shows.length === 1 ? "show" : "shows"} available
            </span>

        </div>

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
                                 

                                    <Link href={`/movies/${show.movie._id}/${show.theater._id}?theaterName=${encodeURIComponent(show.theater.theatreName)}&theaterLocation=${show.theater.location}&showTime=${new Date(show.showAt).toLocaleString()}`}>
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