import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import formatearDinero from "../helpers/formatearDinero";
import clienteAxios from "../helpers/configAxios";
import useAuth from "../hooks/useAuth";
import Alerta from "./Alerta";

const Vacante = () => {
  //* Obtener variables del provider.
  const { cargando, setCargando, usuarioLogeado } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();

  const [datosVacante, setDatosVacante] = useState({});
  const [rutaLogo, setRutaLogo] = useState("");
  const [hayLogo, setHayLogo] = useState(false);
  const [esMiVacante, setEsMiVacante] = useState(false);
  const [enviarDatos, setEnviarDatos] = useState({});
  const [errorAlerta, setErrorAlerta] = useState(true);
  const [mensajeAlerta, setMensajeAlerta] = useState("");
  const [estaPostulado, setEstaPostulado] = useState(false);

  useEffect(() => {
    setCargando(true);
    try {
      const obtenerVacante = async () => {
        const respuesta = await clienteAxios.get(
          `/vacantes/mostrar-vacante/${id}`
        );
        setDatosVacante(respuesta.data);

        setEsMiVacante(
          (await respuesta.data.empresa.reclutador._id) == usuarioLogeado._id
        );

        if (respuesta.data?.empresa?.logoEmpresa.length > 0) {
          setRutaLogo(
            `https://reactempleos-backend-r0m71aws3-danielplascencia.vercel.app/${respuesta.data.empresa.logoEmpresa}`
          );
          setHayLogo(true);
        } else {
          setHayLogo(false);
        }

        setEnviarDatos({
          usuariosPostulados: usuarioLogeado._id,
          emailUsuario: usuarioLogeado.email,
          emailEmpresa: datosVacante.empresa?.reclutador?.email,
        });
      };
      obtenerVacante();
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  }, [datosVacante.empresa?.reclutador?.email]);

  useEffect(() => {
    const obtenerVacante = async () => {
      const respuesta = await clienteAxios.get(
        `/vacantes/mostrar-vacante/${id}`
      );

      const arrayResult = respuesta.data.usuariosPostulados.includes(
        usuarioLogeado._id
      );
      setEstaPostulado(arrayResult);
    };
    obtenerVacante();
  }, [estaPostulado]);

  const postularUsuario = async () => {
    try {
      const respuesta = await clienteAxios.put(
        `/vacantes/postularme/${id}`,
        enviarDatos
      );
      setMensajeAlerta(respuesta.data.msg);
      setErrorAlerta(false);
      setEstaPostulado(true);

      setTimeout(() => {
        setMensajeAlerta("");
        setErrorAlerta(true);
      }, 2500);
    } catch (error) {
      setMensajeAlerta(error);
      setErrorAlerta(true);

      setTimeout(() => {
        setMensajeAlerta("");
      }, 2500);
    }
  };

  const eliminarVacante = async () => {
    const confirmacion = confirm("¿Estás seguro de eliminar la vacante?");
    if (!confirmacion) {
      return alert("Vacante no eliminada");
    }

    const respuesta = await clienteAxios.delete(
      `/vacantes/eliminar-vacante/${id}`
    );
    alert(respuesta.data.msg);
    navigate("/");
  };

  {
    return cargando ? (
      <Spinner />
    ) : (
      <div className="flex flex-col justify-center gap-3 my-5 px-7 py-4 border rounded-xl border-blue-600 w-5/6 tablet:w-4/6 laptop:w-5/6 desktop:w-4/6 desktopL:w-3/6 laptop:flex-row-reverse laptop:gap-12 desktop:flex-row-reverse desktop:gap-14 desktop:mb-5 desktopL:mt-9 desktopL:mb-60">
        <div className="flex flex-col justify-center items-center gap-5 self-center font-bold text-blue-600 text-3xl laptop:w-5/6 desktopL:w-11/12">
          <Link
            to={`/empresa/${datosVacante.empresa?._id}`}
            className="hover:text-white"
          >
            {datosVacante.empresa?.empresa}
          </Link>

          {hayLogo ? (
            <img
              src={rutaLogo}
              alt={`Logo - ${rutaLogo}`}
              className="border-2 border-blue-600 rounded-lg object-center object-cover movilS:w-56 movilS:h-56"
            />
          ) : (
            <p className="text-red-600 border-blue-600 border-2 w-4/6 px-7 py-7 rounded-lg">
              NO HAY UN LOGO DISPONIBLE
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 text-xl">
          <p className="font-bold text-white text-2xl ">
            {datosVacante.nombre}
            {esMiVacante ? (
              <span className="bg-indigo-500 text-white ml-3 mt-1 top-0 text-xs font-bold rounded-xl px-2 py-1 uppercase">
                Propietario
              </span>
            ) : null}
          </p>
          <p>
            Salario:{" "}
            <span className="text-gray-500 font-bold">
              {formatearDinero(datosVacante.salario)} al mes
            </span>
          </p>
          <p>
            Dias de trabajo:{" "}
            <span className="text-gray-500 font-bold">
              {datosVacante.diasTrabajo}
            </span>
          </p>
          <p>
            Pais:{" "}
            <span className="text-gray-500 font-bold capitalize">
              {datosVacante.empresa?.pais}
            </span>
          </p>
          <p>
            Estado:{" "}
            <span className="text-gray-500 font-bold capitalize">
              {datosVacante.empresa?.estado}
            </span>
          </p>
          <p className="overflow-hidden">
            Página de la empresa:{" "}
            <span className="text-gray-500 font-bold">
              <a href="">{datosVacante.empresa?.urlEmpresa}</a>
            </span>
          </p>

          <p>
            Descripción de la vacante:{" "}
            <span className="text-gray-500 font-bold">
              {" "}
              {datosVacante.descripcion}
            </span>
          </p>

          <h3 className="font-bold text-blue-700 text-3xl mt-5">Contactanos</h3>
          <p>
            Nombre:{" "}
            <span className="text-gray-500 font-bold capitalize">
              {datosVacante.empresa?.reclutador.nombre}
            </span>
          </p>
          <p>
            Email:{" "}
            <span className="text-gray-500 font-bold">
              {datosVacante.empresa?.reclutador.email}
            </span>
          </p>
          <p>
            Télefono:{" "}
            <span className="text-gray-500 font-bold">
              {datosVacante.empresa?.reclutador.telefono}
            </span>
          </p>

          {mensajeAlerta ? (
            <Alerta mensaje={mensajeAlerta} error={errorAlerta} />
          ) : null}

          <div className="flex justify-center items-center movilS:flex-col">
            {usuarioLogeado.rol === "Empleado" ? (
              estaPostulado ? (
                <p className="font-bold text-blue-600 uppercase text-lg">
                  Ya estas postulado a esta vacante
                </p>
              ) : (
                <button
                  type="button"
                  className="uppercase text-center border-2 rounded-2xl w-fit mt-3 py-2 px-4 font-bold border-blue-700 bg-blue-600 hover:text-blue-600 hover:border-gray-700 hover:bg-white"
                  onClick={postularUsuario}
                >
                  Postularme a la Vacante
                </button>
              )
            ) : datosVacante.usuariosPostulados ? (
              esMiVacante ? (
                <Link
                  to={`/vacante/postulaciones/${id}`}
                  className="relative uppercase text-center border-2 rounded-2xl w-fit mt-3 py-2 px-4 font-bold border-blue-700 bg-blue-600 hover:text-blue-600 hover:border-indigo-600 hover:bg-white"
                >
                  Ver Usuarios Postulados{" "}
                  {datosVacante.usuariosPostulados.length > 0 ? (
                    <span className="block w-7 h-7 text-center absolute rounded-full bg-red-400 -top-3 -right-3">
                      {datosVacante.usuariosPostulados.length}
                    </span>
                  ) : null}
                </Link>
              ) : null
            ) : null}

            {esMiVacante ? (
              <>
                <Link
                  to={`/vacante/editar-vacante/${id}`}
                  className="uppercase text-center border-2 rounded-2xl w-fit mt-3 py-2 px-4 font-bold border-indigo-700 bg-indigo-600 hover:text-indigo-600 hover:border-blue-600 hover:bg-white"
                >
                  Editar Vacante
                </Link>

                <button
                  className="uppercase border-2 rounded-2xl mt-3 py-2 px-4 font-bold text-center movilS:w-full tablet:w-fit border-red-500 bg-red-500 text-white hover:red-indigo-600 hover:border-white hover:bg-white"
                  onClick={eliminarVacante}
                >
                  Eliminar Vacante
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
};

export default Vacante;
