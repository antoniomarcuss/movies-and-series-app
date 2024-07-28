import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import Movies from "../Pages/Movies";
import ShowDescriptionCarouselMovies from "../Pages/Movies/ShowDescriptionCarouselMovies";
import Layout from "../components/Layout";
import SearchForMoviesOrSeries from "../Pages/components/SearchForMoviesOrSeries";
import MovieDescription from "../Pages/components/SearchForMoviesOrSeries/MovieDescription";
import TvShowsDescription from "../Pages/components/SearchForMoviesOrSeries/TvShowsDescription";
import ReleasesCategory from "../Pages/Movies/MoviesReleases/ReleasesCategory";
import ReleaseDescription from "../Pages/Movies/MoviesReleases/ReleaseDescription";
import ReleasesCategoryTvShows from "../Pages/TvShows/TvShowsReleases/ReleasesCategoryTvShows";
import TopRatedCategory from "../Pages/Movies/MoviesTopRated/TopRatedCategory";
import TopRatedCategoryTvShows from "../Pages/TvShows/TvShowsTopRated/TopRatedCategoryTvShows";
import TopRatedDescription from "../Pages/Movies/MoviesTopRated/TopRatedDescription";
import TopRatedDescriptionTvShows from "../Pages/TvShows/TvShowsTopRated/TopRatedDescriptionTvShows";
import PopularCategory from "../Pages/Movies/MoviesPopular/PopularCategory";
import PopularDescription from "../Pages/Movies/MoviesPopular/PopularDescription";
import TvShows from "../Pages/TvShows";
import MoviesByGenre from "../Pages/Movies/components/MoviesByGenre";
import DescriptionMoviesByGenres from "../Pages/Movies/components/DescriptionMoviesByGenres";
import ShowDescriptionCarouselTvShows from "../Pages/TvShows/ShowDescriptionCarouselTvShows";
import ReleaseDescriptionTvShows from "../Pages/TvShows/TvShowsReleases/ReleaseDescriptionTvShows";
import PopularCategoryTvShows from "../Pages/TvShows/TvShowsPopular/PopularCategoryTvShows";
import PopularDescriptionTvShows from "../Pages/TvShows/TvShowsPopular/PopularDescriptionTvShows";
import DescriptionTvShowsByGenres from "../Pages/TvShows/components/DescriptionTvShowsByGenres";
import TvShowsByGenre from "../Pages/TvShows/components/TvShowsByGenre";
import Favorites from "../Pages/components/Favorites";
import FavoritesDescription from "../Pages/components/Favorites/FavoritesDescription";
import PageNotFound from "../Pages/components/PageNotFound";

const Routes = () => {
  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Movies />} />
          <Route path="tvShows" element={<TvShows />} />
        </Route>
        <Route path="/genre/:genreName/:genreId" element={<MoviesByGenre />} />
        <Route
          path="/tvShows/genre/:genreName/:genreId"
          element={<TvShowsByGenre />}
        />
        <Route
          path="/genre/:genreName/:genreId/DescriptionMoviesByGenres/:movieId"
          element={<DescriptionMoviesByGenres />}
        />
        <Route
          path="/tvShows/genre/:genreName/:genreId/DescriptionTvShowsByGenres/:tvShowId"
          element={<DescriptionTvShowsByGenres />}
        />
        <Route
          path="movie/:movieId"
          element={<ShowDescriptionCarouselMovies />}
        />
        <Route
          path="/tvShows/:tvShowId"
          element={<ShowDescriptionCarouselTvShows />}
        />
        <Route path="/releasesCategory" element={<ReleasesCategory />} />
        <Route
          path="/releasesCategory/releaseDescription/:movieId"
          element={<ReleaseDescription />}
        />
        <Route
          path="/tvShows/releasesCategory"
          element={<ReleasesCategoryTvShows />}
        />
        <Route
          path="/tvShows/releasesCategory/releaseDescription/:tvShowId"
          element={<ReleaseDescriptionTvShows />}
        />
        /
        <Route path="/topRatedCategory" element={<TopRatedCategory />} />
        <Route
          path="/tvShows/topRatedCategory"
          element={<TopRatedCategoryTvShows />}
        />
        <Route
          path="/topRatedCategory/topRatedDescription/:movieId"
          element={<TopRatedDescription />}
        />
        <Route
          path="/tvShows/topRatedCategory/topRatedDescription/:tvShowId"
          element={<TopRatedDescriptionTvShows />}
        />
        <Route path="/popularCategory" element={<PopularCategory />} />
        <Route
          path="tvShows/popularCategory"
          element={<PopularCategoryTvShows />}
        />
        <Route
          path="/popularCategory/popularDescription/:movieId"
          element={<PopularDescription />}
        />
        <Route
          path="tvShows/popularCategory/popularDescription/:tvShowId"
          element={<PopularDescriptionTvShows />}
        />
        <Route path="searchForMoviesOrSeries">
          <Route index element={<SearchForMoviesOrSeries />} />
          <Route
            path={`movieDescription/:movieId`}
            element={<MovieDescription />}
          />
          <Route
            path={`tvShowDescription/:tvShowId`}
            element={<TvShowsDescription />}
          />
        </Route>
        <Route path="/favorites" element={<Favorites />} />
        <Route
          path="/favorites/movie/:movieId"
          element={<FavoritesDescription />}
        />
        <Route
          path="/favorites/tvShow/:tvShowId"
          element={<FavoritesDescription />}
        />
        <Route path="*" element={<PageNotFound />} />/
      </Route>
    )
  );
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={browserRouter} />
    </QueryClientProvider>
  );
};

export default Routes;
