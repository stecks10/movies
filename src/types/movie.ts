export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  rating?: number;
}

export interface MovieGridProps {
  movies: Movie[];
}
