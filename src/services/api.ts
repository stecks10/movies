import { ApiResponse, Movie, MovieResponse } from "@/types/movie";
import axios from "axios";

const DEFAULT_POSTER_URL = "../assets/no-poster.png";

const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const VITE_IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

if (!VITE_TMDB_TOKEN || !VITE_BASE_URL || !VITE_IMAGE_BASE_URL) {
  throw new Error("Variáveis de ambiente não definidas corretamente.");
}

const api = axios.create({
  baseURL: VITE_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
  },
});

const mapMovieResponseToMovie = (movie: MovieResponse): Movie => ({
  id: movie.id,
  title: movie.title,
  posterUrl: movie.poster_path
    ? `${VITE_IMAGE_BASE_URL}${movie.poster_path}`
    : DEFAULT_POSTER_URL,
  rating: movie.vote_average ? Math.round(movie.vote_average * 10) : 0,
  genre_ids: movie.genre_ids,
});

const handleError = (error: unknown, context: string): ApiResponse => {
  console.error(`Error in ${context}:`, error);
  return { results: [], total_pages: 1 };
};

const saveToCache = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getFromCache = <T>(key: string): T | null => {
  const cachedData = localStorage.getItem(key);
  return cachedData ? JSON.parse(cachedData) : null;
};

export const getMovies = async (page: number = 1): Promise<ApiResponse> => {
  const cacheKey = `getMovies_${page}`;

  const cachedData = getFromCache<ApiResponse>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await api.get<{
      results: MovieResponse[];
      total_pages: number;
    }>(`/movie/now_playing?language=en-US&page=${page}`);

    const data: ApiResponse = {
      results: response.data.results.slice(0, 10).map(mapMovieResponseToMovie),
      total_pages: response.data.total_pages,
    };

    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    return handleError(error, "getMovies");
  }
};

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<ApiResponse> => {
  const cacheKey = `searchMovies_${query}_${page}`;

  const cachedData = getFromCache<ApiResponse>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await api.get<{
      results: MovieResponse[];
      total_pages: number;
    }>(
      `/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`
    );

    const data: ApiResponse = {
      results: response.data.results.map(mapMovieResponseToMovie),
      total_pages: response.data.total_pages,
    };

    saveToCache(cacheKey, data);

    return data;
  } catch (error) {
    return handleError(error, "searchMovies");
  }
};

export const getMovieDetails = async (id: string): Promise<Movie> => {
  const cacheKey = `getMovieDetails_${id}`;

  const cachedData = getFromCache<Movie>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await api.get(`/movie/${id}?language=pt-BR`);
    const movie = response.data;

    const data: Movie = {
      id: movie.id || 0,
      title: movie.title || "Título não disponível",
      original_language: movie.original_language || "",
      posterUrl: movie.poster_path
        ? `${VITE_IMAGE_BASE_URL}${movie.poster_path}`
        : DEFAULT_POSTER_URL,
      overview: movie.overview || "Sinopse não disponível",
      rating: movie.vote_average ?? 0,
      runtime: movie.runtime || 0,
      genres: movie.genres?.map((genre: { name: string }) => genre.name) || [],
      budget: movie.budget || 0,
      revenue: movie.revenue || 0,
      production_companies:
        movie.production_companies?.map(
          (company: { name: string }) => company.name
        ) || [],
      production_countries:
        movie.production_countries?.map(
          (country: { name: string }) => country.name
        ) || [],
      tagline: movie.tagline || "",
      imdb_id: movie.imdb_id || "",
      popularity: movie.popularity || 0,
      vote_count: movie.vote_count || 0,
      release_date: movie.release_date || "Data de lançamento não disponível",
    };

    saveToCache(cacheKey, data);

    return data;
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

export const getMoviesByGenre = async (
  genreId: number,
  page: number = 1
): Promise<ApiResponse> => {
  const cacheKey = `getMoviesByGenre_${genreId}_${page}`;

  const cachedData = getFromCache<ApiResponse>(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await api.get<{
      results: MovieResponse[];
      total_pages: number;
    }>(`/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`);

    const data: ApiResponse = {
      results: response.data.results.map(mapMovieResponseToMovie),
      total_pages: response.data.total_pages,
    };

    saveToCache(cacheKey, data);
    return data;
  } catch (error) {
    return handleError(error, "getMoviesByGenre");
  }
};
