import { PropTypes } from "prop-types";
import { ImSpinner2 } from "react-icons/im";
import { useThemeControllerStore } from "../../stores/ThemeControllerStore";

const Loading = ({ isLoading }) => {
  const isSun = useThemeControllerStore(({ isSun }) => isSun);
  return (
    <div>
      {isLoading && (
        <div className=" text-2xl flex justify-center min-h-[90vh] items-center">
          <ImSpinner2
            className={`animate-spin ${isSun ? "text-blue-950" : "text-white"}`}
          />
        </div>
      )}
    </div>
  );
};

export default Loading;

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
