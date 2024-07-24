import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Home from "../Pages/Home";
import ShowDescriptionCarouselMovies from "../Pages/Home/ShowDescriptionCarouselMovies";
import Layout from "../components/Layout";
import SearchForMoviesOrSeries from "../Pages/components/SearchForMoviesOrSeries";
import MovieDescription from "../Pages/components/SearchForMoviesOrSeries/MovieDescription";
import TvShowsDescription from "../Pages/components/SearchForMoviesOrSeries/TvShowsDescription";
import ReleasesCategory from "../Pages/Home/MoviesReleases/ReleasesCategory";
import ReleaseDescription from "../Pages/Home/MoviesReleases/ReleaseDescription";
import TopRatedCategory from "../Pages/Home/MoviesTopRated/TopRatedCategory";
import TopRatedDescription from "../Pages/Home/MoviesTopRated/TopRatedDescription";
import PopularCategory from "../Pages/Home/MoviesPopular/PopularCategory";
import PopularDescription from "../Pages/Home/MoviesPopular/PopularDescription";
import TvShows from "../Pages/TvShows";
import MoviesByGenre from "../Pages/Home/components/MoviesByGenre";
import DescriptionMoviesByGenres from "../Pages/Home/components/DescriptionMoviesByGenres";

const Routes = () => {
  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tvShows" element={<TvShows />} />
        </Route>
        <Route path="genre/:genreName/:genreId" element={<MoviesByGenre />} />
        <Route
          path="genre/:genreName/:genreId/DescriptionMoviesByGenres/:id"
          element={<DescriptionMoviesByGenres />}
        />
        {/* <Route path="genre/:genreId/page/:page" element={<MoviesByGenre />} />/ */}
        <Route
          path="movie/:movieId"
          element={<ShowDescriptionCarouselMovies />}
        />
        <Route path="releasesCategory" element={<ReleasesCategory />} />
        <Route
          path="/releasesCategory/releaseDescription/:id"
          element={<ReleaseDescription />}
        />
        <Route path="topRatedCategory" element={<TopRatedCategory />} />
        <Route
          path="/topRatedCategory/topRatedDescription/:id"
          element={<TopRatedDescription />}
        />
        <Route path="/popularCategory" element={<PopularCategory />} />
        <Route
          path="/popularCategory/popularDescription/:id"
          element={<PopularDescription />}
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
        <Route path="*" element={null} />/
      </Route>
    )
  );
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={browserRouter} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default Routes;
