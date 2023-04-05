import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//! IMPORTAR COMPONENTES --
import Alerta from "../../components/Alerta";

import clienteAxios from "../../helpers/configAxios";

const Login = () => {
  //* Declaración del navigate, para la reedirecciòn.
  const navigate = useNavigate();

  //* Delcaraciones de STATES.
  const [usuario, setUsuario] = useState({});
  const [alerta, setAlerta] = useState("");
  const [error, setError] = useState(false);

  const iniciarSesion = async (e) => {
    e.preventDefault();

    try {
      const usuarios = await clienteAxios.post("/usuarios/login", usuario);

      setAlerta(usuarios.data.msg);
      setError(false);

      localStorage.setItem("token", usuarios.data.token);

      setTimeout(() => {
        setAlerta("");
        navigate("/");
      }, 1000);
    } catch (error) {
      setAlerta(error.response.data.msg);
      setError(true);

      setTimeout(() => {
        setAlerta("");
      }, 4000);
    }
  };

  const guardarValores = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <p className="flex flex-col text-center movilS:text-sm movilL:text-lg tablet:text-3xl desktopL:text-5xl">
        <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-6xl desktopL:text-9xl">
          Inicia Sesión{" "}
        </span>
        para encontrar tu empleo ideal
      </p>

      {alerta?.length ? <Alerta mensaje={alerta} error={error} /> : null}

      <form
        className="flex flex-col items-center mt-5 w-full gap-5"
        onSubmit={iniciarSesion}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="bg-blue-700 p-5 font-extrabold rounded-full movilS:w-5/12 movilL:w-4/12 tablet:w-2/12 desktopL:w-2/12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>

        <div className="flex flex-col gap-3 movilS:w-11/12 tablet:w-7/12 tablet:text-2xl desktopL:text-4xl desktopL:gap-5">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="w-full bg-black border-2 text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
            onChange={guardarValores}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-black border-2 text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
            onChange={guardarValores}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="cursor-pointer bg-white text-blue-600 border-2 rounded-lg font-bold px-7 py-1 movilS:w-11/12 tablet:w-7/12 movilS:text-lg tablet:text-2xl desktopL:text-4xl desktopL:desktopL:mt-7"
        />
      </form>

      <div className="flex justify-around w-full text-center my-6 desktopL:my-12 tablet:text-xl desktopL:text-3xl">
        <Link to="/auth/recuperar-password">
          <p>
            Recuperar
            <span className="font-bold text-blue-600"> Contraseña</span>
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

export default Login;
