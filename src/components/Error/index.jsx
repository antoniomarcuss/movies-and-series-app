const Error = ({ isError }) =>
  isError && (
    <div className=" text-lg  mx-2 text-center flex justify-center min-h-[80vh] items-center">
      Erro ao carregar os dados! Por favor verifique sua conexão com a internet
    </div>
  );

export default Error;
