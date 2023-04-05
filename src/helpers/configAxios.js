import axios from "axios";

const clienteAxios = axios.create({
  baseURL: `${process.env.URL_BACKEND}/api`,
});

export default clienteAxios;
