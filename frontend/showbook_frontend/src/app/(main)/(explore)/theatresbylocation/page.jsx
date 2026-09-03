import { cookies } from "next/headers";
import Link from "next/link";

async function getTheatresByLocation() {
    try {
        const cookieStore = await cookies();

        const res = await fetch("http://localhost:5000/api/theatre/get-theaters", {
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            credentials: "include",
        });

        if (!res.ok) {
            console.log("Response status:", res.status);
            throw new Error("Failed to fetch theatres");
        }

        const data = await res.json();
        return data.theaters || [];
    } catch (err) {
        console.log("Unable to fetch theatres by Location", err);
        return [];
    }
}

export default async function theatresByLocation() {
    const theatres = await getTheatresByLocation();

    return (
        <div className="min-h-screen bg-[#08090b] px-6 mt-6 py-12">
            <div className="max-w-5xl mx-auto">

                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>

                        <h1 className="text-sm font-semibold tracking-[0.3em] text-red-500 uppercase">
                            Theatres
                        </h1>
                    </div>

                    <p className="text-2xl font-semibold text-white tracking-tight">
                        Choose your theatre
                    </p>

                    <p className="mt-2 text-sm text-zinc-500">
                        Select a theatre to explore available movies and showtimes
                    </p>
                </div>

                <div className="flex flex-col gap-5">
                    {theatres.map((theatre) => (
                       
                            <div key={theatre._id} className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#111317] px-7 py-6 transition-all duration-300 hover:border-red-500/60 hover:bg-[#15171c] hover:shadow-[0_10px_40px_rgba(239,68,68,0.08)]">

                                <div className="absolute left-0 top-0 h-full w-1 bg-red-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"></div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-white tracking-wide group-hover:text-red-400 transition-colors duration-300">
                                            {theatre.theatreName}
                                        </h2>

                                        <div className="flex items-center gap-2 mt-3">
                                            <span className="text-red-500 text-sm">
                                                ●
                                            </span>

                                            <span className="text-sm text-zinc-500">
                                                {theatre.location}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center w-11 h-11 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-500 group-hover:border-red-500/50 group-hover:text-red-400 transition-all duration-300">
                                        <span className="text-xl">
                                            →
                                        </span>
                                    </div>
                                </div>

                            </div>
                 
                    ))}
                </div>

            </div>
        </div>
    );
}