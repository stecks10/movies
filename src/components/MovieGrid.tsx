import { useState, useCallback } from "react";
import { Movie } from "@/types/movie";
import { MovieCard } from "./MovieCard";
import { SkeletonLoader } from "./SkeletonLoader";
import { SearchBar } from "./SearchBar";
import { PagePagination } from "./PagePagination";
import { useMovieFetch } from "@/hooks/useMovieFetch";

interface MovieGridProps {
  initialMovies?: Movie[];
}

export const MovieGrid = ({ initialMovies = [] }: MovieGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { movies, totalPages, isLoading, error } = useMovieFetch(
    searchQuery,
    currentPage
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <div className="space-y-8 shadow-lg dark:shadow-zinc-800 rounded-lg p-6">
        {error && <div className="text-red-500 text-center p-4">{error}</div>}

        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {(movies.length > 0 ? movies : initialMovies).map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                rating={movie.rating}
              />
            ))}
          </div>
        )}

        <PagePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};
