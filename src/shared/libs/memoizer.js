export default class Memoizer {
	constructor() {
		this.cache = new Map();
	}

	memoize(fn) {
		return (...args) => {
			const key = JSON.stringify(args);

			const now = Date.now();
			const ttl = 10000;

			if (this.cache.has(key)) {
				const { data, timestamp } = this.cache.get(key);

				if (now - timestamp <= ttl) {
					return data;
				}
				this.cache.delete(key);
			}

			const result = fn(...args);
			this.cache.set(key, { data: result, timestamp: now });
			return result;
		};
	}
}
