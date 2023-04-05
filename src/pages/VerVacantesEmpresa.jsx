import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Vacantes from "../components/Vacantes";
import clienteAxios from "../helpers/configAxios";
import useAuth from "../hooks/useAuth";

const VerVacantesEmpresa = () => {
  const { id } = useParams();

  const { cargando, setCargando } = useAuth();

  const [vacantesEncontradas, setVacantesEncontradas] = useState([]);

  useEffect(() => {
    setCargando(true);
    const obtenerEmpresa = async () => {
      const respuesta = await clienteAxios.get(
        `/vacantes/mostrar-vacantes-de-empresa/${id}`
      );
      setVacantesEncontradas(respuesta?.data);
    };
    obtenerEmpresa();
    setCargando(false);
  }, [vacantesEncontradas.length > 0]);

  console.log(vacantesEncontradas);

  {
    return cargando ? (
      <Spinner />
    ) : vacantesEncontradas?.length > 0 ? (
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <p className="flex flex-col text-center movilS:text-sm movilL:text-lg tablet:text-3xl desktopL:text-5xl">
          <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-6xl desktopL:text-9xl">
            VACANTES DISPONIBLES
          </span>
        </p>

        {vacantesEncontradas.map((vacante) => (
          <Vacantes key={vacante._id} vacante={vacante} />
        ))}
      </div>
    ) : (
      <p className="font-bold text-gray-600 uppercase text-lg self-center text-center w-11/12">
        Esta empresa no tiene vacantes disponibles
      </p>
    );
  }
};

export default VerVacantesEmpresa;
