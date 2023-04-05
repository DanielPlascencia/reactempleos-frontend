const formatearDinero = (dinero) => {
  dinero = parseInt(dinero);

  const formateado = dinero.toLocaleString("en", {
    style: "currency",
    currency: "MXN",
  });

  return formateado;
};

export default formatearDinero;
