import axios from "axios";

const backendClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

export default backendClient;
