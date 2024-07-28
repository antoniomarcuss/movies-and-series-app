import { PropTypes } from "prop-types";
import { useThemeControllerStore } from "../../stores/ThemeControllerStore";

const Error = ({ isError }) => {
  const isSun = useThemeControllerStore(({ isSun }) => isSun);
  return (
    <div>
      {isError && (
        <div
          className={` text-lg  mx-2 text-center flex justify-center min-h-[80vh] items-center ${
            isSun ? "text-blue-950" : "text-white"
          }`}
        >
          Erro ao carregar os dados! Por favor verifique sua conexão com a
          internet
        </div>
      )}
    </div>
  );
};

export default Error;

Error.propTypes = {
  isError: PropTypes.bool,
};
