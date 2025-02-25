import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectViewport,
} from "@radix-ui/react-select";

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
          className="p-2 border rounded-md hover:bg-purple-500 cursor-pointer dark:hover:bg-purple-400"
          onClick={() => setIsGenreMenuOpen(!isGenreMenuOpen)}
        >
          <SlidersHorizontal
            size={20}
            className="text-black dark:text-white"
            fill="white"
          />
        </div>
      </div>

      {isGenreMenuOpen && (
        <div
          ref={genreMenuRef}
          className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-zinc-800 border rounded-md shadow-lg z-10"
        >
          <Select
            onValueChange={(value) =>
              handleGenreSelect(value ? Number(value) : null)
            }
            open={true}
          >
            <SelectContent className="bg-white dark:bg-zinc-800 text-black dark:text-white border dark:border-zinc-700 rounded-md shadow-lg w-48">
              <SelectViewport className="custom-select-viewport space-y-2 text-center">
                <SelectItem value="28">Ação</SelectItem>
                <SelectItem value="12">Aventura</SelectItem>
                <SelectItem value="16" className=" hover:bg-black-200">
                  Animação
                </SelectItem>
                <SelectItem className="cursor-pointer" value="35">
                  Comédia
                </SelectItem>
                <SelectItem className="cursor-pointer" value="80">
                  Crime
                </SelectItem>
                <SelectItem className="cursor-pointer" value="99">
                  Documentário
                </SelectItem>
                <SelectItem className="cursor-pointer" value="18">
                  Drama
                </SelectItem>
                <SelectItem className="cursor-pointer" value="10751">
                  Família
                </SelectItem>
                <SelectItem className="cursor-pointer" value="14">
                  Fantasia
                </SelectItem>
                <SelectItem className="cursor-pointer" value="36">
                  História
                </SelectItem>
                <SelectItem className="cursor-pointer" value="27">
                  Terror
                </SelectItem>
                <SelectItem className="cursor-pointer" value="10402">
                  Música
                </SelectItem>
                <SelectItem className="cursor-pointer" value="9648">
                  Mistério
                </SelectItem>
                <SelectItem className="cursor-pointer" value="10749">
                  Romance
                </SelectItem>
                <SelectItem className="cursor-pointer" value="878">
                  Ficção Científica
                </SelectItem>
                <SelectItem className="cursor-pointer" value="10770">
                  TV Movie
                </SelectItem>
                <SelectItem className="cursor-pointer" value="53">
                  Suspense
                </SelectItem>
                <SelectItem className="cursor-pointer" value="10752">
                  Guerra
                </SelectItem>
                <SelectItem className="cursor-pointer" value="37">
                  Faroeste
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
