"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Ticket,
  Home,
  Sparkles,
  Popcorn,
  Armchair,
} from "lucide-react";

function BookingSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const movieId = searchParams.get("movieId");
  const theaterId = searchParams.get("theaterId");
  const seats = searchParams.get("seats");
  const amount = searchParams.get("amount");

  const selectedSeats = seats ? seats.split(",") : [];

  return (
    <div className="min-h-screen bg-[#0b0d10] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="bg-[#111318] border border-[#25282e] rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative px-6 md:px-10 pt-10 pb-8 text-center border-b border-[#25282e]">
            <div className="absolute top-5 left-5 text-yellow-400">
              <Sparkles size={22} />
            </div>

            <div className="absolute top-8 right-8 text-yellow-400">
              <Sparkles size={18} />
            </div>

            <div className="mx-auto w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
              <CheckCircle2
                size={48}
                className="text-green-500"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold">
              Payment Successful! 🎉
            </h1>

            <p className="text-gray-400 mt-3 text-base md:text-lg">
              Your movie seats are officially yours.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Congratulations, you successfully converted money into
              popcorn time. 🍿
            </p>
          </div>

          <div className="p-6 md:p-10">
            <div className="bg-[#171a20] border border-[#30343b] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Ticket className="text-red-500" size={24} />
                </div>

                <div>
                  <h2 className="font-semibold text-lg">
                    Your Movie Ticket
                  </h2>

                  <p className="text-sm text-gray-500">
                    Don't lose this. Your future self will thank you.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between gap-5">
                  <span className="text-gray-500">Movie ID</span>
                  <span className="font-medium text-right break-all">
                    {movieId || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between gap-5">
                  <span className="text-gray-500">Theatre ID</span>
                  <span className="font-medium text-right break-all">
                    {theaterId || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-5">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Armchair size={17} />
                    Seats
                  </span>

                  <div className="flex flex-wrap justify-end gap-2">
                    {selectedSeats.length > 0 ? (
                      selectedSeats.map((seat) => (
                        <span
                          key={seat}
                          className="px-3 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium"
                        >
                          {seat}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">
                        No seats
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-dashed border-[#30343b] pt-5 flex justify-between">
                  <span className="text-gray-400">
                    Amount Paid
                  </span>

                  <span className="text-xl font-bold text-green-400">
                    ₹{Number(amount || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-[#211a0d] border border-[#3a2e18] rounded-xl p-5 text-center">
              <div className="flex justify-center mb-2">
                <Popcorn
                  size={28}
                  className="text-yellow-400"
                />
              </div>

              <p className="font-semibold text-yellow-300">
                Important Movie Science 🧪
              </p>

              <p className="text-sm text-gray-400 mt-1">
                You are now legally allowed to ignore spoilers
                and enjoy the movie.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
              <button
                onClick={() => router.push("/")}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[#30343b] bg-[#171a20] hover:bg-[#1d2026] transition font-medium"
              >
                <Home size={19} />
                Back to Movies
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold"
              >
                <Ticket size={19} />
                Print Ticket
              </button>
            </div>

            <p className="text-center text-xs text-gray-600 mt-6">
              Booking confirmed. Now go before someone asks,
              "So... what are we watching?" 😭
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccess;