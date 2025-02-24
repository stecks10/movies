import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onGenreChange: (genreId: number | null) => void;
}

export function SearchBar({ value, onChange, onGenreChange }: SearchBarProps) {
  const [isGenreMenuOpen, setIsGenreMenuOpen] = useState(false);
  const genreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        genreMenuRef.current &&
        !genreMenuRef.current.contains(event.target as Node)
      ) {
        setIsGenreMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGenreSelect = (genreId: number | null) => {
    onGenreChange(genreId);
    setIsGenreMenuOpen(false);
  };

  return (
    <div className="relative w-full max-w-md mx-auto my-6">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Pesquise por filmes"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 h-12 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-400 border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-20 dark:focus:ring-purple-600 dark:focus:border-purple-600 shadow-md hover:shadow-lg"
          />
          <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 flex items-center gap-2">
            <Search size={20} className="text-zinc-400" />
          </div>
        </div>
        <div
          className="p-2 border rounded-md hover:bg-purple-400 cursor-pointer"
          onClick={() => setIsGenreMenuOpen(!isGenreMenuOpen)}
        >
          <SlidersHorizontal
            size={20}
            className="text-black dark:text-white dark:border-purple-400"
            fill="white"
          />
        </div>
      </div>

      {isGenreMenuOpen && (
        <div
          ref={genreMenuRef}
          className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-zinc-800 border rounded-md shadow-lg z-10"
        >
          <select
            onChange={(e) =>
              handleGenreSelect(e.target.value ? Number(e.target.value) : null)
            }
            className="w-full p-2 bg-transparent text-black dark:text-white focus:outline-none"
          >
            <option value="">Todos os Gêneros</option>
            <option value={28}>Ação</option>
            <option value={12}>Aventura</option>
            <option value={16}>Animação</option>
            <option value={35}>Comédia</option>
            <option value={80}>Crime</option>
            <option value={99}>Documentário</option>
            <option value={18}>Drama</option>
            <option value={10751}>Família</option>
            <option value={14}>Fantasia</option>
            <option value={36}>História</option>
            <option value={27}>Terror</option>
            <option value={10402}>Música</option>
            <option value={9648}>Mistério</option>
            <option value={10749}>Romance</option>
            <option value={878}>Ficção Científica</option>
            <option value={10770}>TV Movie</option>
            <option value={53}>Suspense</option>
            <option value={10752}>Guerra</option>
            <option value={37}>Faroeste</option>
          </select>
        </div>
      )}
    </div>
  );
}
