import axios from "axios";
import Cookies from "js-cookie";
// import { API_URL_DEV } from "../config";
import { API_URL } from "../config"; //=> for online api

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
