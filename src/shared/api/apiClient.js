import axios from "axios";
import { URL_CONFIG } from "../config/config.js";

export const API_URL = URL_CONFIG.API_URL;
export const AUTH_URL = URL_CONFIG.AUTH_URL;

export const client = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

client.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

client.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		if (error.response) {
			const data = error.response.data;
			const errorMessage = data?.error || data?.message || data?.raw || "API Request Failed";

			const customError = new Error(errorMessage);
			customError.status = error.response.status;

			return Promise.reject(customError);
		}

		if (error.request) {
			return Promise.reject(new Error("No response received from the server"));
		}

		return Promise.reject(error);
	},
);

export default client;
