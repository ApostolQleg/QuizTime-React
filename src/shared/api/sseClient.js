import { URL_CONFIG } from "@/shared/config/config.js";

class SSEClient {
	constructor() {
		this.source = new EventSource(`${URL_CONFIG.API_URL}/events`);
		SSEClient.instance = this;
	}

	static getInstance() {
		if (!SSEClient.instance) {
			SSEClient.instance = new SSEClient();
		}

		return SSEClient.instance;
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

		this.source.addEventListener(eventType, handler);

		return () => this.source.removeEventListener(eventType, handler);
	}
}

export const sseClient = SSEClient.getInstance();
