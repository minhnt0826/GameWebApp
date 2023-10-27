import axios from "axios";

const backendClient = axios.create({
  baseURL: "https://localhost:8000/api",
});

export default backendClient;
