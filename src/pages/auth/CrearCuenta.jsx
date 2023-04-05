import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Alerta from "../../components/Alerta";

import clienteAxios from "../../helpers/configAxios";
import useAuth from "../../hooks/useAuth";

const CrearCuenta = () => {
  //* Declaraciòn del navigate.
  const navigate = useNavigate();

  //* Declaración del hook para el provider.
  const { setDatosUsuario, setAlertaAtencion } = useAuth();

  //* Delcaraciones de STATES.
  const [nuevoUsuario, setNuevoUsuario] = useState({});
  const [alerta, setAlerta] = useState([]);
  const [error, setError] = useState(false);

  const crearCuenta = async (e) => {
    e.preventDefault();

    try {
      const resultado = await clienteAxios.post(
        "usuarios/registrar-usuario/",
        nuevoUsuario
      );

      setAlerta(resultado.data.msg);
      setError(false);

      setTimeout(() => {
        setAlerta("");

        if (nuevoUsuario.rol === "Reclutador") {
          setDatosUsuario({ ...nuevoUsuario, id: resultado.data.id });

          setAlertaAtencion(true);
          navigate("/auth/crear-empresa");
          return;
        }

        navigate("/auth/iniciar-sesion");
      }, 2000);
    } catch (error) {
      setAlerta(error.response.data.msg);
      setError(true);

      setTimeout(() => {
        setAlerta("");
      }, 5000);
    }
  };

  const guardarDatos = (e) => {
    setNuevoUsuario({
      ...nuevoUsuario,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <p className="text-center text-xl px-2 flex flex-col movilS:text-sm movilL:text-lg tablet:text-3xl desktopL:text-5xl">
        <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-6xl desktopL:text-9xl">
          Crear Cuenta
        </span>
        Para que puedas buscar tu empleo ideal
      </p>

      {alerta?.length ? (
        typeof alerta === "string" ? (
          <Alerta mensaje={alerta} error={error} />
        ) : (
          alerta?.map((mostrarAlerta, index) => (
            <Alerta key={index} mensaje={mostrarAlerta.msg} error={error} />
          ))
        )
      ) : null}

      <form
        className="flex flex-col items-center my-5 gap-5"
        onSubmit={crearCuenta}
      >
        <div className="w-5/6 lg:w-4/6 xl:w-3/6 flex flex-col items-center mx-11 gap-2">
          <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
            <input
              type="email"
              name="email"
              placeholder="Escribe tu email"
              className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
              onChange={guardarDatos}
            />
          </div>

          <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilS:w-full movilL:flex-nowrap">
            <input
              type="text"
              name="nombre"
              placeholder="Escribe tu nombre"
              className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
              onChange={guardarDatos}
            />
          </div>

          <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilS:w-full movilL:flex-nowrap">
            <input
              type="password"
              name="password"
              placeholder="Escribe tu password"
              className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
              onChange={guardarDatos}
            />
          </div>

          <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilS:w-full movilL:flex-nowrap">
            <input
              type="password"
              name="repassword"
              placeholder="Repite tu password"
              className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
              onChange={guardarDatos}
            />
          </div>

          <select
            name="rol"
            className="w-full bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
            defaultValue="def"
            onChange={guardarDatos}
          >
            <option value="def" disabled>
              SELECCIONA UNA OPCIÒN
            </option>
            <option value="Reclutador">Reclutador</option>
            <option value="Empleado">Empleado</option>
          </select>
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
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

        <Link to="/auth/iniciar-sesion">
          <p>
            Iniciar <span className="font-bold text-blue-600"> Sesión</span>
          </p>
        </Link>
      </div>
    </>
  );
};

export default CrearCuenta;
