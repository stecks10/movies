import { getMovieDetails } from "@/services/api";
import { Movie } from "@/types/movie";
import { useState, useEffect } from "react";

export const useMovieDetails = (id?: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (id) {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return { movie };
};
