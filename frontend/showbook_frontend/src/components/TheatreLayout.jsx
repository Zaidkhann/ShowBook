"use client"

import Image from "next/image"
import { useEffect, useState } from "react";

function TheatreLayout({ theaterId, rows, columns }) {

    const totalSeats = rows * columns;

    const [selectedSeat, setSelectedSeat] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);


    const toggleSeat = (seat) => {

        const price = getSeatPrice(seat);

        setSelectedSeat((prev) => {

            const alreadySelected = prev.some(
                (item) => item.seat === seat
            );

            if (alreadySelected) {
                return prev.filter(
                    (item) => item.seat !== seat
                );
            }

            return [
                ...prev,
                {
                    seat: seat,
                    price: price
                }
            ]
        })

    }

    console.log(selectedSeat)

    const getSeatPrice = (seatNumber) => {

        const row = Math.ceil(seatNumber / columns);

        if (row <= 2) {
            return 200;
        }

        if (row === 3) {
            return 300;
        }

        return 400;
    };
    const onProceedPostSeats = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/seat/post-seat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    selectedSeat,
                    theater: theaterId
                })
            }
            )
            const data = await res.json()
            if (!res.ok) {
            console.error("POST SEAT ERROR:", data);
            return;
        }

        console.log("Booked seats posted:", data);
        fetchSeats();
        } catch (error) {
            console.error(error);
            return
        } finally {
            setSelectedSeat([])
            setBookedSeats([])
        }
    }
    const fetchSeats = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/seat/get-seat/${theaterId}`)
            const data = await res.json()
            setBookedSeats(data.map(item => item.seat));
        } catch (error) {
            console.error(error);
            return
        }
    }
    useEffect(() => {
        fetchSeats()
    }, [theaterId])

    const totalPrice = selectedSeat.reduce(
        (total, item) => total + item.price,
        0
    );

    const renderSeats = (startRow, endRow) => {

        return Array.from({
            length: endRow - startRow + 1
        }).map((_, rowIndex) => {

            const actualRow = startRow + rowIndex;

            return (
                <div
                    key={actualRow}
                    className="flex justify-center items-center gap-2 sm:gap-3"
                >

                    {Array.from({
                        length: columns
                    }).map((_, columnIndex) => {

                        const seatNumber =
                            (actualRow - 1) * columns +
                            columnIndex +
                            1;

                        const isSelected = selectedSeat.some(
                            (item) => item.seat === seatNumber
                        );
                        const isBooked = bookedSeats.includes(seatNumber);

                        return (
                            <div
                                key={columnIndex}
                                onClick={() => {
                                    if (!isBooked) {
                                        toggleSeat(seatNumber)
                                    }
                                }
                                }
                                className={`
                                    flex
                                    justify-center
                                    items-center
                                    cursor-pointer
                                    select-none
                                    h-8
                                    w-8
                                    sm:h-9
                                    sm:w-9
                                    rounded-lg
                                    border
                                    text-xs
                                    sm:text-sm
                                    font-semibold
                                    transition-all
                                    duration-200
                                    ease-out

                                    ${isBooked
                                        ? `
        bg-red-900/60
        border-red-700
        text-red-400
        cursor-not-allowed
      `
                                        : isSelected
                                            ? `
            bg-emerald-500
            border-emerald-400
            text-white
            scale-105
            shadow-[0_0_15px_rgba(16,185,129,0.30)]
          `
                                            : `
            bg-slate-800
            border-slate-700
            text-slate-400
            hover:bg-slate-700
            hover:border-slate-500
            hover:text-white
            hover:-translate-y-0.5
          `
                                    }
                                `}
                            >
                                {seatNumber}
                            </div>
                        )
                    })}

                </div>
            )
        })
    }

    return (
        <div className="
            my-10
            w-full
            max-w-5xl
            mx-auto
            rounded-3xl
            border border-slate-800
            bg-[#111318]
            p-6 sm:p-10
            shadow-[0_20px_60px_rgba(0,0,0,0.45)]
            flex flex-col
            items-center
            gap-8
        ">

            <div className="w-full text-center space-y-2">
                <h2 className="
                    text-2xl
                    sm:text-3xl
                    font-bold
                    text-white
                    tracking-tight
                ">
                    Select Your Seats
                </h2>

                <p className="text-sm text-slate-400">
                    Choose your preferred seating category
                </p>
            </div>



            <div className="w-full flex flex-col items-center gap-3">

                <div className="
                    w-[85%]
                    h-[2px]
                    rounded-full
                    bg-gradient-to-r 
                    from-transparent
                    via-slate-500
                    to-transparent
                " />

                <Image
                    className="
                        w-[180px]
                        sm:w-[240px]
                        h-auto
                        opacity-80
                        drop-shadow-[0_8px_15px_rgba(255,255,255,0.08)]
                    "
                    src="/screen.png"
                    alt="All eyes here"
                    width={200}
                    height={50}
                />

                <p className="
                    text-[10px]
                    uppercase
                    tracking-[0.3em]
                    font-semibold
                    text-slate-500
                ">
                    Screen
                </p>

            </div>

            <div className="
                w-full
                overflow-x-auto
                max-w-full
                p-5
                sm:p-8
                rounded-2xl
                bg-[#0c0e12]
                border border-slate-800
                shadow-inner
            ">

                <div className="
                    flex
                    flex-col
                    items-center
                    gap-8
                    min-w-max
                ">

                    <div className="
                        flex
                        flex-col
                        items-center
                        gap-4
                    ">

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">
                            <span className="
                                h-px
                                w-10
                                bg-slate-700
                            " />

                            <span className="
                                text-xs
                                uppercase
                                tracking-[0.25em]
                                font-bold
                                text-slate-400
                            ">
                                Normal
                            </span>

                            <span className="
                                text-xs
                                font-semibold
                                text-slate-600
                            ">
                                ₹200
                            </span>

                            <span className="
                                h-px
                                w-10
                                bg-slate-700
                            " />
                        </div>

                        {renderSeats(1, Math.min(2, rows))}

                    </div>

                    {rows >= 3 && (
                        <div className="
                            flex
                            flex-col
                            items-center
                            gap-4
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">
                                <span className="
                                    h-px
                                    w-10
                                    bg-blue-500/30
                                " />

                                <span className="
                                    text-xs
                                    uppercase
                                    tracking-[0.25em]
                                    font-bold
                                    text-blue-400
                                ">
                                    Executive
                                </span>

                                <span className="
                                    text-xs
                                    font-semibold
                                    text-blue-500/70
                                ">
                                    ₹300
                                </span>

                                <span className="
                                    h-px
                                    w-10
                                    bg-blue-500/30
                                " />
                            </div>

                            {renderSeats(3, 3)}

                        </div>
                    )}

                    {rows >= 4 && (
                        <div className="
                            flex
                            flex-col
                            items-center
                            gap-4
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">
                                <span className="
                                    h-px
                                    w-10
                                    bg-amber-500/30
                                " />

                                <span className="
                                    text-xs
                                    uppercase
                                    tracking-[0.25em]
                                    font-bold
                                    text-amber-400
                                ">
                                    Premium
                                </span>

                                <span className="
                                    text-xs
                                    font-semibold
                                    text-amber-500/70
                                ">
                                    ₹400
                                </span>

                                <span className="
                                    h-px
                                    w-10
                                    bg-amber-500/30
                                " />
                            </div>

                            {renderSeats(4, rows)}

                        </div>
                    )}

                </div>

            </div>

            <div className="
                flex
                items-center
                justify-center
                gap-6
                flex-wrap
                text-xs
                text-slate-400
            ">

                <div className="flex items-center gap-2">
                    <span className="
                        h-4
                        w-4
                        rounded-md
                        bg-slate-800
                        border border-slate-700
                    " />
                    <span>Available</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="
                        h-4
                        w-4
                        rounded-md
                        bg-emerald-500
                        border border-emerald-400
                    " />
                    <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="
        h-4
        w-4
        rounded-md
        bg-red-900/60
        border border-red-700
    " />
                    <span>Booked</span>
                </div>

            </div>

            <div className="
                w-full
                border-t border-slate-800
                pt-6
                flex
                flex-col
                sm:flex-row
                items-center
                justify-between
                gap-5
            ">

                <div className="text-center sm:text-left">

                    <p className="
                        text-xs
                        uppercase
                        tracking-wider
                        text-slate-500
                        font-semibold
                    ">
                        Selected Seats
                    </p>

                    <p className="
                        mt-1
                        text-lg
                        font-bold
                        text-white
                    ">
                        {selectedSeat.length} Seat
                        {selectedSeat.length !== 1 ? "s" : ""}
                    </p>

                </div>
                <div className="w-full flex justify-center">
                    <button
                        onClick={onProceedPostSeats}
                        className="
            w-full
            sm:w-auto
            min-w-[180px]
            px-8
            py-3
            rounded-xl
            bg-red-600
            text-white
            font-semibold
            text-sm
            tracking-wide
            shadow-[0_8px_25px_rgba(220,38,38,0.25)]
            border border-red-500
            transition-all
            duration-200
            hover:bg-red-500
            hover:shadow-[0_10px_30px_rgba(220,38,38,0.35)]
            hover:-translate-y-0.5
            active:translate-y-0
            active:scale-[0.98]
        "
                    >
                        Proceed
                    </button>
                </div>

                <div className="text-center sm:text-right">

                    <p className="
                        text-xs
                        uppercase
                        tracking-wider
                        text-slate-500
                        font-semibold
                    ">
                        Total Price
                    </p>

                    <h2 className="
                        mt-1
                        text-2xl
                        sm:text-3xl
                        font-extrabold
                        text-white
                    ">
                        ₹{totalPrice}
                    </h2>

                </div>

            </div>

        </div>
    )
}

export default TheatreLayout
