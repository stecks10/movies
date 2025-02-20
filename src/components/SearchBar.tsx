import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-md mx-auto my-6">
      <Input
        type="text"
        placeholder="Pesquise por filmes"
        className="w-full px-4 py-3 h-12 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-400 border focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-10 dark:focus:ring-purple-600 dark:focus:border-purple-600 shadow-md hover:shadow-lg"
      />
      <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400">
        <Search size={20} fill="white" />
      </div>
    </div>
  );
}
