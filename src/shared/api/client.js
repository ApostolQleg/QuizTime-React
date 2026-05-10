import { URL_CONFIG } from "../config/config.js";

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

export class ApiClient {
	constructor(apiUrl = API_URL) {
		this.apiUrl = apiUrl;
	}

	parseResponse = async (response) => {
		const text = await response.text();
		if (!text) return {};

		try {
			return JSON.parse(text);
		} catch {
			return { raw: text };
		}
	};

	request = async (endpoint, options = {}) => {
		const url = endpoint.startsWith("http") ? endpoint : `${this.apiUrl}${endpoint}`;

		const config = {
			...options,
			headers: getHeaders(options.headers),
		};

		if (options.body && typeof options.body === "object") {
			config.body = JSON.stringify(options.body);
		}

		const response = await fetch(url, config);
		const data = await this.parseResponse(response);

		if (!response.ok) {
			const errorMessage = data.error || data.message || data.raw || "API Request Failed";
			const error = new Error(errorMessage);
			error.status = response.status;
			throw error;
		}

		return data;
	};

	get = (endpoint, options) => {
		return this.request(endpoint, { method: "GET", ...options });
	};

	post = (endpoint, body, options) => {
		return this.request(endpoint, { method: "POST", body, ...options });
	};

	put = (endpoint, body, options) => {
		return this.request(endpoint, { method: "PUT", body, ...options });
	};

	delete = (endpoint, options) => {
		return this.request(endpoint, {
			method: "DELETE",
			headers: { "Content-Type": undefined },
			...options,
		});
	};
}

export const client = new ApiClient();

export default client;
