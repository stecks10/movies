import { useState, useEffect } from "react";
import { Movie, ApiResponse } from "@/types/movie";
import { getMovies, searchMovies } from "@/services/api";

export const useMovieFetch = (searchQuery: string, currentPage: number) => {
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
          ? await searchMovies(searchQuery, Math.ceil(currentPage / 2))
          : await getMovies(Math.ceil(currentPage / 2));

        const startIndex = currentPage % 2 === 0 ? 10 : 0;
        const endIndex = startIndex + 10;
        const paginatedMovies = apiResponse.results.slice(startIndex, endIndex);

        setData({
          movies: paginatedMovies,
          totalPages: Math.ceil(apiResponse.total_pages * 2),
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
  }, [searchQuery, currentPage]);

  return { ...data, isLoading, error };
};
