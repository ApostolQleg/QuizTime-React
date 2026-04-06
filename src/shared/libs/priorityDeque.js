export class PriorityDeque {
	constructor() {
		this.items = [];
	}

	get size() {
		return this.items.length;
	}

	isEmpty() {
		return this.size === 0;
	}

	enqueue(item, priority = 0) {
		this.items.push({ item, priority });
		this.items.sort((a, b) => b.priority - a.priority);
	}

	dequeue(type = "highest") {
		if (this.isEmpty()) return null;

		if (type === "highest") {
			return this.items.shift().item;
		}

		if (type === "lowest") {
			return this.items.pop().item;
		}

		return null;
	}

	peek(type = "lowest") {
		if (this.isEmpty()) return null;

		if (type === "highest") {
			return this.items[0].item;
		}

		if (type === "lowest") {
			return this.items[this.size - 1].item;
		}

		return null;
	}
}
