"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function HeroCarousel({ slides = [], autoPlayInterval = 4000 }) {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef(null);

  const total = slides.length;

  const goTo = useCallback(
    (index) => {
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (isHovering || total <= 1) return;
    timeoutRef.current = setTimeout(next, autoPlayInterval);
    return () => clearTimeout(timeoutRef.current);
  }, [current, isHovering, next, autoPlayInterval, total]);

  // Basic swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  if (total === 0) return null;

  return (
    <div
      className="relative w-full max-w-[1800px] mx-auto overflow-hidden rounded-md"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide track */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full p-12 mt-2 flex-shrink-0 h-[140px] sm:h-[200px] md:h-[260px] lg:h-[320px] xl:h-[360px]"
          >
            <Image
              src={slide.image}
              alt={slide.alt || "Banner"}
              fill
              priority={slide.id === slides[0].id}
              className="object-cover rounded-4xl"
              sizes="(max-width: 640px) 100vw, (max-width: 1800px) 90vw, 1800px"
            />
          </div>
        ))}
      </div>

      {/* Left arrow */}
      {total > 1 && (
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                     bg-black/40 hover:bg-black/60 text-white
                     rounded-full p-2 transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Right arrow */}
      {total > 1 && (
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                     bg-black/40 hover:bg-black/60 text-white
                     rounded-full p-2 transition-colors"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}