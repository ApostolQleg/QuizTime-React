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
			return a.order - b.order;
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

		let index = 0;

		if (type === "oldest") {
			for (let i = 1; i < this.size; i++) {
				if (this.items[i].order < this.items[index].order) {
					index = i;
				}
			}
			return this.items.splice(index, 1)[0].item;
		}

		if (type === "newest") {
			for (let i = 1; i < this.size; i++) {
				if (this.items[i].order > this.items[index].order) {
					index = i;
				}
			}
			return this.items.splice(index, 1)[0].item;
		}

		return null;
	}

	peek(type = "highest") {
		if (this.isEmpty()) return null;

		if (type === "highest") {
			return this.items[0].item;
		}

		if (type === "lowest") {
			return this.items[this.size - 1].item;
		}

		let index = 0;

		if (type === "oldest") {
			for (let i = 1; i < this.size; i++) {
				if (this.items[i].order < this.items[index].order) {
					index = i;
				}
			}
			return this.items[index].item;
		}

		if (type === "newest") {
			for (let i = 1; i < this.size; i++) {
				if (this.items[i].order > this.items[index].order) {
					index = i;
				}
			}
			return this.items[index].item;
		}

		return null;
	}
}
