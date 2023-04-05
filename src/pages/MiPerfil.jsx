import { useEffect, useState } from "react";
import clienteAxios from "../helpers/configAxios";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const MiPerfil = () => {
  const { cargando, usuarioLogeado, setCargando, setUsuarioLogeado } =
    useAuth();

  const [miUsuario, setMiUsuario] = useState({});

  useEffect(() => {
    try {
      setCargando(true);
      const obtenerMiPerfil = async () => {
        const respuesta = await clienteAxios.get(
          `/usuarios/mostrar-usuario/${usuarioLogeado._id}`
        );
        setMiUsuario(await respuesta.data);
      };
      obtenerMiPerfil();
    } catch (error) {}
    setCargando(false);
  }, []);

  const eliminarUsuario = async (e) => {
    let confirmacion = confirm("¿Estás seguro de eliminar tu cuenta?");
    console.log(confirmacion);

    if (!confirmacion) {
      return alert("Cuenta no eliminada");
    }

    const respuesta = await clienteAxios.delete(
      `/usuarios/eliminar-cuenta/${usuarioLogeado._id}`
    );

    try {
      localStorage.removeItem("token");
      setUsuarioLogeado({});
      navigate("/auth/iniciar-sesion");
    } catch (error) {
      console.log(error);
    }

    alert(respuesta.data.msg);
  };
  const eliminarReclutador = async (e) => {
    let confirmacion = confirm(
      "¿Estás seguro de eliminar tu cuenta?, TODO SE VA A BORRAR"
    );

    if (!confirmacion) {
      return alert("Cuenta no eliminada");
    }

    const respuesta = await clienteAxios.delete(
      `/usuarios/eliminar-cuenta/${usuarioLogeado._id}`
    );

    try {
      localStorage.removeItem("token");
      setUsuarioLogeado({});
      navigate("/auth/iniciar-sesion");
    } catch (error) {
      console.log(error);
    }

    alert(respuesta.data.msg);
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="flex flex-col justify-center items-center gap-3 w-11/12 laptop:w-9/12 desktop:w-8/12">
      <p className="flex justify-center items-end gap-1 text-center movilS:text-2xl movilL:text-3xl tablet:text-6xl desktopL:text-5xl">
        Mi
        <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-7xl desktopL:text-9xl">
          Perfil
        </span>
      </p>

      <div className="flex movilS:flex-col-reverse tablet:flex-row movilS:items-center tablet:justify-between border-2 border-blue-600 rounded-md gap-7 py-5 px-3 w-full">
        <div className="w-full flex flex-col movilS:self-start tablet:self-center uppercase font-bold">
          <p className="flex gap-2">
            Nombre: <span className="text-blue-600">{miUsuario?.nombre}</span>
          </p>
          <p className="flex gap-2">
            Teléfono:{" "}
            {miUsuario?.telefono ? (
              <span className=" text-blue-600">{miUsuario?.telefono}</span>
            ) : (
              <span className=" text-red-400 uppercase">Sin Teléfono</span>
            )}
          </p>
          <p className="flex gap-2">
            Rol: <span className=" text-blue-600">{miUsuario?.rol}</span>
          </p>
          <p className="flex movilS:gap-0 movilS:flex-col movilL:flex-row movilL:gap-2">
            Email:
            <span className="text-blue-600">{miUsuario?.email}</span>
          </p>
          <p className="flex items-center mt-1 gap-2">
            {miUsuario.rol === "Empleado" ? (
              <>
                {miUsuario?.cv ? (
                  <>
                    CV:{" "}
                    <a
                      href={`http://localhost:5000/${miUsuario?.cv}`}
                      target="_blank"
                      className="font-bold py-2 px-3 border-2 rounded-lg border-none bg-indigo-600 text-white hover:text-indigo-600 hover:bg-white"
                    >
                      Ver Mi CV
                    </a>
                  </>
                ) : (
                  <>
                    CV:{" "}
                    <span className="font-bold text-gray-600">
                      No tienes un CV guardado
                    </span>
                  </>
                )}
              </>
            ) : (
              <Link
                to={`/mi-empresa`}
                className="font-bold py-2 px-3 border-2 rounded-lg border-none bg-indigo-600 text-white hover:text-indigo-600 hover:bg-white"
              >
                Ver Mi Empresa
              </Link>
            )}
          </p>
          <Link
            to={`/usuario/editar/${miUsuario._id}`}
            className="uppercase text-center border-2 flex-1 rounded-lg mt-7 py-2 px-3 border-none bg-blue-700 text-white hover:text-blue-700 hover:bg-white"
          >
            Editar Perfil
          </Link>

          {usuarioLogeado.rol === "Reclutador" ? (
            <button
              className="uppercase border-2 rounded-lg mt-3 py-2 px-4 font-bold text-center movilS:w-full tablet:w-fit border-red-500 bg-red-500 text-white hover:red-indigo-600 hover:border-white hover:bg-white"
              onClick={eliminarReclutador}
            >
              Eliminar Mi Perfil
            </button>
          ) : (
            <button
              className="uppercase border-2 rounded-lg mt-3 py-2 px-4 font-bold text-center movilS:w-full tablet:w-fit border-red-500 bg-red-500 text-white hover:red-indigo-600 hover:border-white hover:bg-white"
              onClick={eliminarUsuario}
            >
              Eliminar Mi Perfil
            </button>
          )}
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          {miUsuario?.foto ? (
            <img
              src={`http://localhost:5000/${miUsuario?.foto}`}
              alt={`Logo - ${miUsuario?.foto}`}
              className=" border-2 border-blue-600 rounded-lg object-cover movilS:w-44 movilL:w-56 tablet:w-96 desktopL:w-96 movilS:h-44 movilL:h-56 tablet:h-96 desktopL:h-96 "
            />
          ) : (
            <p className="flex justify-center items-center font-bold text-center text-red-600 border-blue-600 border-2 px-7 py-7 rounded-lg movilS:w-44 movilL:w-56 laptop:w-72 desktop:w-80 desktopL:w-96 movilS:h-44 movilL:h-56 laptop:h-72 desktop:h-80 desktopL:h-96">
              <span className="block bg-red-300 rounded-lg px-3 py-2">
                NO HAY UN FOTO DISPONIBLE
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;
