import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MovieCardProps } from "@/types/movie";
import { RatingBadge } from "./RatingBadge";
import { TitleOverlay } from "./TitleOverlay";

const genreMap: Record<number, string> = {
  28: "Ação",
  12: "Aventura",
  16: "Animação",
  35: "Comédia",
  80: "Crime",
  99: "Documentário",
  18: "Drama",
  10751: "Família",
  14: "Fantasia",
  36: "História",
  27: "Terror",
  10402: "Música",
  9648: "Mistério",
  10749: "Romance",
  878: "Ficção Científica",
  10770: "TV Movie",
  53: "Suspense",
  10752: "Guerra",
  37: "Faroeste",
};

export const MovieCard = ({
  id,
  title,
  posterUrl,
  rating = 0,
  genre_ids = [], // Adicione esta linha
}: MovieCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [posterUrl]);

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  const genres = genre_ids.map((id) => genreMap[id]).join(", ");

  return (
    <div
      onClick={handleClick}
      className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      role="button"
      tabIndex={0}
    >
      <div className="overflow-hidden rounded-lg">
        {posterUrl && !imageError ? (
          <img
            src={posterUrl}
            alt={title || "Título não disponível"}
            className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
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

      <RatingBadge rating={rating} />
      <TitleOverlay title={title} genres={genres} />
    </div>
  );
};
