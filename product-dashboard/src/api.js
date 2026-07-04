import axios from "axios";

const api = axios.create({
    baseURL: "https://product-sentimental-analyzer.onrender.com"
});

export default api;