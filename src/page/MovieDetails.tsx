import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "@/service/api";
import { Movie } from "@/types/movie";

export function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (id) {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      }
    };

    fetchMovieDetails();
  }, [id]);

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
              <span
                key={genre}
                className="bg-[#C150FF2E] text-[#ECD9FA] px-3 py-1 rounded-md text-sm font-semibold"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="bg-[#1E1D1B] text-white rounded-lg p-6 shadow-lg">
            <p>
              Popularidade <br />
              {movie.popularity}
            </p>
          </div>

          <div className="bg-[#1E1D1B] text-white rounded-lg p-6 shadow-lg">
            <p>Votos: {movie.vote_count}</p>
          </div>

          <div className="flex items-center justify-center w-16 h-16 border-4 border-yellow-500 rounded-full bg-black/70">
            <span className="text-white font-semibold text-sm">
              {movie.rating}%
            </span>
          </div>

          <div className="bg-[#1E1D1B] text-white rounded-lg p-6 shadow-lg">
            <p>
              Situacao: {(movie.revenue ?? 0) > 0 ? "Lancado" : "Em cartaz"}
            </p>
          </div>

          <div className="bg-[#1E1D1B] text-white rounded-lg p-4 shadow-lg">
            <p>
              Duração <br />
              {movie.runtime} minutos
            </p>
          </div>

          <div className="bg-[#1E1D1B] text-white rounded-lg p-6 shadow-lg">
            <p>Lançamento: {movie.release_date}</p>
          </div>

          <div className="bg-[#1E1D1B] text-white rounded-lg p-6 shadow-lg">
            <p>
              Idioma <br />
              {movie.original_language}
            </p>
          </div>

          <div className="bg-[#1E1D1B] text-white rounded-lg p-6 shadow-lg">
            <p>
              Lucro
              <br />
              {movie.revenue && movie.budget ? movie.revenue - movie.budget : 0}
            </p>
          </div>

          <div className="bg-[#1E1D1B] text-white rounded-lg p-6 shadow-lg">
            <p>
              Receita <br />${movie.revenue}
            </p>
          </div>

          <div className="bg-[#1E1D1B] text-white rounded-lg p-6 shadow-lg">
            <p>
              Orçamento <br />${movie.budget}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
