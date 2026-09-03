"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
export default function HeroCarousel({
  slides = [],
  autoPlayInterval = 2000,
}) {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const timeoutRef = useRef(null);
  const touchStartX = useRef(0);

  const total = slides.length;

  const goTo = useCallback(
    (index) => {
      if (total === 0) return;

      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo(current - 1);
  }, [current, goTo]);

  useEffect(() => {
    if (isHovering || total <= 1) return;

    timeoutRef.current = setTimeout(() => {
      next();
    }, autoPlayInterval);

    return () => clearTimeout(timeoutRef.current);
  }, [current, isHovering, next, autoPlayInterval, total]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff =
      touchStartX.current - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  if (total === 0) return null;

  return (
    <div
      className="relative w-full max-w-[1850px] mx-auto overflow-hidden rounded-2xl bg-black mt-4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0">
        <Image
          src={slides[current].image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110 blur-xl opacity-60"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0  from-black via-black/75 to-black/20" />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/10" />
      </div>

      <div
        className="relative flex transition-transform duration-700 ease-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full"
          >
            <div className="min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex items-center">
              <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-center px-8 md:px-14 lg:px-16 py-12">

                <div className="max-w-3xl text-white">

                  <h1 className="text-lg md:text-3xl lg:text-3xl font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <div className="mt-5 flex items-center gap-3 text-lg md:text-xl font-semibold">
                    {slide.rating && (
                      <>
                        <span className="text-red-500">
                          {slide.rating}
                        </span>

                        <span className="text-white/40">
                          |
                        </span>
                      </>
                    )}

                    <span className="text-white/90">
                      {Array.isArray(slide.genre)
                        ? slide.genre.join(", ")
                        : slide.genre}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-6 max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed text-white/80">
                    {slide.description}
                  </p>

                  {/* Movie details */}
                  <div className="mt-5 flex flex-wrap gap-3">

                    {slide.language && (
                      <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
                        {slide.language}
                      </span>
                    )}

                    {slide.duration && (
                      <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
                        {slide.duration}
                      </span>
                    )}

                  </div>
                  <Link href={slide.link}>
                  <button
                    className="
                      mt-8
                      rounded-xl
                      bg-red-600
                      px-9
                      py-4
                      text-lg
                      font-semibold
                      text-white
                      shadow-lg
                      shadow-red-900/40
                      transition-all
                      duration-300
                      hover:bg-red-700
                      hover:scale-105
                      active:scale-95
                    "
                  >
                    Book Now
                  </button>
                  </Link>
                </div>

                <div className="relative flex justify-center lg:justify-end">

                  <div
                    className="
                      relative
                      w-[260px]
                      sm:w-[290px]
                      md:w-[320px]
                      lg:w-[370px]
                      aspect-[2/3]
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      shadow-2xl
                      shadow-black/70
                    "
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 320px, 370px"
                      className="object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/70 to-transparent" />
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {total > 1 && (
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            z-20
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/50
            text-white
            backdrop-blur-md
            transition-all
            hover:bg-red-600
          "
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {total > 1 && (
        <button
          onClick={next}
          aria-label="Next slide"
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            z-20
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/50
            text-white
            backdrop-blur-md
            transition-all
            hover:bg-red-600
          "
        >
          <ChevronRight size={24} />
        </button>
      )}

      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`
                h-2.5
                rounded-full
                transition-all
                duration-300
                ${
                  i === current
                    ? "w-8 bg-red-600"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}