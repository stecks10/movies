import { useParams } from "react-router-dom";
import { formatCurrency, formatDate, formatRuntime } from "@/utils/format";
import { useMovieDetails } from "@/hooks/useMovieDetails";

const StatCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const value = String(children);
  const isLongValue = value.length > 10;

  return (
    <div
      className="bg-zinc-500 text-white rounded-lg p-4 shadow-lg w-full"
      style={{
        backgroundColor: "rgba(30, 29, 27, 0.8)",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
      }}
    >
      <p className="font-semibold uppercase text-sm text-gray-400 text-center overflow-hidden text-ellipsis">
        {title}
      </p>
      <p
        className={`mt-1 text-center whitespace-nowrap overflow-hidden text-ellipsis ${
          isLongValue ? "text-base" : "text-xl"
        }`}
      >
        {children}
      </p>
    </div>
  );
};

const GenreTag = ({ genre }: { genre: string }) => (
  <span className="bg-[#C150FF2E] text-[#ECD9FA] px-3 py-1 rounded-md text-sm font-semibold">
    {genre}
  </span>
);

export function MovieDetails() {
  const { id } = useParams();
  const { movie } = useMovieDetails(id);

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
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-auto object-cover rounded-lg transform transition-all duration-300 hover:scale-105"
          />
        </div>

        <div className="space-y-6 text-white">
          <h1 className="text-4xl font-extrabold">{movie.title}</h1>

          <div className="bg-[#1E1D1B] rounded-lg p-6 shadow-lg">
            <p>{movie.overview}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <GenreTag key={genre} genre={genre} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <StatCard title="Popularidade">{movie.popularity}</StatCard>
          <StatCard title="Votos">{movie.vote_count}</StatCard>

          <div className="flex justify-center items-center">
            <div
              className="w-20 h-20 rounded-full bg-yellow-300 shadow-2xl flex items-center justify-center"
              style={{
                background: `conic-gradient(
            yellow ${Math.round(movie.rating * 10)}%, 
            transparent ${Math.round(movie.rating * 10)}% 100%
            )`,
                boxShadow: "0 0 10px 5px rgba(255, 223, 0, 0.5)",
              }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-black rounded-full">
                <span className="text-white font-bold">
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
                  : "Duração não disponível"}
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
                  : "Nao informado"}
              </StatCard>
            </div>
          </div>

          <StatCard title="Orçamento">
            {movie.budget ? formatCurrency(movie.budget) : "Nao informado"}
          </StatCard>

          <StatCard title="Receita">
            {movie.revenue ? formatCurrency(movie.revenue) : "Nao informado"}
          </StatCard>

          <StatCard title="Lucro">
            {movie.revenue && movie.budget
              ? formatCurrency(movie.revenue - movie.budget)
              : "Nao informado"}
          </StatCard>
        </div>
      </div>
    </div>
  );
}
