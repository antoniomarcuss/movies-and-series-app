import axios from "axios";

const BaseUrlApi = import.meta.env.VITE_API;
export const httpClient = axios.create({
  baseURL: BaseUrlApi,
  headers: {
    "Content-Type": "application/json",
  },
});
