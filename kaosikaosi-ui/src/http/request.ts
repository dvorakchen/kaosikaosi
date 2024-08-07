import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

let headers = new Headers();
headers.append("Content-Type", "application/json");

export const req = axios.create({
  baseURL: API_URL + "api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  validateStatus: (status) => {
    return status < 500;
  },
});

req.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error("ERROR! - ", error);
    return Promise.reject(error);
  }
);
