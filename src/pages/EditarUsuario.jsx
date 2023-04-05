import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Forbidden from "../components/Forbidden";
import Spinner from "../components/Spinner";
import clienteAxios from "../helpers/configAxios";
import useAuth from "../hooks/useAuth";

// TODO: FALTA HACER ESTE COMPONENTE.
const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { usuarioLogeado, cargando, setUsuarioLogeado, setCargando } =
    useAuth();
  const [esEditable, setEsEditable] = useState(false);
  const [usuario, setUsuario] = useState({});
  const [foto, setFoto] = useState("");
  const [cv, setCV] = useState("");

  useEffect(() => {
    try {
      setCargando(true);
      if (usuarioLogeado._id === id) setEsEditable(true);
      else return setEsEditable(false);

      const obtenerUsuario = async () => {
        const respuesta = await clienteAxios.get(
          `/usuarios/mostrar-usuario/${id}`
        );
        setUsuario(respuesta.data);
      };
      obtenerUsuario();
    } catch (error) {
      console.log(error);
    }
    setCargando(false);
  }, []);
  // console.log(usuario);

  const leerFoto = (e) => {
    const archivo = e.target.value;
    if (
      archivo.split(".").lastIndexOf("png") !== archivo.split(".").length - 1 &&
      archivo.split(".").lastIndexOf("jpg") !== archivo.split(".").length - 1
    ) {
      e.target.value = null;
      return alert("Sólo está permitido subir imagenes PNG o JPG");
    }

    setFoto(e.target.files[0]);
  };

  const leerCV = (e) => {
    const archivo = e.target.value;
    if (
      archivo.split(".").lastIndexOf("pdf") !==
      archivo.split(".").length - 1
    ) {
      e.target.value = null;
      return alert("Sólo está permitido subir imagenes PNG o JPG");
    }

    setCV(e.target.files[0]);
  };

  const leerDatos = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const editarDatos = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", usuario.nombre ? usuario.nombre : "");
    formData.append("telefono", usuario.telefono ? usuario.telefono : "");
    formData.append("foto", foto ? foto : usuario.foto);
    if (usuario.rol === "Empleado") formData.append("cv", cv ? cv : usuario.cv);

    formData.append("password", usuario.password);

    try {
      await clienteAxios.put(`/usuarios/editar-cuenta/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUsuarioLogeado(usuario);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  {
    //* NOMBRE, EMAIL, TELEFONO, PASSWORD, FOTO, CV.
    return cargando ? (
      <Spinner />
    ) : esEditable ? (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="flex justify-center items-end gap-2 text-center movilS:text-2xl movilL:text-3xl tablet:text-6xl desktopL:text-5xl">
          Editar
          <span className="text-blue-600 font-bold movilS:text-4xl tablet:text-7xl desktopL:text-9xl">
            Cuenta
          </span>
        </p>

        <form
          className="flex flex-col items-center my-5 gap-5 movilS:w-full laptop:w-8/12 desktop:w-7/12 desktopL:w-6/12"
          onSubmit={editarDatos}
        >
          <div className="w-5/6 lg:w-4/6 xl:w-3/6 flex flex-col items-center mx-11 gap-5">
            <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
              <input
                type="text"
                name="nombre"
                placeholder="Tu Nombre"
                className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={leerDatos}
                value={usuario.nombre ? usuario.nombre : ""}
              />
            </div>

            <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
              <input
                type="text"
                name="telefono"
                placeholder="Tu Telefono"
                className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={leerDatos}
                value={usuario.telefono ? usuario.telefono : ""}
              />
            </div>

            <div className="w-full flex items-center gap-1 movilL:gap-2 movilS:flex-wrap movilL:flex-nowrap">
              <input
                type="password"
                name="password"
                placeholder="Tu Password"
                className="bg-black border-2 flex-auto text-white border-blue-700 outline-none rounded-md pl-2 py-2 placeholder:text-white placeholder:pl-1 placeholder:text-sm tablet:text-2xl desktopL:text-4xl tablet:placeholder:text-2xl desktopL:placeholder:text-4xl"
                onChange={leerDatos}
              />
            </div>

            <div className="w-full flex flex-col tablet:items-center gap-2 px-4">
              <label className="font-bold text-blue-600 uppercase">
                Subir Foto
              </label>

              <input
                type="file"
                name="foto"
                onChange={leerFoto}
                className="file:flex tablet:file:inline file:w-fit file:rounded-full file:font-bold file:border-indigo-600 file:bg-indigo-600 file:text-white hover:file:bg-white hover:text-indigo-600"
              />
            </div>

            {usuario.rol === "Empleado" ? (
              <div className="w-full flex flex-col tablet:items-center gap-2 px-4">
                {/*  FALTA VALIDAR LA INPUT, QUE SOLO SE ACEPTE UN TIPO PDF */}
                <label className="font-bold text-blue-600 uppercase">
                  Subir Cv
                </label>

                <input
                  type="file"
                  name="cv"
                  onChange={leerCV}
                  className="file:flex tablet:file:inline file:w-fit file:rounded-full file:font-bold file:border-indigo-600 file:bg-indigo-600 file:text-white hover:file:bg-white hover:text-indigo-600"
                />
              </div>
            ) : null}
          </div>

          <input
            type="submit"
            value="Actualizar Cuenta"
            className="self-center border-2 rounded-2xl w-fit mt-3 py-2 px-4 font-bold border-blue-700 bg-blue-600 hover:text-blue-600 hover:border-gray-700 hover:bg-white"
          />
        </form>
      </div>
    ) : (
      <Forbidden alerta={false} />
    );
  }
};

export default EditarUsuario;
