import { useEffect, useState } from "react";
import { getMovies } from "@/services/api";
import { MovieGrid } from "@/components/MovieGrid";
import { Movie } from "@/types/movie";

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
