import axios from "axios";

const URL = process.env.URL_BACKEND;

const clienteAxios = axios.create({
  baseURL: URL,
});

export default clienteAxios;
