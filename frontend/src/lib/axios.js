import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.mode === "development" ? "https://naseeb-eiyq.onrender.com/api" : "/api",
	withCredentials: true, 
});

export default axiosInstance;