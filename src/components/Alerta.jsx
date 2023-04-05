const Alerta = ({ mensaje, error }) => {
  return (
    <p
      className={`w-full text-blue-700 ${
        error ? "bg-red-400" : "bg-green-400"
      }  font-bold text-center movilS:text-lg movilL:text-lg desktopL:text-5xl rounded-xl mt-2`}
    >
      {mensaje}
    </p>
  );
};

export default Alerta;
