import { Header } from "./components/header";
import { ThemeProvider } from "./components/hooks/theme-provider";
import { MovieGrid } from "./components/MovieGrid";

const mockMovies = [
  {
    id: 1,
    title: "movie",
    posterUrl: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    title: "movie2",
    posterUrl: "https://picsum.photos/200/300",
  },
];

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <main className="container mx-auto">
        <MovieGrid movies={mockMovies} />
      </main>
    </ThemeProvider>
  );
}

export default App;
