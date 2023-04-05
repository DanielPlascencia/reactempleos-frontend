import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PublicLayout = () => {
  const navigate = useNavigate("");

  const [token, setToken] = useState("");

  //* Checar al cargar la pagina, si hay un token en LS.
  useEffect(() => {
    //* Comprobar si existe un token al iniciar la pagina.
    setToken(localStorage.getItem("token"));
    if (token) {
      navigate("/");
    }
  }, []);

  return token ? (
    navigate("/")
  ) : (
    <div className="flex flex-col justify-center items-center w-full h-screen gap-7">
      <h1 className="font-extrabold text-center movilS:text-5xl movilL:text-6xl tablet:text-8xl desktopL:text-9xl">
        <span className="text-blue-600">react</span>Empleos
      </h1>
      <div className="border-2 rounded-3xl movilS:w-11/12 tablet:w-10/12 laptop:w-8/12 desktop:w-7/12 desktopL:w-6/12">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
