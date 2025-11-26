import { defaultQuizzes } from "./default-quizzes.js";

const STORAGE_KEY = "storage";
const SELECTED_KEY = "selected";

// Initialize storage if not present
export function initStorage() {
	if (!localStorage.getItem(STORAGE_KEY)) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultQuizzes));
	}
}

// Getting all quizzes (always fresh data)
export function getQuizzes() {
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
