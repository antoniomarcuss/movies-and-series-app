import { httpClient } from "../axios";
const ApiKey = import.meta.env.VITE_API_KEY;
const ApiCategories = "genre/movie/list";

export class MoviesServices {
  static async fetchMoviesTopRated(page) {
    return await httpClient.get(
      `/movie/top_rated?api_key=${ApiKey}&language=pt-BR&page=${page}&region=BR`
    );
  }
  static async fetchPopularMovies(page) {
    return await httpClient.get(
      `/movie/popular?api_key=${ApiKey}&language=pt-BR&page=${page}`
    );
  }
  static async fetchMoviesReleases(page) {
    return await httpClient.get(
      `/movie/now_playing?api_key=${ApiKey}&language=pt-BR&page=${page}`
    );
  }
  static async fetchMoviesById(movieId) {
    return await httpClient.get(
      `/movie/${movieId}?api_key=${ApiKey}&append_to_response=credits,videos,images&language=pt-BR&region=BR`
    );
  }

  static async fetchMoviesGenre() {
    return await httpClient.get(
      `${ApiCategories}?api_key=${ApiKey}&language=pt-BR`
    );
  }
  static async fetchMoviesByGenre(genreId, page) {
    return await httpClient.get(
      `/discover/movie?api_key=${ApiKey}&with_genres=${genreId}&language=pt-BR&page=${page}`
    );
  }
  static async SearchMovies(query, page) {
    return await httpClient.get(
      `search/movie?api_key=${ApiKey}&language=pt-BR&query=${query}&page=${page}`
    );
  }
}
