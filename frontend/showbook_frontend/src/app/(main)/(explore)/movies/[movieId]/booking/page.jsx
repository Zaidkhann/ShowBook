"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Smartphone,
  CreditCard,
  Wallet,
  Gift,
  Building2,
  QrCode,
  ChevronRight,
  Pencil,
  CheckCircle2,
} from "lucide-react";
import { sendBookingEmail } from "../../../../../../lib/send-mail";

function Booking() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const seats = searchParams.get("seats");
  const amount = searchParams.get("amount");
  const theaterName = searchParams.get("theaterName");
  const theaterLocation = searchParams.get("theaterLocation");
  const showTime = searchParams.get("showTime");
  const theaterId = searchParams.get("theaterId");
  const movieId = searchParams.get("movieId");
  const [loading ,setLoading] = useState(true)
  const [user,setUser] = useState(null)

  const [movie, setMovie] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("upi");

  const fetchMovie = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/movie/get-movie/${movieId}`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch movie");
      }

      return data.movie;
    } catch (error) {
      console.log("Failed to get movie by id:", error);
      return null;
    }
  };
  const fetchUser = async() =>{
    try{
      const res = await fetch("http://localhost:5000/api/auth/me",{
        credentials:"include",

      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch User");
      }
      return data.user
    }catch (error) {
      console.log("Failed to get User:", error);
      return null;
  }
}

  useEffect(() => {
    const getMovie = async () => {
      const movieData = await fetchMovie();
      setMovie(movieData);
    };
    const getUser = async()=>{
      const userData = await fetchUser();
      setUser(userData)
    }

    if (movieId) {
      getMovie();
    }
    getUser()
  }, [movieId]);

  const selectedSeats = seats ? seats.split(",") : [];
  const ticketPrice = Number(amount) || 0;
  const convenienceFee = Number((ticketPrice * 0.05).toFixed(2));
  const totalAmount = ticketPrice + convenienceFee;


  const paymentOptions = [
    {
      id: "upi",
      name: "UPI",
      icon: Smartphone,
    },
    {
      id: "card",
      name: "Debit/Credit Card",
      icon: CreditCard,
    },
    {
      id: "wallet",
      name: "Mobile Wallet",
      icon: Wallet,
    },
    {
      id: "gift",
      name: "Gift Voucher",
      icon: Gift,
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building2,
    },
  ];

const handlePayment = async () => {
  try {
    setLoading(true);
    await sendBookingEmail({
      email: user?.email,
      userName:user?.username,
      movieName:movie?.movieName,
      seats,
      showTime,
      theaterLocation,
      theaterName,
      
    })

    router.push(
      `/movies/${theaterId}/booking/booking-success?movieId=${movieId}&theaterId=${theaterId}&seats=${seats}&amount=${totalAmount}`
    );
  } catch (err) {
    console.error("EMAIL ERROR:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#0b0d10] text-gray-100">
      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#111318] border-b border-[#25282e]">
        <div className="h-full max-w-7xl mx-auto flex items-center px-6">
          <button
            onClick={() => router.back()}
            className="mr-5 p-2 rounded-full hover:bg-[#1d2026] transition"
          >
            <ArrowLeft size={25} />
          </button>

          <div>
            <h1 className="text-xl md:text-2xl font-semibold">
              {movie?.movieName || "Booking"}
            </h1>

            <p className="text-sm md:text-base text-gray-400 mt-1">
              {theaterName || "Theatre"}{" "}
              {theaterLocation && `| ${theaterLocation}`}{" "}
              {showTime && `| ${showTime}`}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto pt-28 pb-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <section className="bg-[#111318] rounded-xl border border-[#25282e] overflow-hidden">
            <div className="px-7 py-6 border-b border-[#25282e]">
              <h2 className="text-xl font-semibold">Payment options</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-[550px]">
              <div className="border-r border-[#25282e]">
                {paymentOptions.map((option) => {
                  const Icon = option.icon;
                  const active = selectedPayment === option.id;

                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedPayment(option.id)}
                      className={`w-full flex items-center gap-5 px-7 py-6 text-left border-b border-[#25282e] transition ${
                        active
                          ? "bg-[#241416] border-l-2 border-l-red-500"
                          : "hover:bg-[#191c21]"
                      }`}
                    >
                      <Icon
                        size={24}
                        className={
                          active ? "text-red-500" : "text-gray-400"
                        }
                      />

                      <span
                        className={`text-base ${
                          active
                            ? "font-semibold text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {option.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-8">
                {selectedPayment === "upi" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-8">
                      Pay by any UPI App
                    </h3>

                    <div className="border border-[#30343b] bg-[#171a20] rounded-xl p-5 flex items-center justify-between hover:border-[#454a53] transition cursor-pointer">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-lg bg-[#22262d] flex items-center justify-center">
                          <QrCode size={30} />
                        </div>

                        <div>
                          <p className="font-semibold">Scan QR code</p>
                          <p className="text-sm text-gray-500 mt-1">
                            You need to have a registered UPI ID
                          </p>
                        </div>
                      </div>

                      <ChevronRight className="text-gray-400" />
                    </div>
                  </div>
                )}

                {selectedPayment === "card" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-7">
                      Debit/Credit Card
                    </h3>

                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full bg-[#171a20] border border-[#30343b] text-white placeholder:text-gray-500 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM / YY"
                          className="bg-[#171a20] border border-[#30343b] text-white placeholder:text-gray-500 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                        />

                        <input
                          type="text"
                          placeholder="CVV"
                          className="bg-[#171a20] border border-[#30343b] text-white placeholder:text-gray-500 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Card Holder Name"
                        className="w-full bg-[#171a20] border border-[#30343b] text-white placeholder:text-gray-500 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                )}

                {selectedPayment === "wallet" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-5">
                      Mobile Wallets
                    </h3>

                    <div className="border border-[#30343b] bg-[#171a20] rounded-xl p-5">
                      <p className="text-gray-400">
                        Select your preferred wallet on the next step.
                      </p>
                    </div>
                  </div>
                )}

                {selectedPayment === "gift" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-5">
                      Gift Voucher
                    </h3>

                    <input
                      type="text"
                      placeholder="Enter voucher code"
                      className="w-full bg-[#171a20] border border-[#30343b] text-white placeholder:text-gray-500 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                    />
                  </div>
                )}

                {selectedPayment === "netbanking" && (
                  <div>
                    <h3 className="text-xl font-semibold mb-5">
                      Net Banking
                    </h3>

                    <div className="border border-[#30343b] bg-[#171a20] rounded-xl p-5">
                      <p className="text-gray-400">
                        Select your bank to continue.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="bg-[#111318] rounded-xl border border-[#25282e] overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {movie?.movieName || "Movie"}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      {showTime || "Show time"}
                    </p>
                  </div>

                  <span className="text-xl font-semibold">
                    {selectedSeats.length}
                  </span>
                </div>

                <div className="mt-5 space-y-2 text-gray-400 text-sm">
                  <p>
                    {movie?.language || "Movie"}{" "}
                    {movie?.rating && `(${movie.rating})`}
                  </p>

                  <p>
                    Seats:{" "}
                    <span className="font-medium text-white">
                      {selectedSeats.length > 0
                        ? selectedSeats.join(", ")
                        : "No seats selected"}
                    </span>
                  </p>

                  <p>{theaterName || "Theatre"}</p>
                  <p>{theaterLocation || "Location"}</p>
                </div>

                <button
                  onClick={() => router.back()}
                  className="mt-5 flex items-center gap-2 text-red-500 font-medium hover:text-red-400 transition"
                >
                  <Pencil size={15} />
                  Edit
                </button>
              </div>

              <div className="bg-[#241b12] border-t border-[#3a2c1e] p-5">
                <p className="font-semibold">Booking Details</p>

                <p className="text-sm text-gray-400 mt-1">
                  Please verify your movie, theatre and seat details.
                </p>
              </div>
            </div>

            <div className="bg-[#111318] rounded-xl border border-[#25282e] p-6">
              <div className="flex justify-between mb-5">
                <span className="text-gray-400">Ticket(s) price</span>

                <span className="font-medium">
                  ₹{ticketPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between mb-5">
                <span className="text-gray-400">Convenience fee</span>

                <span className="font-medium">
                  ₹{convenienceFee.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-dashed border-[#3a3d44] pt-5 flex justify-between">
                <span className="font-semibold text-lg">Order total</span>

                <span className="font-bold text-lg">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={20} />
              Pay ₹{totalAmount.toFixed(2)}
            </button>

            <p className="text-center text-xs text-gray-500 px-5">
              This is a demo payment. No real money will be charged.
            </p>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Booking;
