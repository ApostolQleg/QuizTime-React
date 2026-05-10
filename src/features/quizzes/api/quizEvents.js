import { getQuizzesListState } from "@/features/quizzes/stores/quizzesListStore.js";

const getQuizId = (quiz) => {
	if (typeof quiz === "string" || typeof quiz === "number") return quiz;
	return quiz?._id ?? quiz?.id ?? quiz?.quizId ?? null;
};

const getQuizPayload = (data) => data?.quiz ?? data?.item ?? data;

const normalizeQuiz = (rawQuiz, existingQuiz = {}) => {
	const normalized = {
		...existingQuiz,
		...rawQuiz,
	};

	if (Array.isArray(rawQuiz.questions)) {
		normalized.questionsCount = rawQuiz.questions.length;
		delete normalized.questions;
	} else if (rawQuiz.questionsCount !== undefined) {
		normalized.questionsCount = rawQuiz.questionsCount;
	} else if (existingQuiz.questionsCount !== undefined) {
		normalized.questionsCount = existingQuiz.questionsCount;
	} else {
		normalized.questionsCount = 0;
	}

	return normalized;
};

export const handleQuizCreated = (data) => {
	const rawQuiz = getQuizPayload(data);
	console.log("Received SSE message QUIZ_CREATED:", rawQuiz);

	if (typeof rawQuiz !== "object" || rawQuiz === null || !getQuizId(rawQuiz)) {
		console.warn("CREATE_QUIZ: expected whole quiz object, not", rawQuiz);
		return;
	}

	const normalizedQuiz = normalizeQuiz(rawQuiz);
	const { upsertItem } = getQuizzesListState().actions;
	upsertItem(normalizedQuiz);

	console.log("Created quiz:", normalizedQuiz);
};

export const handleQuizUpdated = (data) => {
	const rawQuiz = getQuizPayload(data);
	console.log("Received SSE message QUIZ_UPDATED:", rawQuiz);

	if (typeof rawQuiz !== "object" || rawQuiz === null || !getQuizId(rawQuiz)) {
		console.warn("UPDATE_QUIZ: expected whole quiz object, not", rawQuiz);
		return;
	}

	const { items } = getQuizzesListState();
	const existingQuiz = items.find((item) => getQuizId(item) === getQuizId(rawQuiz));

	const normalizedQuiz = normalizeQuiz(rawQuiz, existingQuiz);
	const { upsertItem } = getQuizzesListState().actions;
	upsertItem(normalizedQuiz);

	console.log("Updated quiz:", normalizedQuiz);
};

export const handleQuizDeleted = (data) => {
	console.log("Received SSE message QUIZ_DELETED:", data);
	const quiz = getQuizPayload(data);
	const quizId = getQuizId(quiz);

	if (quizId === null) return;
	const { removeItem } = getQuizzesListState().actions;
	removeItem(quizId);

	console.log("Deleted quiz by id:", data);
};
