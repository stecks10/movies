import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/hooks/theme-provider";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { MovieDetails } from "./pages/MovieDetails";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <main className="container mx-auto">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
