import axios from "axios";

// Shared Axios instance so every API call uses the same backend URL.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

// ✅ Automatically attach token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
