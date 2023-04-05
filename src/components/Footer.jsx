const Footer = () => {
  return (
    <div className="w-full bg-blue-800 h-fit py-1 px-2 flex movilS:justify-between movilS: desktop:justify-around">
      <p className="text-gray-500 text-center flex flex-col justify-center movilS:text-sm flex-1">
        <span className="text-white">CopyRight&#169; 2023 </span> Todos los
        derechos reservados
      </p>

      <div className="text-center flex flex-col justify-center items-center gap-2 flex-1">
        <p className="">Siguenos en Nuestras Redes Sociales:</p>
        <div className="flex gap-3">
          <i className="fa-brands fa-facebook" />
          <i className="fa-brands fa-twitter" />
          <i className="fa-brands fa-youtube" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
