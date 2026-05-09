import { useQuizzesListStore } from "@/features/quizzes/stores/quizzesListStore";

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

	if (typeof rawQuiz !== "object" || rawQuiz === null || !getQuizId(rawQuiz)) {
		console.warn("CREATE_QUIZ: expected whole quiz object, not ", rawQuiz);
		return;
	}

	const normalizedQuiz = normalizeQuiz(rawQuiz);
	console.log("Quiz created (normalized):", normalizedQuiz);
	useQuizzesListStore.getState().upsertItem(normalizedQuiz);
};

export const handleQuizUpdated = (data) => {
	const rawQuiz = getQuizPayload(data);

	if (typeof rawQuiz !== "object" || rawQuiz === null || !getQuizId(rawQuiz)) {
		console.warn("UPDATE_QUIZ: expected whole quiz object, not ", rawQuiz);
		return;
	}

	const store = useQuizzesListStore.getState();
	const existingQuiz = store.items.find((item) => getQuizId(item) === getQuizId(rawQuiz));

	const normalizedQuiz = normalizeQuiz(rawQuiz, existingQuiz);
	console.log("Quiz updated (normalized):", normalizedQuiz);
	store.upsertItem(normalizedQuiz);
};

export const handleQuizDeleted = (data) => {
	console.log("Quiz deleted:", data);
	const quiz = getQuizPayload(data);
	const quizId = getQuizId(quiz);

	if (quizId === null) return;

	useQuizzesListStore.getState().removeItem(quizId);
};
