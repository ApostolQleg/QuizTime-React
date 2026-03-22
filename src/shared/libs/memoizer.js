export default class Memoizer {
	constructor() {
		this.cache = new Map();
	}

	memoize(fn) {
		return (...args) => {
			const key = JSON.stringify(args);
			if (this.cache.has(key)) {
				return this.cache.get(key);
			}

			const result = fn(...args);
			this.cache.set(key, result);
			return result;
		};
	}
}
