import React, { useEffect, useState } from "react";
import clienteAxios from "../helpers/configAxios";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Forbidden from "../components/Forbidden";
import Spinner from "../components/Spinner";

const MiEmpresa = () => {
  const { usuarioLogeado, cargando, setCargando } = useAuth();

  const [empresa, setEmpresa] = useState({});
  const [mostrarRuta, setMostrarRuta] = useState(false);
  const [vacantesEncontradas, setVacantesEncontradas] = useState(false);

  useEffect(() => {
    setCargando(true);
    try {
      if (usuarioLogeado.rol === "Empleado") {
        setCargando(false);
        return setMostrarRuta(false);
      } else {
        setMostrarRuta(true);
      }
      const obtenerEmpresa = async () => {
        const respuesta = await clienteAxios.get(
          `/empresa/mostrar-mi-empresa/${usuarioLogeado._id}`
        );
        setEmpresa(respuesta.data);
      };
      obtenerEmpresa();
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  }, [empresa._id < 0]);

  useEffect(() => {
    setCargando(true);
    const obtenerEmpresa = async () => {
      if (empresa._id) {
        const respuesta = await clienteAxios.get(
          `/vacantes/mostrar-vacantes-de-empresa/${empresa?._id}`
        );
        setVacantesEncontradas(respuesta?.data);
      }
    };
    obtenerEmpresa();
    setCargando(false);
  }, [empresa._id?.length > 0]);

  {
    return cargando ? (
      <Spinner />
    ) : mostrarRuta ? (
      <div className="flex flex-col justify-center items-center gap-3">
        <p className="flex justify-center items-end gap-2 text-center movilS:text-2xl movilL:text-3xl tablet:text-6xl desktopL:text-5xl">
          Mi
          <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-7xl desktopL:text-9xl">
            Empresa
          </span>
        </p>

        <h2 className="flex flex-col items-center text-center movilS:text-3xl tablet:text-6xl my-2 font-bold text-indigo-600">
          {empresa?.empresa}
        </h2>

        <div className="flex items-center gap-6 movilS:flex-col-reverse tablet:flex-row tablet:mt-14 ">
          <div className="w-5/6 flex flex-col">
            <div className="flex flex-col  tablet:items-start tablet:pl-9 gap-3 text-2xl mb-5 px-3">
              <h3 className="font-bold text-blue-700 text-3xl">DATOS:</h3>
              <p>
                País:{" "}
                <span className="text-gray-600 font-bold capitalize">
                  {empresa?.pais}
                </span>
              </p>
              <p>
                Estado:{" "}
                <span className="text-gray-600 font-bold capitalize">
                  {empresa?.estado}
                </span>
              </p>

              <p>
                Dirección:{" "}
                {empresa?.ubicacion?.length > 0 ? (
                  <span className="text-gray-600 font-bold capitalize">
                    {empresa?.ubicacion}
                  </span>
                ) : (
                  <span className="text-red-600">No Especificado</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full tablet:justify-end">
            {empresa?.logoEmpresa ? (
              <img
                src={`https://reactempleos-backend-r0m71aws3-danielplascencia.vercel.app/${empresa?.logoEmpresa}`}
                alt={`Logo - ${empresa?.logoEmpresa}`}
                className="border-2 border-blue-600 rounded-lg object-contain movilS:w-44 movilL:w-56 laptop:w-72 desktop:w-80 desktopL:w-96 movilS:h-44 movilL:h-56 laptop:h-72 desktop:h-80 desktopL:h-96"
              />
            ) : (
              <p className="flex justify-center items-center font-bold text-red-600 border-blue-600 border-2 px-7 py-7 rounded-lg movilS:w-44 movilL:w-56 laptop:w-72 desktop:w-80 desktopL:w-96 movilS:h-44 movilL:h-56 laptop:h-72 desktop:h-80 desktopL:h-96">
                NO HAY UN LOGO DISPONIBLE
              </p>
            )}

            {empresa?.urlEmpresa ? (
              <p className="my-5 font-bold text-lg text-center">
                Visitanos en:{" "}
                <span className="block text-blue-600">
                  {empresa?.urlEmpresa}
                </span>
              </p>
            ) : (
              <p className="text-red-600">La URL de la página no existe</p>
            )}
          </div>
        </div>
        <div className="w-full px-7 flex justify-center items-center gap-2 movilS:flex-col tablet:flex-row">
          <Link
            to={`/empresa/${empresa?._id}`}
            className="uppercase border-2 rounded-2xl mt-3 py-2 px-4 font-bold text-center movilS:w-full tablet:w-fit border-blue-700 bg-blue-600 hover:text-blue-600 hover:border-gray-700 hover:bg-white"
          >
            Ver Empresa
          </Link>

          <Link
            to={`/empresa/editar/${empresa?._id}`}
            className="uppercase border-2 rounded-2xl mt-3 py-2 px-4 font-bold text-center movilS:w-full tablet:w-fit border-indigo-500 bg-indigo-500 text-white hover:text-indigo-600 hover:border-white hover:bg-white"
          >
            Editar Mi Empresa
          </Link>

          {vacantesEncontradas ? (
            <Link
              to={`/mis-vacantes/${empresa?._id}`}
              className="uppercase border-2 rounded-2xl mt-3 py-2 px-4 font-bold text-center movilS:w-full tablet:w-fit border-green-500 bg-green-500 text-white hover:text-green-600 hover:border-white hover:bg-white"
            >
              Ver mis vacantes
            </Link>
          ) : (
            <p className="font-bold text-gray-600 uppercase text-lg self-center text-center w-11/12">
              Aún no tienes vacantes publicadas
            </p>
          )}
        </div>
      </div>
    ) : (
      <Forbidden />
    );
  }
};

export default MiEmpresa;
