import { useEffect } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../helpers/configAxios";

const Forbidden = ({ alerta, btnCrearEmpresa }) => {
  return (
    <div className="flex-1 w-full gap-4 flex flex-col justify-center items-center font-bold text-center">
      {alerta ? (
        <p className="w-5/6 text-blue-700 bg-yellow-400 font-bold text-center movilS:text-lg movilL:text-lg desktopL:text-5xl rounded-xl mt-2">
          ¡Atención! - Primero debes confirmar tu cuenta, y si eres reclutador,
          debes tener 1 empresa creada.
        </p>
      ) : null}

      <h1 className="text-blue-600 movilS:text-4xl tablet:text-7xl laptop:text-8xl desktopL:text-9xl">
        <span className="text-red-500">ERROR 403</span> - NO AUTORIZADO
      </h1>
      <h2 className="text-white movilS:text-2xl desktop:text-4xl desktopL:text-6xl">
        NO TIENES ACCESO PARA ENTRAR A ÉSTA PÁGINA
      </h2>

      {alerta ? (
        !btnCrearEmpresa ? (
          <Link
            to="/auth/iniciar-sesion"
            className="cursor-pointer bg-blue-600 border-blue-600 text-white hover:bg-white hover:border-white hover:text-blue-600 border-2 rounded-lg font-bold px-7 py-1 movilS:w-11/12 tablet:w-7/12 movilS:text-lg tablet:text-2xl desktopL:text-4xl desktopL:desktopL:mt-7"
          >
            INICIAR SESIÓN
          </Link>
        ) : null
      ) : null}

      {btnCrearEmpresa ? (
        <Link
          to="/aux/nueva-empresa"
          className="cursor-pointer bg-blue-600 border-blue-600 text-white hover:bg-white hover:border-white hover:text-blue-600 border-2 rounded-lg font-bold px-7 py-1 movilS:w-11/12 tablet:w-7/12 movilS:text-lg tablet:text-2xl desktopL:text-4xl desktopL:desktopL:mt-7"
        >
          CREAR EMPRESA
        </Link>
      ) : null}
    </div>
  );
};

export default Forbidden;
