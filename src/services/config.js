import axios from "axios";

export const http = axios.create({
    baseURL: 'https://sonoplasta.onrender.com/'
})