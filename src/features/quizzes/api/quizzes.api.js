import client from "@/shared/api/client.js";

export async function getQuizzes(
	skip = 0,
	limit = 36,
	search = "",
	sort = "newest",
	authorId = "",
) {
	const params = new URLSearchParams({ skip: String(skip), limit: String(limit), sort });
	if (search) params.append("search", search);
	if (authorId) params.append("authorId", authorId);

	return client.get(`/quizzes?${params.toString()}`);
}

export const createQuiz = (data) => client.post("/quizzes", data);

export const getQuizById = (id) => client.get(`/quizzes/${id}`);

export const updateQuiz = (id, data) => client.put(`/quizzes/${id}`, data);

export const deleteQuiz = (id) => client.delete(`/quizzes/${id}`);
