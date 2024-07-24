import { PropTypes } from "prop-types";
import { ImSpinner2 } from "react-icons/im";

const Loading = ({ isLoading }) =>
  isLoading && (
    <div className=" text-2xl flex justify-center min-h-[90vh] items-center">
      <ImSpinner2 className="animate-spin" />
    </div>
  );

export default Loading;

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
