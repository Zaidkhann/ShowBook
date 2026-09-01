import MovieCard from "../../../../components/MovieCard";
import {cookies} from "next/headers"
async function fetchMovies() {
    try {
        const cookieStore = await cookies();
        const res = await fetch("http://localhost:5000/api/movie/get-movie", 
             {
                method: "GET",
                cache: "no-store",
                headers:{
                    Cookie:cookieStore.toString()
                }
            }
        );

        if (!res.ok) {
            return [];
        }
        const data = await res.json()
        return data.movies || [];
    } catch (err) {
        console.error("Error fetching movies:", err);
        return [];
    }
}

export default async function MoviesPage() {
    const movies = await fetchMovies();

    return (
        <div className="mx-auto max-w-7xl px-6 py-10">
            <h1 className="mb-8 text-3xl font-bold text-white">
                Movies
            </h1>

            {movies.length === 0 ? (
                <p className="text-zinc-400">
                    No movies available.
                </p>
            ) : (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}