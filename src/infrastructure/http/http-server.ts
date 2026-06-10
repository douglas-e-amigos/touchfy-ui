import axios from "axios";

const publicHttpServer = axios.create({
  baseURL: process.env.BACKEND_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

publicHttpServer.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) console.log("Não autorizado");

    return Promise.reject(error);
  },
);

export default publicHttpServer;
