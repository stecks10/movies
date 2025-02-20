import { useEffect, useState } from "react";
import { getMovies } from "./service/api";
import { MovieGrid } from "./components/MovieGrid";
import { ThemeProvider } from "./components/hooks/theme-provider";
import { Movie } from "./types/movie";
import { Header } from "./components/header";
import { SearchBar } from "./components/SearchBar";
import { PagePagination } from "./components/PagePagination";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await getMovies();
      setMovies(movieData);
    };

    fetchMovies();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <SearchBar />
      <main className="container mx-auto">
        <MovieGrid movies={movies} />
      </main>
      <PagePagination />
    </ThemeProvider>
  );
}

export default App;
