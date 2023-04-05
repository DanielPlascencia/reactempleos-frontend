import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import Forbidden from "../components/Forbidden";
import clienteAxios from "../helpers/configAxios";
import useAuth from "../hooks/useAuth";

const EditarVacante = () => {
  //* Obtener variables del provider.
  const { cargando, setCargando, usuarioLogeado } = useAuth();

  const navigate = useNavigate();
  const { id } = useParams();

  const [esEditable, setEsEditable] = useState(false);
  const [datosVacante, setDatosVacante] = useState({});
  const [errorAlerta, setErrorAlerta] = useState(true);
  const [mensajeAlerta, setMensajeAlerta] = useState("");

  useEffect(() => {
    setCargando(true);
    try {
      const obtenerVacante = async () => {
        const respuesta = await clienteAxios.get(
          `/vacantes/mostrar-vacante/${id}`
        );
        setDatosVacante(respuesta.data);

        if (respuesta.data.empresa.reclutador._id == usuarioLogeado._id) {
          setEsEditable(true);
        } else {
          setEsEditable(false);
        }
      };
      obtenerVacante();
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  }, []);

  const actualizarVacante = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await clienteAxios.put(
        `/vacantes/actualizar-vacante/${id}`,
        datosVacante
      );
      // console.log(respuesta.data);
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

  const leerDatos = (e) => {
    setDatosVacante({ ...datosVacante, [e.target.name]: e.target.value });
  };

  {
    return cargando ? (
      <Spinner />
    ) : esEditable ? (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="flex justify-center items-end gap-2 text-center movilS:text-2xl movilL:text-3xl tablet:text-6xl desktopL:text-5xl">
          Editar
          <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-7xl desktopL:text-9xl">
            Vacante
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
          onSubmit={actualizarVacante}
        >
          <div className="w-5/6 lg:w-4/6 xl:w-3/6 flex flex-col items-center mx-11 gap-5">
            <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre de la vacante"
                className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={leerDatos}
                value={datosVacante.nombre ? datosVacante.nombre : null}
              />
            </div>

            <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
              <input
                type="text"
                name="salario"
                placeholder="Salario"
                className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={leerDatos}
                value={datosVacante.salario ? datosVacante.salario : null}
              />
            </div>

            <select
              name="diasTrabajo"
              className="w-full bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
              onChange={leerDatos}
              value={datosVacante.diasTrabajo ? datosVacante.diasTrabajo : null}
            >
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
                value={
                  datosVacante.descripcion ? datosVacante.descripcion : null
                }
              />
            </div>
          </div>

          <input
            type="submit"
            value="Actualizar Vacante"
            className="uppercase self-center border-2 rounded-2xl w-fit mt-3 py-2 px-4 font-bold border-blue-700 bg-blue-600 hover:text-blue-600 hover:border-gray-700 hover:bg-white"
          />
        </form>
      </div>
    ) : (
      <Forbidden alerta={false} />
    );
  }
};

export default EditarVacante;
