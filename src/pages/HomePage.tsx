import { useEffect, useState } from "react";
import { getMovies } from "@/services/api";
import { Movie } from "@/types/movie";
import { MovieGrid } from "@/components/MovieGrid";

export function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movieData = await getMovies();
        setMovies(movieData.results.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <MovieGrid initialMovies={movies} />
    </div>
  );
}
