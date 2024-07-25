import { useParams } from "react-router-dom";
import ShowCategory from "../../../components/ShowCategory";
import { TvShowsServices } from "../../../../services/tvShows";

const TvShowsByGenre = () => {
  const { genreName, genreId } = useParams();
  console.log("genreId:", genreId);
  console.log("genreName:", genreName);
  return (
    <div>
      <ShowCategory
        queryKey={["TvShowsByGenre", genreId]}
        queryFn={(page) => TvShowsServices.fetchTvShowsByGenre(genreId, page)}
        title={genreName}
        backLink={`/tvShows/genre/${genreName}/${genreId}/DescriptionTvShowsByGenres`}
        backLinkHome={"/tvShows"}
      />
    </div>
  );
};

export default TvShowsByGenre;
