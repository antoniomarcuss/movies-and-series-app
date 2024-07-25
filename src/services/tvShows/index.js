import { httpClient } from "../axios";
const ApiKey = import.meta.env.VITE_API_KEY;
const ApiCategories = "genre/tv/list";
export class TvShowsServices {
  static async fetchTvShowsReleases(page) {
    return await httpClient.get(
      `/tv/on_the_air?api_key=${ApiKey}&language=pt-BR&page=${page}&region=BR`
    );
  }

  static async fetchTopRatedTvShows(page) {
    return await httpClient.get(
      `/tv/top_rated?api_key=${ApiKey}&language=pt-BR&page=${page}&region=BR`
    );
  }
  static async fetchPopularTvShows(page) {
    return await httpClient.get(
      `/tv/popular?api_key=${ApiKey}&language=pt-BR&page=${page}`
    );
  }
  static async fetchTvShowsById(tvId) {
    return await httpClient.get(
      `/tv/${tvId}?api_key=${ApiKey}&append_to_response=credits,videos,images&language=pt-BR&region=BR`
    );
  }

  static async fetchTvShowsGenre() {
    return await httpClient.get(
      `${ApiCategories}?api_key=${ApiKey}&language=pt-BR`
    );
  }
  static async fetchTvShowsByGenre(genreId, page) {
    return await httpClient.get(
      `/discover/tv?api_key=${ApiKey}&with_genres=${genreId}&language=pt-BR&page=${page}`
    );
  }
  static async SearchTvShows(query, page) {
    return await httpClient.get(
      `search/tv?api_key=${ApiKey}&language=pt-BR&query=${query}&page=${page}`
    );
  }
}
