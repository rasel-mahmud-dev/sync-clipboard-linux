import axios from "axios";
export const backend = import.meta.env.DEV ? "http://localhost:3200" : "https://clipboard-api-two.vercel.app"

export const api = axios.create({
    baseURL: backend
})

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Brear ${token}`;
    return config;

})
