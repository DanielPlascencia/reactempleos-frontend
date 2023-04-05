import axios from "axios";

const clienteAxios = axios.create({
  baseURL: `${process.env.URL_BACKEND}`,
});

export default clienteAxios;
