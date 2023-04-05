import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import Forbidden from "../components/Forbidden";
import Spinner from "../components/Spinner";
import clienteAxios from "../helpers/configAxios";
import useAuth from "../hooks/useAuth";

const CrearVacante = () => {
  const navigate = useNavigate();
  const { usuarioLogeado, cargando, setCargando } = useAuth();

  const [permitirCrear, setPermitirCrear] = useState(false);
  const [idEmpresa, setIdEmpresa] = useState("");
  const [vacante, setVacante] = useState({});
  const [errorAlerta, setErrorAlerta] = useState(true);
  const [mensajeAlerta, setMensajeAlerta] = useState("");

  useEffect(() => {
    setCargando(true);
    try {
      if (usuarioLogeado.rol === "Reclutador") setPermitirCrear(true);
      else setPermitirCrear(false);

      const obtenerEmpresa = async () => {
        const resultado = await clienteAxios.get(
          `/empresa/mostrar-mi-empresa/${usuarioLogeado._id}`
        );
        setIdEmpresa(resultado.data._id);
      };
      obtenerEmpresa();
    } catch (error) {
      setMensajeAlerta(error);
      setErrorAlerta(true);
    }
    setCargando(false);
  }, []);

  const leerDatos = (e) => {
    setVacante({
      ...vacante,
      [e.target.name]: e.target.value,
    });
  };

  const crearVacante = async (e) => {
    e.preventDefault();
    if (vacante.diasTrabajo === "def") {
      setVacante({
        ...vacante,
        diasTrabajo: null,
      });
    }

    setVacante({ ...vacante, empresa: idEmpresa });

    try {
      const respuesta = await clienteAxios.post(
        "/vacantes/agregar-vacante",
        vacante
      );
      setMensajeAlerta(respuesta.data.msg);
      setErrorAlerta(false);

      setTimeout(() => {
        setMensajeAlerta("");
        setErrorAlerta(true);
        navigate("/ver-vacantes");
      }, 2500);
    } catch (error) {
      setMensajeAlerta(error.response.data.msg);
      setErrorAlerta(true);

      setTimeout(() => {
        setMensajeAlerta([]);
        setErrorAlerta(true);
      }, 1500);
    }
  };

  {
    return cargando ? (
      <Spinner />
    ) : permitirCrear ? (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="flex justify-center items-end gap-2 text-center movilS:text-2xl movilL:text-3xl tablet:text-6xl desktopL:text-5xl">
          Editar
          <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-7xl desktopL:text-9xl">
            Cuenta
          </span>
        </p>

        {mensajeAlerta?.length ? (
          typeof mensajeAlerta === "string" ? (
            <Alerta mensaje={mensajeAlerta} error={errorAlerta} />
          ) : (
            mensajeAlerta?.map((alerta, index) => (
              <Alerta key={index} mensaje={alerta.msg} error={errorAlerta} />
            ))
          )
        ) : null}

        <form
          className="flex flex-col items-center my-5 gap-5 movilS:w-full laptop:w-8/12 desktop:w-7/12 desktopL:w-6/12"
          onSubmit={crearVacante}
        >
          <div className="w-5/6 lg:w-4/6 xl:w-3/6 flex flex-col items-center mx-11 gap-5">
            <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre de la vacante"
                className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={leerDatos}
              />
            </div>

            <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
              <input
                type="text"
                name="salario"
                placeholder="Salario"
                className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={leerDatos}
              />
            </div>

            <select
              name="diasTrabajo"
              className="w-full bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
              defaultValue="def"
              onChange={leerDatos}
            >
              <option value="def" disabled>
                DÍAS DE TRABAJO
              </option>
              <option value="Lun-Vie">Lunes a Viernes</option>
              <option value="Lunes-Sabado">Lunes a Sabado</option>
              <option value="Sabado-Domingo">Sabado Y Domingo</option>
              <option value="Por Horas">Por Horas</option>
            </select>

            <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción de la vacante"
                className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={leerDatos}
              />
            </div>
          </div>

          <input
            type="submit"
            value="Crear Vacante"
            className="uppercase self-center border-2 rounded-2xl w-fit mt-3 py-2 px-4 font-bold border-blue-700 bg-blue-600 hover:text-blue-600 hover:border-gray-700 hover:bg-white"
          />
        </form>
      </div>
    ) : (
      <Forbidden alerta={false} />
    );
  }
};

export default CrearVacante;
