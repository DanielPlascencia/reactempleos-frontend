import { useEffect, useState } from "react";
import clienteAxios from "../helpers/configAxios";
import { useNavigate } from "react-router-dom";

const UsuariosPostulados = ({ usuario }) => {
  const navigate = useNavigate();
  const [datosUsuario, setDatosUsuario] = useState({});
  const [eliminado, setEliminado] = useState(false);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const respuesta = await clienteAxios.get(
          `/usuarios/mostrar-usuario/${usuario}`
        );

        setDatosUsuario(respuesta.data);
      } catch (error) {
        if (error.response.data.msg === "Usuario No Encontrado") {
          setEliminado(true);
        }
      }
    };
    obtenerUsuario();
  }, []);

  const eliminarPostulacion = async () => {
    // console.log(usuario);
    try {
      const respuesta = await clienteAxios.delete(
        `vacantes/eliminar-postulacion/${usuario}`
      );
      alert(respuesta.data.msg);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-11/12 laptop:w-9/12 desktop:w-8/12">
      <div className="flex movilS:flex-col-reverse tablet:flex-row movilS:items-center tablet:justify-between border-2 border-blue-600 rounded-md gap-7 py-5 px-3 w-full">
        {eliminado ? (
          <p className="bg-red-400 text-white bold px-2 py-1 rounded-full text-sm">
            El usuario ya no existe
          </p>
        ) : null}
        <div className="w-full flex flex-col movilS:self-start tablet:self-center uppercase font-bold">
          <p className="flex gap-2">
            Nombre:{" "}
            <span className="text-blue-600">{datosUsuario?.nombre}</span>
          </p>
          <p className="flex gap-2">
            Teléfono:{" "}
            {datosUsuario?.telefono ? (
              <span className=" text-blue-600">{datosUsuario?.telefono}</span>
            ) : (
              <span className=" text-red-400 uppercase">Sin Teléfono</span>
            )}
          </p>
          <p className="flex gap-2">
            Rol: <span className=" text-blue-600">{datosUsuario?.rol}</span>
          </p>

          <p className="flex gap-2">
            Email:
            <span className="text-blue-600">{datosUsuario?.email}</span>
          </p>

          <p className="flex items-center mt-1 gap-2">
            {
              <>
                {datosUsuario?.cv ? (
                  <>
                    CV:{" "}
                    <a
                      href={`http://localhost:5000/${datosUsuario?.cv}`}
                      target="_blank"
                      className="font-bold py-2 px-3 border-2 rounded-lg border-none bg-indigo-600 text-white hover:text-indigo-600 hover:bg-white"
                    >
                      Ver CV
                    </a>
                  </>
                ) : (
                  <>
                    CV:{" "}
                    <span className="font-bold text-gray-600">
                      No tiene un CV guardado
                    </span>
                  </>
                )}
              </>
            }
          </p>

          {
            <button
              className="uppercase border-2 rounded-2xl mt-3 py-2 px-4 font-bold text-center movilS:w-full tablet:w-fit border-red-500 bg-red-500 text-white hover:red-indigo-600 hover:border-white hover:bg-white"
              onClick={eliminarPostulacion}
            >
              Eliminar Postulacion
            </button>
          }

          {/* <Link
            to={`/enviar-mensaje/${datosUsuario._id}`}
            className="uppercase text-center border-2 rounded-2xl self-center w-fit mt-3 py-2 px-4 font-bold border-blue-700 bg-blue-600 hover:text-blue-600 hover:border-blue-600 hover:bg-white"
          >
            Enviar Un Mensaje
          </Link> */}
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          {datosUsuario?.foto ? (
            <img
              src={`http://localhost:5000/${datosUsuario?.foto}`}
              alt={`Logo - ${datosUsuario?.foto}`}
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

export default UsuariosPostulados;
