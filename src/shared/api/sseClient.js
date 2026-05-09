import { URL_CONFIG } from "@/shared/config/config.js";

class SSEClient {
	constructor() {
		this.source = null;
		this.listeners = new Map();
		SSEClient.instance = this;
	}

	static getInstance() {
		if (!SSEClient.instance) {
			SSEClient.instance = new SSEClient();
		}
		return SSEClient.instance;
	}

	connect() {
		if (typeof window === "undefined" || !window.EventSource) {
			console.warn("EventSource is not supported in this environment.");
			return;
		}

		if (this.source) {
			return;
		}

		this.source = new EventSource(`${URL_CONFIG.API_URL}/events`);

		this.listeners.forEach((handlers, eventType) => {
			handlers.forEach((handler) => {
				this.source.addEventListener(eventType, handler);
			});
		});
	}

	disconnect() {
		if (this.source) {
			this.source.close();
			this.source = null;
		}
	}

	subscribe(eventType, callback) {
		const handler = (event) => {
			try {
				const data = JSON.parse(event.data);
				callback(data);
			} catch (error) {
				console.error(`Error parsing SSE data for ${eventType}:`, error);
			}
		};

		if (!this.listeners.has(eventType)) {
			this.listeners.set(eventType, new Set());
		}
		this.listeners.get(eventType).add(handler);

		if (this.source) {
			this.source.addEventListener(eventType, handler);
		}

		return () => {
			const handlers = this.listeners.get(eventType);
			if (handlers) {
				handlers.delete(handler);
			}
			if (this.source) {
				this.source.removeEventListener(eventType, handler);
			}
		};
	}
}

export const sseClient = SSEClient.getInstance();
