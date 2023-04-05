import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { usuarioLogeado } = useAuth();

  return (
    <div className="w-full py-2 px-16 text-center flex justify-end items-center gap-4 bg-blue-600 font-bold movilS:px-5 movilS:justify-evenly movilS:flex-wrap movilS:gap-1">
      {usuarioLogeado.rol === "Reclutador" ? (
        <Link
          to="/crear-vacante"
          className="border-2 flex-1 rounded-lg py-2 px-3 border-none bg-blue-700 text-white hover:text-blue-700 hover:bg-white"
        >
          Crear Vacante
        </Link>
      ) : null}

      <Link
        to="/ver-vacantes"
        className="border-2 flex-1 rounded-lg py-2 px-3 border-none bg-blue-700 text-white hover:text-blue-700 hover:bg-white"
      >
        Ver Vacantes
      </Link>
      <Link
        to="/ver-empresas"
        className="border-2 flex-1 rounded-lg py-2 px-3 border-none bg-blue-700 text-white hover:text-blue-700 hover:bg-white"
      >
        Ver Empresas
      </Link>

      {usuarioLogeado.rol === "Reclutador" ? (
        <Link
          to="/mi-empresa"
          className="border-2 flex-1 rounded-lg py-2 px-3 border-none bg-blue-700 text-white hover:text-blue-700 hover:bg-white"
        >
          Mi Empresa
        </Link>
      ) : (
        <Link
          to="/mi-perfil"
          className="border-2 flex-1 rounded-lg py-2 px-3 border-none bg-blue-700 text-white hover:text-blue-700 hover:bg-white"
        >
          Mi Perfil
        </Link>
      )}

      <Link
        to={`/mis-mensajes/${usuarioLogeado._id}`}
        className="border-2 flex-1 rounded-lg py-2 px-3 border-none bg-blue-700 text-white hover:text-blue-700 hover:bg-white"
      >
        Mensajes
      </Link>
    </div>
  );
};

export default Sidebar;
