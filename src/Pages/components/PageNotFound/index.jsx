import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center gap-2 justify-center min-h-screen  md:max-w-[1600px]  m-auto  ">
      <h1>Ops Essa página não existe</h1>
      <Link
        className=" p-1 px-6 rounded-md bg-blue-500 text-white hover:bg-blue-600 "
        to="/"
      >
        Voltar
      </Link>
    </div>
  );
};

export default PageNotFound;
