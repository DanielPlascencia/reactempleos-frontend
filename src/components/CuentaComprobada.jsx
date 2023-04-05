import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../helpers/configAxios";
import Alerta from "./Alerta";

const CuentaComprobada = ({ token }) => {
  const navigate = useNavigate();

  const [alerta, setAlerta] = useState("");
  const [errorAlerta, setErrorAlerta] = useState(false);

  useEffect(() => {
    const comprobarCuenta = async () => {
      try {
        const resultado = await clienteAxios.post(
          `/auth/comprobar-cuenta/${token}`
        );

        setAlerta(resultado.data.msg);
        setErrorAlerta(false);

        setTimeout(() => {
          setAlerta("");
          navigate("/auth/iniciar-sesion");
        }, 4000);
      } catch (error) {
        setAlerta(error.response.data.message);
        setErrorAlerta(true);

        setTimeout(() => {
          setAlerta("");
          navigate("/auth/iniciar-sesion");
        }, 4000);
      }
    };

    comprobarCuenta();
  }, []);

  return (
    <>
      {errorAlerta ? (
        <>
          {alerta ? <Alerta mensaje={alerta} error={errorAlerta} /> : null}
          <p className="flex flex-col text-center my-14 movilS:text-sm movilL:text-lg tablet:text-3xl desktopL:text-5xl">
            <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-6xl desktopL:text-9xl movilM:mb-2 desktopL:mb-6">
              Ha ocurrido un error
            </span>
            Intenta de nuevo
          </p>
        </>
      ) : (
        <>
          {alerta ? <Alerta mensaje={alerta} error={errorAlerta} /> : null}

          <p className="flex flex-col text-center my-14 movilS:text-sm movilL:text-lg tablet:text-3xl desktopL:text-5xl">
            <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-6xl desktopL:text-9xl movilM:mb-2 desktopL:mb-6">
              Comprobar Cuenta
            </span>
            La cuenta se ha comprobado con éxito.
          </p>
        </>
      )}
      ;
    </>
  );
};

export default CuentaComprobada;
