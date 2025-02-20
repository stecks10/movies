export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
}

export interface MovieGridProps {
  movies: Movie[];
}

export interface MovieResponse {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface MovieCardProps {
  title: string;
  posterUrl: string;
  rating?: number;
}
