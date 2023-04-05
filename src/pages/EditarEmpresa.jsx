import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import clienteAxios from "../helpers/configAxios";
import useAuth from "../hooks/useAuth";

import Spinner from "../components/Spinner";
import Forbidden from "../components/Forbidden";

const EditarEmpresa = () => {
  const { cargando, setCargando, usuarioLogeado } = useAuth();

  const { id } = useParams();
  const navigate = useNavigate();

  const [logo, setLogo] = useState("");
  const [datosEmpresa, setDatosEmpresa] = useState({});
  const [esEditable, setEsEditable] = useState(false);

  useEffect(() => {
    setCargando(true);
    try {
      const obtenerDatosEmpresa = async () => {
        const respuesta = await clienteAxios.get(
          `/empresa/mostrar-empresa/${id}`
        );
        setDatosEmpresa(respuesta.data);

        if (respuesta.data.reclutador._id === usuarioLogeado._id) {
          setEsEditable(true);
        } else {
          setEsEditable(false);
        }
      };
      obtenerDatosEmpresa();
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  }, []);

  const editarDatos = async (e) => {
    e.preventDefault();

    //* Crear un FORM DATA.
    const formData = new FormData();
    formData.append("empresa", datosEmpresa.empresa);
    formData.append("pais", datosEmpresa.pais);
    formData.append("estado", datosEmpresa.estado);
    formData.append("ubicacion", datosEmpresa.ubicacion);
    formData.append("urlEmpresa", datosEmpresa.urlEmpresa);
    formData.append("logoEmpresa", logo ? logo : datosEmpresa.logo);

    //* Almacenar en la DB.
    try {
      await clienteAxios.put(
        `/empresa/actualizar-empresa/${id}&${usuarioLogeado._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const leerLogo = (e) => {
    const archivo = e.target.value;
    if (
      archivo.split(".").lastIndexOf("png") !== archivo.split(".").length - 1 &&
      archivo.split(".").lastIndexOf("jpg") !== archivo.split(".").length - 1
    ) {
      e.target.value = null;
      return alert("Sólo está permitido subir imagenes PNG o JPG");
    }

    setLogo(e.target.files[0]);
  };

  const guardarCambios = (e) => {
    setDatosEmpresa({
      ...datosEmpresa,
      [e.target.name]: e.target.value,
    });
  };

  {
    return cargando ? (
      <Spinner />
    ) : esEditable ? (
      <>
        <p className="flex flex-col text-center movilS:text-sm movilL:text-lg tablet:text-3xl desktopL:text-5xl">
          <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-6xl desktopL:text-9xl">
            Editar Empresa
          </span>
        </p>

        <form
          className="w-full flex flex-col items-center my-5 gap-5"
          onSubmit={editarDatos}
        >
          <div className="w-5/6 lg:w-4/6 xl:w-3/6 flex flex-col items-center mx-11 gap-2">
            <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
              <input
                type="text"
                name="empresa"
                placeholder="Escribe el nombre de tu empresa"
                className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={guardarCambios}
                value={datosEmpresa.empresa}
              />
            </div>

            <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
              <input
                type="text"
                name="pais"
                placeholder="Escribe el pais"
                className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={guardarCambios}
                value={datosEmpresa.pais}
              />
            </div>

            <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
              <input
                type="text"
                name="estado"
                placeholder="Escribe el estado"
                className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={guardarCambios}
                value={datosEmpresa.estado}
              />
            </div>

            <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
              <input
                type="text"
                name="ubicacion"
                placeholder="Escribe la ubicacion"
                className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={guardarCambios}
                value={datosEmpresa.ubicacion}
              />
            </div>

            <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
              <input
                type="text"
                name="urlEmpresa"
                placeholder="Escribe la URL de tu empresa"
                className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={guardarCambios}
                value={datosEmpresa.urlEmpresa}
              />
            </div>
          </div>

          <div className="w-full flex justify-center px-4">
            <input
              type="file"
              name="logoEmpresa"
              onChange={leerLogo}
              className="file:flex tablet:file:inline w-fit file:rounded-full file:font-bold file:border-indigo-600 file:bg-indigo-600 file:text-white hover:file:bg-white hover:text-indigo-600"
            />
          </div>

          <input
            type="submit"
            value="Actualizar Empresa"
            className="self-center border-2 rounded-2xl w-fit mt-3 py-2 px-4 font-bold border-blue-700 bg-blue-600 hover:text-blue-600 hover:border-gray-700 hover:bg-white"
          />
        </form>
      </>
    ) : (
      <Forbidden alerta={false} />
    );
  }
};

export default EditarEmpresa;
