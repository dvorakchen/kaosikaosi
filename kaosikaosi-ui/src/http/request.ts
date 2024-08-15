import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const HEADER_APPLICATION_JSON = {
  "Content-Type": "application/json",
};

export const HEADER_FORM_DATA = {
  "Content-Type": "multipart/form-data",
};

export const req = axios.create({
  baseURL: API_URL + "api",
  headers: HEADER_APPLICATION_JSON,
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
