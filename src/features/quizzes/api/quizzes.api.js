import client from "@/shared/api/apiClient.js";

export function getQuizzes(skip = 0, limit = 36, search = "", sort = "newest", authorId = "") {
	return client.get("/quizzes", {
		params: {
			skip,
			limit,
			sort,
			search: search || undefined,
			authorId: authorId || undefined,
		},
	});
}

export const createQuiz = (data) => client.post("/quizzes", data);

export const getQuizById = (id) => client.get(`/quizzes/${id}`);

export const updateQuiz = (id, data) => client.put(`/quizzes/${id}`, data);

export const deleteQuiz = (id) => client.delete(`/quizzes/${id}`);
