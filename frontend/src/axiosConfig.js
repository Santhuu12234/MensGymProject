import axios from "axios";

const api = axios.create({
  baseURL: "https://gymmernproject-backend.onrender.com", // Render backend URL
});

export default api;
