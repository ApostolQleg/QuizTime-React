import { defaultTests } from "./default-tests.js";

const STORAGE_KEY = "storage";
const SELECTED_KEY = "selected";

// Initialize storage if not present
export function initStorage() {
	if (!localStorage.getItem(STORAGE_KEY)) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTests));
	}
}

// Getting all tests (always fresh data)
export function getTests() {
	initStorage();
	const storage = localStorage.getItem(STORAGE_KEY);
	return storage ? JSON.parse(storage) : [];
}

// Getting selected quiz
export function getSelected() {
	const selected = sessionStorage.getItem(SELECTED_KEY);
	return selected ? JSON.parse(selected) : null;
}

// Setting selected quiz
export function setSelected(quiz) {
	sessionStorage.setItem(SELECTED_KEY, JSON.stringify(quiz));
}
