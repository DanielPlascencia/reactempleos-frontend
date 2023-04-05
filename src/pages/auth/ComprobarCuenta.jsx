import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alerta from "../../components/Alerta";

import CuentaComprobada from "../../components/CuentaComprobada";

import clienteAxios from "../../helpers/configAxios";

const ComprobarCuenta = () => {
  const { token } = useParams();
  const tokens = token.split("&");

  const [tokenCompleto, setTokenCompleto] = useState("");
  const [tokenEsValido, setTokenEsValido] = useState(false);
  const [alerta, setAlerta] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const comprobarToken = async () => {
      const respuesta = await clienteAxios.post(
        `/auth/comprobar-token/${tokens[0]}.${tokens[1]}.${tokens[2]}`
      );

      setTokenEsValido(respuesta.data.tokenValido);
      setTokenCompleto(`${tokens[0]}.${tokens[1]}.${tokens[2]}`);

      if (respuesta.data.tokenValido === false) {
        setAlerta(respuesta.data.msg);
        setError(true);
        return;
      }

      setAlerta(respuesta.data.msg);
      setError(false);

      setTimeout(() => {
        setAlerta("");
      }, 1000);
    };
    try {
      comprobarToken();
    } catch (error) {
      setAlerta(error.response.data.msg);
      setError(true);
    }
  }, []);

  return tokenEsValido ? (
    <CuentaComprobada token={tokenCompleto} />
  ) : (
    <div className="mt-5">
      {alerta ? <Alerta mensaje={alerta} error={error} /> : null}
      <p className="flex flex-col text-center my-14 movilS:text-sm movilL:text-lg tablet:text-3xl desktopL:text-5xl">
        <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-6xl desktopL:text-9xl movilM:mb-2 desktopL:mb-6">
          El token no es válido
        </span>
        Por favor, intenta de nuevo
      </p>
    </div>
  );
};

export default ComprobarCuenta;
