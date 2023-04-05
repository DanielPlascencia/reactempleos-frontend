import { useEffect } from "react";
import { useParams } from "react-router-dom";

const MisMensajes = () => {
  //* Obtener mi id.
  const { id } = useParams();

  useEffect(() => {
    //TODO: COMPROBAR QUE EL ID DEL PARAMETRO Y EL ID DEL USUARIO LOGEADO SON IGUALES, PARA PODER DARLE ACCESO A ESTA PAGINA.
  }, []);
  return <div>MisMensajes</div>;
};

export default MisMensajes;
