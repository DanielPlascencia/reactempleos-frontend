import { useEffect, useState } from "react";
import Empresa from "../components/Empresa";
import useAuth from "../hooks/useAuth";

const VerEmpresas = () => {
  const { empresas, obtenerEmpresas, almacenarMiEmpresa } = useAuth();

  const [datosMiEmpresa, setDatosMiEmpresa] = useState({});

  useEffect(() => {
    obtenerEmpresas();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {empresas.map((empresa) => (
        <Empresa key={empresa._id} empresa={empresa} />
      ))}
    </div>
  );
};

export default VerEmpresas;
