import { useState, useEffect } from "react";
import { Movie, ApiResponse } from "@/types/movie";
import { getMovies, searchMovies, getMoviesByGenre } from "@/services/api";

export const useMovieFetch = (
  searchQuery: string,
  currentPage: number,
  selectedGenre: number | null
) => {
  const [data, setData] = useState<{ movies: Movie[]; totalPages: number }>({
    movies: [],
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const apiResponse: ApiResponse = searchQuery
          ? await searchMovies(searchQuery, currentPage)
          : selectedGenre !== null
          ? await getMoviesByGenre(selectedGenre, currentPage)
          : await getMovies(currentPage);

        const paginatedMovies = apiResponse.results.slice(0, 10);

        setData({
          movies: paginatedMovies,
          totalPages: apiResponse.total_pages,
        });
      } catch (err) {
        setError("Falha ao carregar filmes. Tente novamente mais tarde.");
        console.error("Error fetching movies:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchData, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, currentPage, selectedGenre]);

  return { ...data, isLoading, error };
};
