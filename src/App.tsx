import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/hooks/theme-provider";
import { HomePage } from "./pages/HomePage";
import { Header } from "./components/header";
import { MovieDetails } from "./pages/MovieDetails";
import { Footer } from "./components/Footer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <main className="container mx-auto mb-16">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
