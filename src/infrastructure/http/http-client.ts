import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || "/api";

const httpClient = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: true,
});

export default httpClient;
