import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Forbidden from "../components/Forbidden";
import Spinner from "../components/Spinner";
import Vacantes from "../components/Vacantes";
import clienteAxios from "../helpers/configAxios";
import useAuth from "../hooks/useAuth";

const MisVacantes = () => {
  const { id } = useParams();

  const { usuarioLogeado, cargando, setCargando } = useAuth();

  const [empresa, setEmpresa] = useState({});
  const [permitirVista, setPermitirVista] = useState(false);
  const [vacantesEncontradas, setVacantesEncontradas] = useState([]);

  useEffect(() => {
    setCargando(true);
    try {
      const obtenerEmpresa = async () => {
        const respuesta = await clienteAxios.get(
          `/empresa/mostrar-empresa/${id}`
        );
        setEmpresa(respuesta.data);
        if (empresa?.reclutador?._id === usuarioLogeado._id) {
          setPermitirVista(true);
        }
      };
      obtenerEmpresa();
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  }, [empresa?.reclutador?._id.length > 0]);

  useEffect(() => {
    setCargando(true);

    const obtenerVacantes = async () => {
      const respuesta = await clienteAxios.get(
        `/vacantes/mostrar-vacantes-de-empresa/${id}`
      );
      setVacantesEncontradas(respuesta.data);
      console.log(respuesta.data);
    };
    obtenerVacantes();

    setCargando(false);
  }, [vacantesEncontradas.length < 0]);

  console.log(vacantesEncontradas);

  {
    return cargando ? (
      <Spinner />
    ) : permitirVista ? (
      <div className="w-full flex flex-col justify-center items-center gap-5 py-2">
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
      <Forbidden />
    );
  }
};

export default MisVacantes;
