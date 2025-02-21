import { Movie, MovieResponse } from "@/types/movie";
import axios from "axios";

const DEFAULT_POSTER_URL = "../assets/no-poster.png";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

const mapMovieResponseToMovie = (movie: MovieResponse): Movie => ({
  id: movie.id,
  title: movie.title,
  posterUrl: movie.poster_path
    ? `${import.meta.env.VITE_IMAGE_BASE_URL}${movie.poster_path}`
    : DEFAULT_POSTER_URL,
  rating: movie.vote_average ? Math.round(movie.vote_average * 10) : 0,
});

const handleError = (error: unknown, context: string) => {
  console.error(`Error in ${context}:`, error);
  return [];
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await api.get<{ results: MovieResponse[] }>(
      `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    return response.data.results.map(mapMovieResponseToMovie);
  } catch (error) {
    return handleError(error, "searchMovies");
  }
};

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get<{ results: MovieResponse[] }>(
      "/movie/now_playing?language=en-US&page=1"
    );
    return response.data.results.map(mapMovieResponseToMovie);
  } catch (error) {
    return handleError(error, "getMovies");
  }
};

export const getMovieDetails = async (id: string): Promise<Movie> => {
  try {
    const response = await api.get(`/movie/${id}?language=pt-BR`);
    const movie = response.data;

    return {
      id: movie.id,
      title: movie.title,
      original_language: movie.original_language,
      posterUrl: movie.poster_path
        ? `${import.meta.env.VITE_IMAGE_BASE_URL}${movie.poster_path}`
        : DEFAULT_POSTER_URL,
      overview: movie.overview,
      rating: movie.vote_average ?? 0,
      runtime: movie.runtime,
      genres: movie.genres.map((genre: { name: string }) => genre.name),
      budget: movie.budget,
      revenue: movie.revenue,
      production_companies: movie.production_companies.map(
        (company: { name: string }) => company.name
      ),
      production_countries: movie.production_countries.map(
        (country: { name: string }) => country.name
      ),
      tagline: movie.tagline,
      imdb_id: movie.imdb_id,
      popularity: movie.popularity,
      vote_count: movie.vote_count,
      release_date: movie.release_date,
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return {
      id: 0,
      title: "",
      original_language: "",
      posterUrl: DEFAULT_POSTER_URL,
      overview: "",
      rating: 0,
      release_date: "",
      runtime: 0,
      genres: [],
      budget: 0,
      revenue: 0,
      production_companies: [],
      production_countries: [],
      tagline: "",
      imdb_id: "",
      popularity: 0,
      vote_count: 0,
    };
  }
};
