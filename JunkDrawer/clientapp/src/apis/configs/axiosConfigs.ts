import axios from "axios"

const token = localStorage.getItem("jd-token")?.replace(/"/gi, '');
export const api = axios.create({
    withCredentials: true,
    baseURL: "https://localhost:44392/api",
    headers: {
        accept: "application/json",
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
    }
})

export const fileApi = axios.create({
    withCredentials: true,
    baseURL: "https://localhost:44392/api",
    headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`
    }
})