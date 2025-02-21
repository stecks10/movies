import { useEffect, useState } from "react";
import { getMovies } from "./service/api";
import { MovieGrid } from "./components/MovieGrid";
import { ThemeProvider } from "./components/hooks/theme-provider";
import { Movie } from "./types/movie";
import { Header } from "./components/Header";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MovieDetails } from "./page/MovieDetails";

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
      <Router>
        <Header />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<MovieGrid movies={movies} />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
