import { create } from "zustand";
import { Queue } from "@/shared/libs/queue.js";

import { TOAST_CONFIG } from "@/shared/config/config.js";

const { MAX_TOASTS, TOAST_LIFETIME } = TOAST_CONFIG;

const queue = new Queue();
const timers = new Map();

export const useToastStore = create((set, get) => ({
	toasts: [],

	addToast: (message) => {
		const id = crypto.randomUUID();
		const newToast = { id, message };

		queue.enqueue(newToast);

		if (queue.size > MAX_TOASTS) {
			const removedToast = queue.dequeue();

			if (removedToast && timers.has(removedToast.id)) {
				clearTimeout(timers.get(removedToast.id));
				timers.delete(removedToast.id);
			}
		}

		set({ toasts: queue.toArray() });

		const timerId = setTimeout(() => {
			get().removeToast(id);
		}, TOAST_LIFETIME);

		timers.set(id, timerId);
	},

	removeToast: (id) => {
		if (timers.has(id)) {
			clearTimeout(timers.get(id));
			timers.delete(id);
		}

		queue.items = queue.items.filter((toast) => toast.id !== id);

		set({ toasts: queue.toArray() });
	},
}));
