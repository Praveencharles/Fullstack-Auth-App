import axios from "axios";

const API = axios.create({
  baseURL: "https://fullstack-auth-app-crp8.onrender.com/api",
});

export default API;