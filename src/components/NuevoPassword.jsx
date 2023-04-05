import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import clienteAxios from "../helpers/configAxios";
import Alerta from "./Alerta";

const NuevoPassword = () => {
  //* Declaración del useNavigate
  const navigate = useNavigate();

  //* Obtener token y juntarlo.
  const { token } = useParams();
  const tokenFragmentado = token.split("&");
  const tokenCompleto = `${tokenFragmentado[0]}.${tokenFragmentado[1]}.${tokenFragmentado[2]}`;

  //* Declaración de States.
  const [alerta, setAlerta] = useState("");
  const [alertaError, setAlertaError] = useState(false);
  const [tokenEsValido, setTokenEsValido] = useState(false);
  const [nuevoPassword, setNuevoPassword] = useState("");

  useEffect(() => {
    try {
      const comprobarToken = async () => {
        const respuesta = await clienteAxios.post(
          `/auth/comprobar-token/${tokenCompleto}`
        );

        if (respuesta.data.tokenValido === false) {
          setTokenEsValido(respuesta.data.tokenValido);
          setAlerta(respuesta.data.msg);
          setAlertaError(true);
          return;
        }

        setTokenEsValido(respuesta.data.tokenValido);
      };

      comprobarToken();
    } catch (error) {
      console.log(error);
      setAlerta(error.response.data.message);
      setAlertaError(true);

      setTimeout(() => {
        setAlerta("");
      }, 5000);
    }
  }, []);

  const recuperarPassword = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await clienteAxios.post(
        `/auth/recuperar-password/${tokenCompleto}`,
        { password: nuevoPassword }
      );

      setAlerta(respuesta.data.msg);
      setAlertaError(false);

      setTimeout(() => {
        setAlerta("");
        navigate("/auth/iniciar-sesion");
      }, 5000);
    } catch (error) {
      setAlerta(error.response.data.msg);
      setAlertaError(true);

      setTimeout(() => {
        setAlerta("");
      }, 5000);
    }
  };

  const guardarCambios = (e) => {
    setNuevoPassword(e.target.value);
  };

  return (
    <>
      {tokenEsValido ? (
        <div className="my-20">
          {alerta ? <Alerta mensaje={alerta} error={alertaError} /> : null}
          <p className="mt-10 flex flex-col text-center movilS:text-sm movilL:text-lg tablet:text-3xl desktopL:text-5xl">
            <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-6xl desktopL:text-9xl movilM:mb-2 desktopL:mb-6">
              RECUPERA TU PASSWORD
            </span>
            Escribe el nuevo password
          </p>

          <form
            className="flex flex-col items-center mt-5 gap-5"
            onSubmit={recuperarPassword}
          >
            <div className="flex flex-col gap-4 movilS:w-11/12 tablet:w-7/12">
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full bg-black border-2 text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={guardarCambios}
              />
            </div>

            <input
              type="submit"
              value="Recuperar Contraseña"
              className="bg-white text-blue-600 hover:cursor-pointer border-2 rounded-lg font-bold px-7 py-1 movilS:w-11/12 tablet:w-7/12 movilS:text-lg tablet:text-2xl desktopL:text-4xl desktopL:desktopL:mt-7"
            />
          </form>
        </div>
      ) : (
        <div className="my-32 flex flex-col justify-center items-center gap-14">
          <Alerta mensaje={alerta} error={alertaError} />

          <p className="flex flex-col text-center movilS:text-sm movilL:text-lg tablet:text-3xl desktopL:text-5xl">
            <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-6xl desktopL:text-9xl movilM:mb-2 desktopL:mb-6">
              ERROR DE TOKEN
            </span>
            Ocurrió un error en tu token, intentalo de nuevo
          </p>

          <Link
            to="/"
            className="text-white border-blue-700 font-bold border-2 px-7 py-1 self-center rounded-lg "
          >
            REGRESAR AL INICIO
          </Link>
        </div>
      )}
    </>
  );
};

export default NuevoPassword;
