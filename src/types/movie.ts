export interface Movie {
  id: number;
  title: string;
  original_language?: string;
  posterUrl: string;
  rating: number;
  overview?: string;
  release_date?: string;
  runtime?: number;
  genres?: string[];
  budget?: number;
  revenue?: number;
  production_companies?: string[];
  production_countries?: string[];
  tagline?: string;
  imdb_id?: string;
  popularity?: number;
  vote_count?: number;
}

export interface MovieResponse {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface MovieCardProps {
  id: number;
  title: string;
  posterUrl: string;
  rating?: number;
}

export interface ApiResponse {
  results: Movie[];
  total_pages: number;
}
