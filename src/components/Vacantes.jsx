import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import formatearDinero from "../helpers/formatearDinero";

const Vacantes = (props) => {
  const { _id, nombre, salario, empresa } = props.vacante;

  const [hayLogo, setHayLogo] = useState(false);
  const [rutaLogo, setRutaLogo] = useState("");

  useEffect(() => {
    if (empresa?.logoEmpresa?.length > 0) {
      setRutaLogo(`http://localhost:5000/${empresa?.logoEmpresa}`);
      setHayLogo(true);
    } else {
      setHayLogo(false);
    }
  }, [rutaLogo.length > 0]);

  return (
    <div className="flex movilS:flex-col tablet:flex-row justify-center items-center gap-3 px-7 py-5 border rounded-xl border-blue-600 h-fit movilS:w-11/12 desktop:w-6/12">
      <div className="flex flex-col justify-center gap-3 w-full">
        <p className="self-center font-bold text-blue-600 text-3xl">{nombre}</p>
        <p>
          Salario: <span className="font-bold">{formatearDinero(salario)}</span>
        </p>
        <p>
          Empresa: <span className="font-bold">{empresa?.empresa}</span>
        </p>
        <p>
          País: <span className="font-bold">{empresa?.pais}</span>
        </p>
        <Link
          to={`/vacante/mostrar-vacante/${_id}`}
          className="border-2 rounded-2xl w-fit py-2 px-4 font-bold border-blue-700 bg-blue-600 hover:text-blue-600 hover:border-gray-700 hover:bg-white"
        >
          Más Información
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center w-full tablet:justify-end">
        {hayLogo ? (
          <img
            src={rutaLogo}
            alt="logo estatico"
            className="border-2 border-blue-600 rounded-lg object-contain movilS:w-44 movilL:w-56 laptop:w-72 desktop:w-80 desktopL:w-96 movilS:h-44 movilL:h-56 laptop:h-72 desktop:h-80 desktopL:h-96"
          />
        ) : (
          <p className="flex justify-center items-center font-bold text-red-600 border-blue-600 border-2 px-7 py-7 rounded-lg movilS:w-44 movilL:w-56 laptop:w-72 desktop:w-80 desktopL:w-96 movilS:h-44 movilL:h-56 laptop:h-72 desktop:h-80 desktopL:h-96">
            NO HAY UN LOGO DISPONIBLE
          </p>
        )}
      </div>
    </div>
  );
};

export default Vacantes;
