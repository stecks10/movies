import { useParams } from "react-router-dom";
import { formatCurrency, formatDate, formatRuntime } from "@/utils/format";
import { useMovieDetails } from "@/hooks/useMovieDetails";

const StatCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-[#1E1D1B] text-white rounded-lg p-4 shadow-lg">
    <p className="font-semibold uppercase text-sm text-gray-400 text-center">
      {title}
    </p>
    <p className="text-lg mt-1 text-center">{children}</p>
  </div>
);

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
        {/* Seção do poster */}
        <div className="relative rounded-lg shadow-lg overflow-hidden">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-auto object-cover rounded-lg transform transition-all duration-300 hover:scale-105"
          />
        </div>

        {/* Seção de informações principais */}
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

        {/* Seção de estatísticas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <StatCard title="Popularidade">{movie.popularity}</StatCard>
          <StatCard title="Votos">{movie.vote_count}</StatCard>

          <div className="flex justify-center items-center">
            <div className="w-20 h-20 border-4 border-yellow-500 rounded-full bg-black shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {movie.rating}%
              </span>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col lg:flex-row gap-4">
            <StatCard title="Lançamento">
              {formatDate(movie.release_date) || "Data não disponível"}
            </StatCard>

            <StatCard title="Duração">
              {movie.runtime
                ? formatRuntime(movie.runtime)
                : "Duração não disponível"}
            </StatCard>
          </div>

          <div className="lg:col-span-3 flex flex-col lg:flex-row gap-4">
            <StatCard title="Situação">
              {(movie.revenue ?? 0) > 0 ? "Lançado" : "Em cartaz"}
            </StatCard>

            <StatCard title="Idioma">
              {movie.original_language
                ? movie.original_language.toUpperCase()
                : "N/A"}
            </StatCard>
          </div>

          <StatCard title="Orçamento">
            {movie.budget ? formatCurrency(movie.budget) : "N/A"}
          </StatCard>

          <StatCard title="Receita">
            {movie.revenue ? formatCurrency(movie.revenue) : "N/A"}
          </StatCard>

          <StatCard title="Lucro">
            {movie.revenue && movie.budget
              ? formatCurrency(movie.revenue - movie.budget)
              : "N/A"}
          </StatCard>
        </div>
      </div>
    </div>
  );
}
