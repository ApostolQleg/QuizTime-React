export class Queue {
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
		return [...this.items];
	}

	enqueue(item) {
		return this.items.push(item);
	}

	dequeue() {
		if (this.isEmpty()) return null;
		return this.items.shift();
	}

	peek() {
		if (this.isEmpty()) return null;
		return this.items[0];
	}
}
