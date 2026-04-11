export class Deque {
	constructor() {
		this.items = [];
	}

	get size() {
		return this.items.length;
	}

	isEmpty() {
		return this.size === 0;
	}

	toArray() {
		return this.items;
	}

	enqueue(item, type = "last") {
		if (type === "last") {
			this.items.push(item);
		}

		if (type === "first") {
			this.items.unshift(item);
		}
	}

	_findIndex(type) {
		if (type === "oldest") return 0;
		if (type === "newest") return this.size - 1;

		throw new TypeError(`Invalid type: "${type}". Expected: newest/oldest`);
	}

	dequeue(type = "oldest") {
		if (this.isEmpty()) return null;

		const index = this._findIndex(type);

		return this.items.splice(index, 1)[0];
	}

	peek(type = "oldest") {
		if (this.isEmpty()) return null;

		const index = this._findIndex(type);

		return this.items[index];
	}
}
