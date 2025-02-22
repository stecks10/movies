import { MovieCardProps } from "@/types/movie";
import { useNavigate } from "react-router-dom";

export const MovieCardGrid = ({
  id,
  title,
  posterUrl,
  rating = 0,
}: MovieCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  const displayTitle = title || "Título não disponível";

  const displayPosterUrl = posterUrl || "../assets/no-poster.png";

  return (
    <div
      onClick={handleClick}
      className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={displayPosterUrl}
          alt={displayTitle}
          className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {rating > 0 && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-center w-20 h-20 border-4 border-yellow-500 rounded-full bg-black/70">
            <span className="text-white font-semibold text-xl">{rating}%</span>
          </div>
        </div>
      )}

      <h3 className="absolute inset-x-0 bottom-4 text-sm font-medium text-center text-white bg-black/70 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {displayTitle}
      </h3>
    </div>
  );
};
