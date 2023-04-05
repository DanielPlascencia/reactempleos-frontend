import axios from "axios";

const URL = process.env.URL_BACKEND || "http://localhost:5000/api";

const clienteAxios = axios.create({
  baseURL: URL,
});

export default clienteAxios;
