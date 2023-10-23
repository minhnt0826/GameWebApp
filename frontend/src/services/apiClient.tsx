import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "eb21665d3d15440fac669ef4bbb42eb4",
  },
});

export default apiClient;
