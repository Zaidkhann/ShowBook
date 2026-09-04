import HeroCarousel from "@/components/HeroCarousel";
import {fetchMovies} from "@/app/(main)/(explore)/movies/page"
import MovieCard from "@/components/MovieCard";
const slides = [
  {
    id: "1",
    title: "Insidious: Out of the Further",
    image: "/banners/banner1.jpg",
    genre: ["Horror", "Supernatural"],
    rating: "A",
    description:
      "Gemma, a young mother raising her daughter in her childhood home, discovers she can enter a supernatural realm known as The Further.",
    language: "English",
    duration: "1h 38m",
    link:"/movies/6a99bfce124a13bb2e26928a"
  },
  {
  id: "2",
  title: "Mirzapur: The Movie",
  image: "/banners/banner2.jpg",
  genre: ["Action", "Crime"],
  rating: "A",
  description:
    "The world of Mirzapur comes to the big screen as old rivalries, shifting loyalties, and the relentless pursuit of power ignite a new chapter in the battle for the throne.",
  language: "Hindi",
  duration: "2h 10m",
  link:"/movies/6a99c0b1124a13bb2e269290"
},

{
  id: "3",
  title: "Toxic: A Fairy Tale for Grown-ups",
  image: "/banners/banner3.jpg",
  genre: ["Action", "Thriller"],
  rating: "A",
  description:
    "Directed by Geetu Mohandas, this period action drama follows Raya's rise through a dangerous underworld where power comes at a devastating cost. Starring Yash alongside Kiara Advani, Nayanthara, Huma Qureshi and Tara Sutaria.",
  language: "Hindi",
  duration: "2h 30m",
  link:"/movies/6a99c064124a13bb2e26928e"
},

{
  id: "4",
  title: "Spider-Man: Brand New Day",
  image: "/banners/banner4.jpg",
  genre: ["Superhero", "Action"],
  rating: "UA13+",
  description:
    "Four years after No Way Home, Peter lives alone, erased from the lives of those he loves. Fully devoted to protecting New York, mounting pressure triggers a physical evolution that threatens his existence as a powerful new threat emerges.",
  language: "English",
  duration: "2h 15m",
  link:"/movies/6a99be5a124a13bb2e26927d"
},
];

export default async function Home() {
  const {movies} = await fetchMovies()
  return (
    <main className="w-full self-stretch">
      <div className="px-4 py-4">
        <HeroCarousel slides={slides} autoPlayInterval={2000} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {movies.map((movie)=>(
        <div key={movie._id}>
          <MovieCard movie={movie}/>
        </div>
      ))}
      </div>
      
   
    </main>
  );
}