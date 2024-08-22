import axios from "axios"

export const api = axios.create({
    withCredentials: true,
    baseURL: "https://localhost:44392/api",
})