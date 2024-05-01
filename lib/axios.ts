import axios from "axios";

const api = axios.create({
  baseURL: "https://apis.codante.io/api/orders-api",
});

export default api;
