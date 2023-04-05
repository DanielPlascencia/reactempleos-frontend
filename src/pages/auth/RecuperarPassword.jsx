import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Alerta from "../../components/Alerta";

import clienteAxios from "../../helpers/configAxios";

const RecuperarPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState("");
  const [errorAlerta, setErrorAlerta] = useState(false);

  const enviarToken = async (e) => {
    e?.preventDefault();
    try {
      const respuesta = await clienteAxios.post("/auth/olvide-password", {
        email,
      });
      setAlerta(respuesta.data.msg);
      setErrorAlerta(false);

      setTimeout(() => {
        setAlerta("");

        navigate("/auth/iniciar-sesion");
      }, 6000);
    } catch (error) {
      console.log(error);
      setAlerta(error.response.data.message);
      setErrorAlerta(true);

      setTimeout(() => {
        setAlerta("");
      }, 6000);
    }
  };

  const almacenarEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <p className="flex flex-col text-center movilS:text-sm movilL:text-lg tablet:text-3xl desktopL:text-5xl">
        <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-6xl desktopL:text-9xl movilM:mb-2 desktopL:mb-6">
          Recuperar Cuenta
        </span>
        No pierdas tu acceso
      </p>

      {alerta ? <Alerta mensaje={alerta} error={errorAlerta} /> : null}

      <form
        className="flex flex-col items-center my-10 gap-5"
        onSubmit={enviarToken}
      >
        <div className="flex flex-col gap-4 movilS:w-11/12 tablet:w-7/12">
          <label
            htmlFor="email"
            className="movilS:text-xl tablet:text-3xl desktopL:text-5xl"
          >
            Escribe tu email
          </label>

          <input
            name="email"
            type="text"
            placeholder="Email"
            className="cursor-pointer w-full bg-black border-2 text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
            onChange={almacenarEmail}
          />
        </div>

        <input
          type="submit"
          value="Recuperar Contraseña"
          className="cursor-pointer bg-white text-blue-600 border-2 rounded-lg font-bold px-7 py-1 movilS:w-11/12 tablet:w-7/12 movilS:text-lg tablet:text-2xl desktopL:text-4xl desktopL:desktopL:mt-7"
        />
      </form>

      <div className="flex justify-around w-full text-center my-6 desktopL:my-12 tablet:text-xl desktopL:text-3xl">
        <Link to="/auth/iniciar-sesion">
          <p>
            Iniciar <span className="font-bold text-blue-600"> Sesión</span>
          </p>
        </Link>

        <Link to="/auth/crear-cuenta">
          <p>
            Crear <span className="font-bold text-blue-600"> Cuenta</span>
          </p>
        </Link>
      </div>
    </>
  );
};

export default RecuperarPassword;
