import { Outlet } from "react-router-dom";
import Header from "../Header";
import { useThemeControllerStore } from "../../stores/ThemeControllerStore";

const Layout = () => {
  const isSun = useThemeControllerStore(({ isSun }) => isSun);
  return (
    <div
      className={`bg-gray-950 relative  max-w-[1600px] w-full m-auto  pb-5 min-h-screen ${
        isSun && "bg-white "
      }`}
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
