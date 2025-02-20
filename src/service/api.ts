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
