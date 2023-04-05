import { BrowserRouter, Routes, Route } from "react-router-dom";

//! IMPORTAR CONTEXT --
import { AuthProvider } from "./context/AuthProvider";

//! IMPORTAR LAYOUTS --
import AuthLayout from "./Layout/AuthLayout";
import PublicLayout from "./Layout/PublicLayout";

//! IMPORTAR COMPONENTES PAGES.
//* PUBLIC
import Login from "./pages/auth/Login";
import RecuperarPassword from "./pages/auth/RecuperarPassword";
import CrearCuenta from "./pages/auth/CrearCuenta";
import ComprobarCuenta from "./pages/auth/ComprobarCuenta";
import NuevoPassword from "./components/NuevoPassword";

//* PAGES
import Inicio from "./pages/Inicio";
import MiPerfil from "./pages/MiPerfil";
import MiEmpresa from "./pages/MiEmpresa";
import MisMensajes from "./pages/MisMensajes";
import MisVacantes from "./pages/MisVacantes";
import EnviarMensaje from "./pages/EnviarMensaje";
import NuevaEmpresa from "./pages/NuevaEmpresa";
import NotFound from "./pages/NotFound";

//* USUARIO
import Usuario from "./pages/Usuario";
import EditarUsuario from "./pages/EditarUsuario";

//* VACANTES
import Vacante from "./components/Vacante";
import CrearVacante from "./pages/CrearVacante";
import EditarVacante from "./pages/EditarVacante";
import VerVacantes from "./pages/VerVacantes";
import VerVacantesEmpresa from "./pages/VerVacantesEmpresa";

//* EMPRESA
import CrearEmpresa from "./pages/auth/CrearEmpresa";
import EditarEmpresa from "./pages/EditarEmpresa";
import VerEmpresas from "./pages/VerEmpresas";
import VerEmpresa from "./pages/VerEmpresa";
import Postulaciones from "./pages/Postulaciones";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/auth" element={<PublicLayout />}>
            <Route path="/auth/iniciar-sesion" element={<Login />} />
            <Route path="/auth/crear-cuenta" element={<CrearCuenta />} />
            <Route
              path="/auth/recuperar-password"
              element={<RecuperarPassword />}
            />
            <Route
              path="/auth/comprobar-cuenta/:token"
              element={<ComprobarCuenta />}
            />
            <Route
              path="/auth/nuevo-password/:token"
              element={<NuevoPassword />}
            />
            <Route path="/auth/crear-empresa" element={<CrearEmpresa />} />
          </Route>
          //* -------------------------------------
          <Route exact path="/" element={<AuthLayout />}>
            <Route index element={<Inicio />} />
            <Route path="/mi-perfil" element={<MiPerfil />} />
            <Route path="/mi-empresa" element={<MiEmpresa />} />
            <Route path="/mis-vacantes/:id" element={<MisVacantes />} />
            {/* //TODO: FALTA TODO LO RELACIONADO A MENSAJES */}
            <Route path="/mis-mensajes/:id" element={<MisMensajes />} />
            <Route path="/enviar-mensaje/:id" element={<EnviarMensaje />} />
            //*-------------USUARIOS------------------
            <Route path="/usuario/perfil/:id" element={<Usuario />} />
            <Route path="/usuario/editar/:id" element={<EditarUsuario />} />
            //* ---------------VACANTES----------------
            <Route path="/crear-vacante" element={<CrearVacante />} />
            <Route path="/ver-vacantes" element={<VerVacantes />} />
            <Route path="/vacante/mostrar-vacante/:id" element={<Vacante />} />
            <Route
              path="/ver-vacantes-empresa/:id"
              element={<VerVacantesEmpresa />}
            />
            <Route
              path="/vacante/editar-vacante/:id"
              element={<EditarVacante />}
            />
            <Route
              path="/vacante/postulaciones/:id"
              element={<Postulaciones />}
            />
            //*--------------EMPRESAS-----------------
            <Route path="/ver-empresas" element={<VerEmpresas />} />
            <Route path="/empresa/:id" element={<VerEmpresa />} />
            <Route path="/empresa/editar/:id" element={<EditarEmpresa />} />
          </Route>
          <Route path="/aux/nueva-empresa" element={<NuevaEmpresa />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
