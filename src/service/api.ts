import { Movie, MovieResponse } from "@/types/movie";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get<{ results: MovieResponse[] }>(
      "/movie/now_playing?language=en-US&page=2"
    );

    return response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating: movie.vote_average ?? 0,
    }));
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
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
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
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
      posterUrl: "",
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
