import React from "react";
// TODO: FALTA HACER ESTE COMPONENTE.
const Usuario = () => {
  return (
    <div>
      <h2 className="flex flex-col items-center text-center text-6xl my-2 font-bold text-blue-600">
        {miEmpresa ? (
          <span className="bg-indigo-500 text-white ml-3 mt-1 top-0 text-xs font-bold rounded-xl px-2 py-1 ">
            Mi Perfil
          </span>
        ) : null}
        {empresa.empresa}
      </h2>
    </div>
  );
};

export default Usuario;
