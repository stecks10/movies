import { MovieGridProps } from "@/types/movie";

interface MovieCardProps {
  title: string;
  posterUrl: string;
  rating?: number;
}

const MovieCard = ({ title, posterUrl, rating }: MovieCardProps) => {
  return (
    <div className="relative group cursor-pointer">
      <div className="overflow-hidden rounded-lg">
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      {rating && (
        <div className="absolute top-2 left-2 bg-black/60 rounded-full p-2">
          <span className="text-white font-medium">{rating}%</span>
        </div>
      )}
      <h3 className="mt-2 text-sm font-medium text-center">{title}</h3>
    </div>
  );
};

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          posterUrl={movie.posterUrl}
          rating={movie.rating}
        />
      ))}
    </div>
  );
}
