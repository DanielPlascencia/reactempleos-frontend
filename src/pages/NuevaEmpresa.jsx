import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import Forbidden from "../components/Forbidden";
import clienteAxios from "../helpers/configAxios";
import useAuth from "../hooks/useAuth";

const NuevaEmpresa = () => {
  const navigate = useNavigate();
  const { cargando, setCargando } = useAuth();

  const [nuevaEmpresa, setNuevaEmpresa] = useState({});
  const [esEmpleado, setEsEmpleado] = useState();
  const [alerta, setAlerta] = useState("");
  const [errorAlerta, setErrorAlerta] = useState(false);
  const [usuarioLoegado, setUsuarioLogeado] = useState({});

  useEffect(() => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }

      const comprobarUsuario = async () => {
        const respuesta = await clienteAxios.post(
          `/auth/decodificar-token/${token}`
        );

        setUsuarioLogeado(respuesta.data);

        if (respuesta.data.rol === "Empleado") {
          setEsEmpleado(true);
        }
      };

      comprobarUsuario();
      obtenerEmpresas();
    } catch (error) {
      setAlerta(error);
      setErrorAlerta(true);
    }
    setCargando(false);
  }, [usuarioLoegado?._id]);

  const almacenarDatos = async (e) => {
    e.preventDefault();

    try {
      setNuevaEmpresa({ ...nuevaEmpresa, reclutador: usuarioLoegado._id });

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

  {
    return esEmpleado ? (
      <Forbidden alerta={false} btnCrearEmpresa={false} />
    ) : (
      <div className="flex flex-col justify-center items-center w-full h-screen gap-7">
        <h1 className="font-extrabold text-center movilS:text-5xl movilL:text-6xl tablet:text-8xl desktopL:text-9xl">
          <span className="text-blue-600">react</span>Empleos
        </h1>
        <div className="border-2 rounded-3xl movilS:w-11/12 tablet:w-10/12 laptop:w-8/12 desktop:w-7/12 desktopL:w-6/12">
          <>
            <p className="text-center text-xl px-2 flex flex-col movilS:text-sm movilL:text-lg tablet:text-3xl desktopL:text-5xl">
              <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-6xl desktopL:text-9xl">
                Crear Empresa
              </span>
              Crea una empresa y empieza a publicar las vacantes
            </p>

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
        </div>
      </div>
    );
  }
};

export default NuevaEmpresa;
