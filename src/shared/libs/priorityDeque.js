export class PriorityDeque {
	constructor() {
		this.items = [];
		this.count = 0;
	}

	get size() {
		return this.items.length;
	}

	isEmpty() {
		return this.size === 0;
	}

	enqueue(item, priority = 0) {
		this.items.push({ item, priority, order: this.count++ });
		this.items.sort((a, b) => {
			if (a.priority !== b.priority) {
				return b.priority - a.priority;
			}
			b.order - a.order;
		});
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
