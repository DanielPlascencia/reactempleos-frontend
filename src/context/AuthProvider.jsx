import { useState, useEffect, createContext } from "react";
import clienteAxios from "../helpers/configAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //* Declaración de state global.
  const [datosUsuario, setDatosUsuario] = useState({});
  const [alertaAtencion, setAlertaAtencion] = useState(false);
  const [usuarioLogeado, setUsuarioLogeado] = useState({});
  const [cargando, setCargando] = useState(true);
  const [empresas, setEmpresas] = useState([]);

  const obtenerEmpresas = async () => {
    const respuesta = await clienteAxios.get("/empresa/mostrar-empresas");

    setEmpresas(respuesta.data);
  };

  return (
    <AuthContext.Provider
      value={{
        datosUsuario,
        alertaAtencion,
        usuarioLogeado,
        cargando,
        empresas,

        setDatosUsuario,
        setAlertaAtencion,
        setUsuarioLogeado,
        setCargando,

        obtenerEmpresas,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
