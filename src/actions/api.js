import axios from "axios";

const api = axios.create({ baseURL: process.env.API_URL });

api.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(JSON.parse(JSON.stringify(error)));
  }
);

export default api;
