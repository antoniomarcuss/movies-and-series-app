import { PropTypes } from "prop-types";
import { ApiImgAutoResolution } from "../../../consts";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useQuery } from "react-query";

const CarouselTime = ({ queryKey, queryFn, home = "movie" }) => {
  const { data } = useQuery({
    queryKey: queryKey,
    queryFn: () => queryFn,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper  bg-white bg-opacity-10 "
      >
        {data?.data.results.slice(0, 10).map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`${home}/${item.id}`}>
              <img
                src={`${ApiImgAutoResolution}/${item.backdrop_path}`}
                className="w-full  md:h-96 object-cover lg:h-[450px] "
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselTime;

CarouselTime.propTypes = {
  queryKey: PropTypes.string.isRequired,
  queryFn: PropTypes.func.isRequired,
  home: PropTypes.string,
};
