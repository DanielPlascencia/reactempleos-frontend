import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import clienteAxios from "../helpers/configAxios";

import Forbidden from "../components/Forbidden";
import Spinner from "../components/Spinner";
import UsuariosPostulados from "../components/UsuariosPostulados";

const Postulaciones = () => {
  //* OBTENER ID DE LA VACANTE.
  const { id } = useParams();

  const { usuarioLogeado, cargando, setCargando } = useAuth();

  const [datosVacante, setDatosVacante] = useState({});
  const [miVacante, setMiVacante] = useState(false);

  useEffect(() => {
    setCargando(true);
    try {
      const obtenerVacante = async () => {
        const respuesta = await clienteAxios.get(
          `vacantes/mostrar-vacante/${id}`
        );
        setDatosVacante(respuesta.data);
      };

      obtenerVacante();

      if (usuarioLogeado?._id === datosVacante.empresa?.reclutador?._id)
        setMiVacante(true);
      else setMiVacante(false);
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setCargando(false);
  }, [datosVacante?.empresa?.reclutador?._id]);

  {
    return cargando ? (
      <Spinner />
    ) : miVacante ? (
      <div className="w-full flex flex-col justify-center items-center gap-6">
        <div>
          <p className="flex justify-center items-end gap-2 text-center movilS:text-2xl movilL:text-3xl tablet:text-6xl desktopL:text-5xl">
            Usuarios
            <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-7xl desktopL:text-9xl">
              Postulados
            </span>
          </p>

          <p className="flex movilS:flex-col justify-center items-center text-indigo-500 text-center movilS:text-2xl movilL:text-3xl tablet:text-6xl desktopL:text-5xl">
            Vacante:
            <span className="text-blue-600 font-bold">
              {datosVacante.nombre}
            </span>
          </p>
        </div>

        {datosVacante?.usuariosPostulados.map((usuario) => (
          <UsuariosPostulados
            key={usuario}
            usuario={usuario}
            nombreVacante={datosVacante.nombre}
          />
        ))}
      </div>
    ) : (
      <Forbidden />
    );
  }
};

export default Postulaciones;
