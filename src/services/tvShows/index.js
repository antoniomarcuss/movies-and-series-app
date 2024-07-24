import { httpClient } from "../axios";
const ApiKey = import.meta.env.VITE_API_KEY;
export class TvShowsServices {
  static async fetchTvShowsById(tvId) {
    return await httpClient.get(
      `/tv/${tvId}?api_key=${ApiKey}&append_to_response=credits,videos,images&language=pt-BR&region=BR`
    );
  }

  static async SearchTvShows(query, page) {
    return await httpClient.get(
      `search/tv?api_key=${ApiKey}&language=pt-BR&query=${query}&page=${page}`
    );
  }
}
