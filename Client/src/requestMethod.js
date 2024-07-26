import axios from "axios"

export const publicMethod = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
})

let userMethod = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})

userMethod.interceptors.request.use(function (config) {
    config.headers["token"] = `Bearer: ${JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user).currentUser?.token}`
    return config;
  });

export {userMethod}