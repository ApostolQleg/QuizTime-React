import {
	handleQuizCreated,
	handleQuizDeleted,
	handleQuizUpdated,
} from "@/features/quizzes/api/quizEvents";
import { sseClient } from "@/shared/api/sseClient.js";

let unsubscribers = [];
let isInitialized = false;

export const initGlobalEvents = () => {
	if (isInitialized) {
		return;
	}

	unsubscribers.push(
		sseClient.subscribe("CREATE_QUIZ", handleQuizCreated),
		sseClient.subscribe("UPDATE_QUIZ", handleQuizUpdated),
		sseClient.subscribe("DELETE_QUIZ", handleQuizDeleted),
	);

	isInitialized = true;
};

export const cleanupGlobalEvents = () => {
	unsubscribers.forEach((unsubscribe) => {
		unsubscribe();
	});
	unsubscribers = [];
	isInitialized = false;
};

if (import.meta.hot) {
	import.meta.hot.dispose(() => {
		cleanupGlobalEvents();
	});
}
