import { URL_CONFIG } from "../config/config";

export const API_URL = URL_CONFIG.API_URL;
export const AUTH_URL = URL_CONFIG.AUTH_URL;

export function getHeaders(extraHeaders = {}) {
	const token = localStorage.getItem("token");

	const headers = {
		"Content-Type": "application/json",
		...(token && { Authorization: `Bearer ${token}` }),
		...extraHeaders,
	};

	return Object.fromEntries(Object.entries(headers).filter(([, value]) => value !== undefined));
}

async function parseResponse(response) {
	const text = await response.text();
	if (!text) return {};

	try {
		return JSON.parse(text);
	} catch {
		return { raw: text };
	}
}

async function request(endpoint, options = {}) {
	const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;

	const config = {
		...options,
		headers: getHeaders(options.headers),
	};

	if (options.body && typeof options.body === "object") {
		config.body = JSON.stringify(options.body);
	}

	const response = await fetch(url, config);
	const data = await parseResponse(response);

	if (!response.ok) {
		const errorMessage = data.error || data.message || data.raw || "API Request Failed";
		const error = new Error(errorMessage);
		error.status = response.status;
		throw error;
	}

	return data;
}

export const client = {
	get: (endpoint, options) => request(endpoint, { method: "GET", ...options }),
	post: (endpoint, body, options) => request(endpoint, { method: "POST", body, ...options }),
	put: (endpoint, body, options) => request(endpoint, { method: "PUT", body, ...options }),
	delete: (endpoint, options) => request(endpoint, { method: "DELETE", headers: { "Content-Type": undefined }, ...options }),
};

export default client;
