"use client"

import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
    Clapperboard,
    Film,
    Building2,
    CalendarDays,
    Clock3,
    ChevronDown,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';


function uploadShow() {

    const [theatres, setTheatres] = useState([])
    const [theatreId, setTheatreId] = useState("")
    const [movieId, setMovieId] = useState("");
    const [movies, setMovies] = useState([])
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const getTheatres = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/theatre/get-Alltheaters", {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
            )

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch theatres");
            }

            setTheatres(data.theaters)
            console.log(data.theaters)

        } catch (error) {
            console.error("Error fetching theatres:", error);
        }
    }

    const getMovies = async () => {
        try {
            const res = await fetch(
                "http://localhost:5000/api/movie/get-movie",
                {
                    method: "GET",
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );

            if (!res.ok) {
                return [];
            }

            const data = await res.json()
            setMovies(data.movies)

        } catch (err) {
            console.error("Error fetching movies:", err);
            return [];
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const showAt = new Date(`${date}T${time}`);

        try {
            const res = await fetch(
                "http://localhost:5000/api/show/post-show",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",

                    body: JSON.stringify({
                        movie: movieId,
                        theater: theatreId,
                        showAt: showAt,
                    })
                }
            )

            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.message || "Failed to create show"
                );

                toast.error("Show Failed")
            }

            toast.success("Show posted successfully")

            setMovieId("");
            setTheatreId("");
            setDate("");
            setTime("");

        } catch (error) {
            console.error("Error creating show:", error);
        }
    };

    useEffect(() => {
        getTheatres();
        getMovies();
    }, []);

    return (

        <div className="min-h-screen w-full bg-[#08090b] px-4 py-8 sm:px-6 lg:px-10">

            <div className="mx-auto max-w-4xl">

                {/* ================= HEADER ================= */}

                <div className="mb-8">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3.5 py-1.5 text-xs font-medium text-slate-400 backdrop-blur-xl">

                        <span className="h-1.5 w-1.5 rounded-full bg-[#ff1f2d] shadow-[0_0_10px_rgba(255,31,45,0.8)]" />

                        Show Management

                    </div>


                    <div className="flex items-center gap-3">

                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Create New Show
                        </h1>

                        <Clapperboard
                            size={30}
                            strokeWidth={1.7}
                            className="text-[#ff1f2d]"
                        />

                    </div>


                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                        Schedule a movie screening by selecting a movie,
                        theatre, date and show time.
                    </p>

                </div>


                {/* ================= MAIN CARD ================= */}

                <form
                    onSubmit={handleSubmit}
                    className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#101114] shadow-2xl shadow-black/50"
                >

                    {/* RED GLOW */}

                    <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-red-600/[0.07] blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-red-600/[0.04] blur-3xl" />


                    {/* ================= CARD HEADER ================= */}

                    <div className="relative border-b border-white/[0.07] px-6 py-6 sm:px-8">

                        <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/[0.08] text-[#ff1f2d]">

                                <Film
                                    size={22}
                                    strokeWidth={1.8}
                                />

                            </div>


                            <div>

                                <h2 className="text-lg font-semibold text-white">
                                    Show Details
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Configure the screening information
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ================= FORM FIELDS ================= */}

                    <div className="relative grid gap-6 px-6 py-7 sm:px-8 lg:grid-cols-2">


                        {/* ================= MOVIE ================= */}

                        <div>

                            <label className="mb-2.5 block text-sm font-medium text-slate-300">
                                Movie
                            </label>

                            <div className="relative">

                                <Film
                                    size={18}
                                    strokeWidth={1.7}
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />


                                <select
                                    value={movieId}
                                    onChange={(e) => setMovieId(e.target.value)}
                                    className="h-14 w-full cursor-pointer appearance-none rounded-2xl border border-white/[0.08] bg-[#181a1f] pl-11 pr-11 text-sm font-medium text-white outline-none transition-all duration-200 hover:border-white/[0.16] focus:border-[#ff1f2d]/60 focus:bg-[#1b1d22] focus:ring-4 focus:ring-[#ff1f2d]/[0.08]"
                                >

                                    <option
                                        value=""
                                        className="bg-[#181a1f] text-slate-500"
                                    >
                                        Select Movie
                                    </option>


                                    {movies.map((movie) => (

                                        <option
                                            key={movie._id}
                                            value={movie._id}
                                            className="bg-[#181a1f] text-white"
                                        >
                                            {movie.movieName}
                                        </option>

                                    ))}

                                </select>


                                <ChevronDown
                                    size={18}
                                    strokeWidth={1.8}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />

                            </div>

                        </div>


                        {/* ================= THEATRE ================= */}

                        <div>

                            <label className="mb-2.5 block text-sm font-medium text-slate-300">
                                Theatre
                            </label>


                            <div className="relative">

                                <Building2
                                    size={18}
                                    strokeWidth={1.7}
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />


                                <select
                                    value={theatreId}
                                    className="h-14 w-full cursor-pointer appearance-none rounded-2xl border border-white/[0.08] bg-[#181a1f] pl-11 pr-11 text-sm font-medium text-white outline-none transition-all duration-200 hover:border-white/[0.16] focus:border-[#ff1f2d]/60 focus:bg-[#1b1d22] focus:ring-4 focus:ring-[#ff1f2d]/[0.08]"
                                    onChange={(e) => setTheatreId(e.target.value)}
                                >

                                    <option
                                        value=""
                                        className="bg-[#181a1f] text-slate-500"
                                    >
                                        Select Theatre
                                    </option>


                                    {theatres.map((theatre) => (

                                        <option
                                            key={theatre._id}
                                            value={theatre._id}
                                            className="bg-[#181a1f] text-white"
                                        >
                                            {theatre.theatreName} - {theatre.location}
                                        </option>

                                    ))}

                                </select>


                                <ChevronDown
                                    size={18}
                                    strokeWidth={1.8}
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />

                            </div>

                        </div>


                        {/* ================= DATE ================= */}

                        <div>

                            <label className="mb-2.5 block text-sm font-medium text-slate-300">
                                Show Date
                            </label>


                            <div className="relative">

                                <CalendarDays
                                    size={18}
                                    strokeWidth={1.7}
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />


                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="h-14 w-full rounded-2xl border border-white/[0.08] bg-[#181a1f] px-11 text-sm font-medium text-white outline-none transition-all duration-200 hover:border-white/[0.16] focus:border-[#ff1f2d]/60 focus:bg-[#1b1d22] focus:ring-4 focus:ring-[#ff1f2d]/[0.08] [color-scheme:dark]"
                                />

                            </div>

                        </div>


                        {/* ================= TIME ================= */}

                        <div>

                            <label className="mb-2.5 block text-sm font-medium text-slate-300">
                                Show Time
                            </label>


                            <div className="relative">

                                <Clock3
                                    size={18}
                                    strokeWidth={1.7}
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                />


                                <input
                                    type="time"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    className="h-14 w-full rounded-2xl border border-white/[0.08] bg-[#181a1f] px-11 text-sm font-medium text-white outline-none transition-all duration-200 hover:border-white/[0.16] focus:border-[#ff1f2d]/60 focus:bg-[#1b1d22] focus:ring-4 focus:ring-[#ff1f2d]/[0.08] [color-scheme:dark]"
                                />

                            </div>

                        </div>

                    </div>


                    {/* ================= FOOTER ================= */}

                    <div className="relative flex flex-col gap-5 border-t border-white/[0.07] bg-white/[0.015] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">


                        {/* STATUS */}

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/[0.08]">

                                <CheckCircle2
                                    size={18}
                                    strokeWidth={1.7}
                                    className="text-[#ff1f2d]"
                                />

                            </div>


                            <div>

                                <p className="text-xs font-medium text-slate-300">
                                    Ready to schedule
                                </p>

                                <p className="mt-0.5 text-[11px] text-slate-600">
                                    The show will be added to your schedule
                                </p>

                            </div>

                        </div>


                        {/* SUBMIT BUTTON */}

                        <button
                            type="submit"
                            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#ff1f2d] px-7 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff3340] hover:shadow-red-500/30 active:translate-y-0"
                        >

                            <span>
                                Post Show
                            </span>


                            <ArrowRight
                                size={17}
                                strokeWidth={2}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />

                        </button>

                    </div>

                </form>

            </div>

        </div>
    )
}

export default uploadShow