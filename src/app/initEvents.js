import {
	handleQuizCreated,
	handleQuizDeleted,
	handleQuizUpdated,
} from "@/features/quizzes/api/quizEvents";
import { sseClient } from "@/shared/api/sseClient.js";

export const initGlobalEvents = () => {
	sseClient.subscribe("CREATE_QUIZ", handleQuizCreated);
	sseClient.subscribe("UPDATE_QUIZ", handleQuizUpdated);
	sseClient.subscribe("DELETE_QUIZ", handleQuizDeleted);
};
