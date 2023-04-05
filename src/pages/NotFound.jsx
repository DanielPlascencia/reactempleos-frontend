import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full gap-4 flex flex-col justify-center items-center font-bold text-center">
      <h1 className="text-blue-600 movilS:text-5xl tablet:text-7xl laptop:text-8xl desktopL:text-9xl">
        ERROR 404
      </h1>
      <h2 className="text-white movilS:text-3xl desktop:text-4xl desktopL:text-6xl">
        PAGINA NO ENCONTRADA
      </h2>

      <Link
        to="/"
        className="cursor-pointer bg-white text-blue-600 border-2 rounded-lg font-bold px-7 py-1 movilS:w-11/12 tablet:w-7/12 movilS:text-lg tablet:text-2xl desktopL:text-4xl desktopL:desktopL:mt-7"
      >
        REGRESAR AL INICIO
      </Link>
    </div>
  );
};

export default NotFound;
