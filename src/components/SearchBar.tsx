import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-md mx-auto my-6">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Pesquise por filmes"
            className="w-full px-4 py-3 h-12 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-400 border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-20 dark:focus:ring-purple-600 dark:focus:border-purple-600 shadow-md hover:shadow-lg"
          />
          <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 flex items-center gap-2">
            <Search size={20} className="text-zinc-400" />
          </div>
        </div>
        <div className="p-2 border rounded-md hover:bg-purple-400 cursor-pointer">
          <SlidersHorizontal
            size={20}
            className="text-black dark:text-white dark:border-purple-400 "
            fill="white"
          />
        </div>
      </div>
    </div>
  );
}
