import { useEffect, useState } from "react";
import { getMovies } from "@/services/api";
import { Movie } from "@/types/movie";
import { MovieGrid } from "@/components/MovieCard";

export function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await getMovies();
      setMovies(movieData);
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <MovieGrid movies={movies} />
    </div>
  );
}
