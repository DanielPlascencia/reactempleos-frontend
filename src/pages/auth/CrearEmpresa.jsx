import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import clienteAxios from "../../helpers/configAxios";
import useAuth from "../../hooks/useAuth";

import Alerta from "../../components/Alerta";

const CrearEmpresa = () => {
  //* Declaracioón del navigate.
  const navigate = useNavigate();

  //* Declaración del state.
  const [nuevaEmpresa, setNuevaEmpresa] = useState({});
  const [alerta, setAlerta] = useState([]);
  const [errorAlerta, setErrorAlerta] = useState(false);
  let reclutador = "";

  //* Declaración del hook para el provider.
  const { datosUsuario, alertaAtencion } = useAuth();

  useEffect(() => {
    reclutador = datosUsuario.id;
    setNuevaEmpresa({ ...nuevaEmpresa, reclutador });
  }, []);

  const almacenarDatos = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await clienteAxios.post(
        "/empresa/registrar-empresa",
        nuevaEmpresa
      );

      setAlerta(respuesta.data.msg);
      setErrorAlerta(false);

      setTimeout(() => {
        setAlerta("");
        navigate("/auth/iniciar-sesion");
      }, 5000);
    } catch (error) {
      console.log(error);
      setAlerta(error.response.data.msg);
      setErrorAlerta(true);

      setTimeout(() => {
        setAlerta("");
      }, 5000);
    }
  };

  const guardarCambios = (e) => {
    setNuevaEmpresa({
      ...nuevaEmpresa,
      [e.target.name]: e.target.value,
    });
  };

  return Object.keys(datosUsuario).length ? (
    <>
      <p className="text-center text-xl px-2 flex flex-col movilS:text-sm movilL:text-lg tablet:text-3xl desktopL:text-5xl">
        <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-6xl desktopL:text-9xl">
          Crear Empresa
        </span>
        Crea una empresa y empieza a publicar las vacantes
      </p>

      {alertaAtencion ? (
        <p className="w-full text-blue-700 bg-yellow-400 font-bold text-center movilS:text-lg movilL:text-lg desktopL:text-5xl rounded-xl mt-2">
          ¡Atención! - Como eres reclutador, tienes que crear al menos 1
          empresa.
        </p>
      ) : null}

      {alerta?.length ? (
        typeof alerta === "string" ? (
          <Alerta mensaje={alerta} error={errorAlerta} />
        ) : (
          alerta?.map((mostrarAlerta, index) => (
            <Alerta
              key={index}
              mensaje={mostrarAlerta.msg}
              error={errorAlerta}
            />
          ))
        )
      ) : null}

      <form
        className="flex flex-col items-center my-5 gap-5"
        onSubmit={almacenarDatos}
      >
        <div className="w-5/6 lg:w-4/6 xl:w-3/6 flex flex-col items-center mx-11 gap-2">
          <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
            <input
              type="text"
              name="empresa"
              placeholder="Escribe el nombre de tu empresa"
              className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
              onChange={guardarCambios}
            />
          </div>

          <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
            <input
              type="text"
              name="pais"
              placeholder="Escribe el pais"
              className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
              onChange={guardarCambios}
            />
          </div>

          <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
            <input
              type="text"
              name="estado"
              placeholder="Escribe el estado"
              className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
              onChange={guardarCambios}
            />
          </div>

          <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
            <input
              type="text"
              name="ubicacion"
              placeholder="Escribe la ubicacion"
              className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
              onChange={guardarCambios}
            />
          </div>

          <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
            <input
              type="text"
              name="urlEmpresa"
              placeholder="Escribe la URL de tu empresa"
              className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
              onChange={guardarCambios}
            />
          </div>
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="cursor-pointer bg-white text-blue-600 border-2 rounded-lg font-bold px-7 py-1 movilS:w-11/12 tablet:w-7/12 movilS:text-lg tablet:text-2xl desktopL:text-4xl desktopL:desktopL:mt-7"
        />
      </form>
    </>
  ) : (
    <div className="my-16 w-full flex flex-col justify-center items-center font-bold text-center">
      <h1 className="text-blue-600 text-7xl">ERROR 404</h1>
      <h2 className="text-white text-5xl">PAGINA NO ENCONTRADA</h2>
    </div>
  );
};

export default CrearEmpresa;
