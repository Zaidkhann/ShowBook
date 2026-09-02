

"use client";

import Image from "next/image";
import Link from "next/link";
import {Star, Clock3 } from "lucide-react";

export default function MovieCard({ movie }) {



  return (
    <article className="group w-full max-w-[260px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl">

      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
      
        <Image
          src={movie.coverImage}
          alt={movie.movieName}
          fill
          sizes="(max-width: 640px) 50vw, 260px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Rating */}
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-black/70 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          {movie.rating ?? "N/A"}
        </div>

  

        {/* Hover button */}
        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href={`/movies/${movie._id}`}
            className="block rounded-xl bg-white py-2.5 text-center text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">

        {/* Title */}
        <Link href={`/movies/${movie._id}`}>
          <h2 className="truncate text-[17px] font-semibold text-white transition hover:text-zinc-300">
            {movie.movieName}
          </h2>
        </Link>

        {/* Genre */}
        <p className="mt-1 truncate text-sm text-zinc-400">
          {movie.genre}
        </p>

        {/* Meta */}
        <div className="mt-3 flex items-center gap-3 text-xs text-zinc-500">
          {movie.duration && (
            <span className="flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {movie.duration}
            </span>
          )}

          {movie.language && (
            <span className="rounded-md border border-white/10 px-2 py-1">
              {movie.language}
            </span>
          )}
        </div>

        {/* Book button */}
        <Link
          href={`/movies/book-ticket/${movie._id}`}
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-white py-2.5 text-sm font-semibold text-black transition-all hover:bg-zinc-200 active:scale-[0.98]"
        >
          Book Tickets
        </Link>
      </div>
    </article>
  );
}