import { useParams } from "react-router-dom";
import { formatCurrency, formatDate, formatRuntime } from "@/utils/format";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { useState } from "react";

const StatCard = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  const value = String(children);
  const isLongValue = value.length > 10;

  return (
    <div
      className="bg-zinc-500 text-white rounded-lg p-2 sm:p-4 shadow-lg w-full"
      style={{
        backgroundColor: "rgba(30, 29, 27, 0.8)",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
      }}
    >
      <p className="font-semibold uppercase text-xs sm:text-sm text-gray-400 text-center overflow-hidden text-ellipsis">
        {title}
      </p>
      <p
        className={`mt-1 text-center whitespace-nowrap overflow-hidden text-ellipsis ${
          isLongValue ? "text-sm" : "text-base"
        } sm:${isLongValue ? "text-base" : "text-xl"} ${
          isLongValue ? "leading-tight" : "leading-normal"
        }`}
      >
        {children}
      </p>
    </div>
  );
};

const GenreTag = ({ genre }: { genre: string }) => (
  <span className="bg-[#C150FF2E] dark:text-[#ECD9FA] px-3 py-1 rounded-md text-sm font-semibold text-zinc-900">
    {genre}
  </span>
);

export function MovieDetails() {
  const { id } = useParams();
  const { movie } = useMovieDetails(id);
  const [imageError, setImageError] = useState(false);

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="relative rounded-lg shadow-lg overflow-hidden">
          {movie.posterUrl && !imageError ? (
            <img
              src={movie.posterUrl}
              alt={movie.title || "Título não disponível"}
              className="w-full max-w-[400px] h-auto mx-auto object-cover rounded-lg transform transition-all duration-300 hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-[300px] bg-neutral-200 flex flex-col items-center justify-center text-center p-4">
              <span className="text-gray-400 text-lg font-medium mb-2">
                Imagem não disponível
              </span>
              <span className="text-gray-500 text-sm">
                (Poster não encontrado)
              </span>
            </div>
          )}
        </div>

        <div className="space-y-6 dark:text-white text-zinc-800">
          <h1 className="text-4xl font-extrabold">
            {movie.title || "Título não disponível"}
          </h1>

          <div className="lg:hidden grid grid-cols-3 gap-2">
            <StatCard title="Popularidade">
              {movie.popularity || "Não disponível"}
            </StatCard>
            <StatCard title="Votos">
              {movie.vote_count || "Não disponível"}
            </StatCard>
            <div className="flex justify-center items-center">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-yellow-300 shadow-2xl flex items-center justify-center"
                style={{
                  background: `conic-gradient(
                    yellow ${Math.round(movie.rating * 10)}%, 
                    transparent ${Math.round(movie.rating * 10)}% 100%
                  )`,
                  boxShadow: "0 0 10px 5px rgba(255, 223, 0, 0.5)",
                }}
              >
                <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-full">
                  <span className="text-white font-bold text-xs sm:text-sm">
                    {Math.round(movie.rating * 10)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-zinc-500 text-white rounded-lg p-4 shadow-lg w-full"
            style={{
              backgroundColor: "rgba(30, 29, 27, 0.8)",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
            }}
          >
            <h1 className="text-bold">Sinopse</h1>
            <p>{movie.overview || "Sinopse não disponível"}</p>
          </div>

          <StatCard>
            <div className="flex flex-wrap gap-2">
              {(movie.genres ?? []).length > 0 ? (
                (movie.genres ?? []).map((genre) => (
                  <GenreTag key={genre} genre={genre} />
                ))
              ) : (
                <span className="text-gray-400">Gêneros não disponíveis</span>
              )}
            </div>
          </StatCard>

          <div className="lg:hidden grid grid-cols-2 gap-4">
            <StatCard title="Lançamento">
              {formatDate(movie.release_date) || "Data não disponível"}
            </StatCard>
            <StatCard title="Duração">
              {movie.runtime ? formatRuntime(movie.runtime) : "Não disponível"}
            </StatCard>
            <StatCard title="Situação">
              {(movie.revenue ?? 0) > 0 ? "Lançado" : "Em cartaz"}
            </StatCard>
            <StatCard title="Idioma">
              {movie.original_language
                ? movie.original_language.toUpperCase()
                : "Não informado"}
            </StatCard>
          </div>
          <div className="lg:hidden grid grid-cols-3 gap-4">
            <StatCard title="Orçamento">
              {movie.budget ? formatCurrency(movie.budget) : "Não informado"}
            </StatCard>
            <StatCard title="Receita">
              {movie.revenue ? formatCurrency(movie.revenue) : "Não informado"}
            </StatCard>
            <StatCard title="Lucro">
              {movie.revenue && movie.budget
                ? formatCurrency(movie.revenue - movie.budget)
                : "Não informado"}
            </StatCard>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-4">
          <StatCard title="Popularidade">
            {movie.popularity || "Não disponível"}
          </StatCard>
          <StatCard title="Votos">
            {movie.vote_count || "Não disponível"}
          </StatCard>

          <div className="flex justify-center items-center">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-yellow-300 shadow-2xl flex items-center justify-center"
              style={{
                background: `conic-gradient(
                  yellow ${Math.round(movie.rating * 10)}%, 
                  transparent ${Math.round(movie.rating * 10)}% 100%
                )`,
                boxShadow: "0 0 10px 5px rgba(255, 223, 0, 0.5)",
              }}
            >
              <div className="flex items-center justify-center w-20 h-20 bg-black rounded-full">
                <span className="text-white font-bold text-lg sm:text-xl">
                  {Math.round(movie.rating * 10)}%
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col lg:flex-row gap-4">
            <div className="lg:w-1/2">
              <StatCard title="Lançamento">
                {formatDate(movie.release_date) || "Data não disponível"}
              </StatCard>
            </div>
            <div className="lg:w-1/2">
              <StatCard title="Duração">
                {movie.runtime
                  ? formatRuntime(movie.runtime)
                  : "Não disponível"}
              </StatCard>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col lg:flex-row gap-4">
            <div className="lg:w-1/2">
              <StatCard title="Situação">
                {(movie.revenue ?? 0) > 0 ? "Lançado" : "Em cartaz"}
              </StatCard>
            </div>
            <div className="lg:w-1/2">
              <StatCard title="Idioma">
                {movie.original_language
                  ? movie.original_language.toUpperCase()
                  : "Não informado"}
              </StatCard>
            </div>
          </div>

          <StatCard title="Orçamento">
            {movie.budget ? formatCurrency(movie.budget) : "Não informado"}
          </StatCard>

          <StatCard title="Receita">
            {movie.revenue ? formatCurrency(movie.revenue) : "Não informado"}
          </StatCard>

          <StatCard title="Lucro">
            {movie.revenue && movie.budget
              ? formatCurrency(movie.revenue - movie.budget)
              : "Não informado"}
          </StatCard>
        </div>
      </div>
    </div>
  );
}
