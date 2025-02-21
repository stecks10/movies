import { useEffect, useState } from "react";
import { getMovies } from "./services/api";
import { MovieGrid } from "./components/MovieGrid";
import { Movie } from "./types/movie";
import { Header } from "./components/Header";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MovieDetails } from "./page/MovieDetails";
import { ThemeProvider } from "./hooks/theme-provider";

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
        <main className="container mx-auto ">
          <Header />
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
