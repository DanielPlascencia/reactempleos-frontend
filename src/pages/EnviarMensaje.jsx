import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EnviarMensaje = () => {
  //* Obtener id del usuario al que se le va a enviar el mensaje
  const { id } = useParams();

  // useEffect(() => {
  // TODO: OBTENER EL PERFIL DEL USUARIO PARA MANDARLE EL MENSAJE.
  //TODO: HACER OTRA RUTA, Y OTRO MODELO DE MENSAJES, DONDE SE GUARDARA: USUARIO REMITENTE, USUARIO EMISOR Y EL MENSAJE.
  // }, []);

  return <div>EnviarMensaje</div>;
};

export default EnviarMensaje;
