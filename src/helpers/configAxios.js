import axios from "axios";

const clienteAxios = axios.create({
  baseURL:
    "https://reactempleos-backend-r0m71aws3-danielplascencia.vercel.app/api",
});

export default clienteAxios;
