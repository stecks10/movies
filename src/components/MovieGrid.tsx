import { useState, useCallback, useEffect } from "react";
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
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const { movies, totalPages, isLoading, error } = useMovieFetch(
    searchQuery,
    currentPage,
    selectedGenre
  );

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenre]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleGenreChange = useCallback((genreId: number | null) => {
    setSelectedGenre(genreId);
    setCurrentPage(1);
  }, []);

  return (
    <>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onGenreChange={handleGenreChange}
      />

      <div className="space-y-8 shadow-lg dark:shadow-zinc-800 rounded-lg p-6 bg-[#EBEAF814]">
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
                genre_ids={movie.genre_ids} // Adicione esta linha
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
