import { URL_CONFIG } from "@/shared/config/config.js";

class SSEClient {
	constructor() {
		this.source = null;
		this.listeners = new Map();
		this.nativeHandlers = new Map();
	}

	_connect() {
		if (!this.source || this.source.readyState === EventSource.CLOSED) {
			this.source = new EventSource(`${URL_CONFIG.API_URL}/events`);

			for (const [eventType, handler] of this.nativeHandlers.entries()) {
				this.source.addEventListener(eventType, handler);
			}
		}
	}

	_createNativeHandler(eventType) {
		return (event) => {
			try {
				if (!event.data) return;

				const parsedData = JSON.parse(event.data);
				const callbacks = this.listeners.get(eventType);

				if (callbacks) {
					callbacks.forEach((callback) => {
						callback(parsedData);
					});
				}
			} catch (error) {
				console.error(`[SSE] Failed to parse payload for ${eventType}:`, error);
			}
		};
	}

	subscribe(eventType, callback) {
		this._connect();

		if (!this.listeners.has(eventType)) {
			this.listeners.set(eventType, new Set());
		}
		this.listeners.get(eventType).add(callback);

		if (!this.nativeHandlers.has(eventType)) {
			const handler = this._createNativeHandler(eventType);
			this.nativeHandlers.set(eventType, handler);
			this.source.addEventListener(eventType, handler);
		}

		return () => this.unsubscribe(eventType, callback);
	}

	unsubscribe(eventType, callback) {
		const callbacks = this.listeners.get(eventType);
		if (!callbacks) return;

		callbacks.delete(callback);

		if (callbacks.size === 0) {
			this.listeners.delete(eventType);
			const handler = this.nativeHandlers.get(eventType);

			if (handler && this.source) {
				this.source.removeEventListener(eventType, handler);
			}
			this.nativeHandlers.delete(eventType);
		}
	}

	close() {
		if (this.source) {
			this.source.close();
			this.source = null;
		}
		this.listeners.clear();
		this.nativeHandlers.clear();
	}
}

export const sseClient = new SSEClient();
