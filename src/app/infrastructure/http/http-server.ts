import axios from "axios";

const httpServer = axios.create({
  baseURL: process.env.BACKEND_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

httpServer.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) console.log("Não autorizado");

    return Promise.reject(error);
  },
);

export default httpServer;
