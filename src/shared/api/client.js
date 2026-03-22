import { URL_CONFIG } from "../config/config";

export const API_URL = URL_CONFIG.API_URL;
export const AUTH_URL = URL_CONFIG.AUTH_URL;

export function getHeaders() {
	const headers = { "Content-Type": "application/json" };
	const token = localStorage.getItem("token");
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
	}
	return headers;
}
