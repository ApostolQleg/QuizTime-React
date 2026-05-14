import client from "@/shared/api/apiClient.js";

export function getQuizList(skip = 0, limit = 36, search = "", sort = "newest", authorId = "") {
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

const quizCache = new Map();

export const invalidateQuizCache = (id) => {
	if (quizCache.has(id)) {
		quizCache.delete(id);
		console.log(`[Proxy] Delete quiz ${id} from cache`);
	}
};

const rawGetQuizById = (id) => client.get(`/quizzes/${id}`);

export const getQuizById = new Proxy(rawGetQuizById, {
	apply: async (target, thisArg, argList) => {
		const id = argList[0];

		if (quizCache.has(id)) {
			console.log(`[Proxy] Load quiz ${id} from cache`);
			return quizCache.get(id);
		}

		console.log(`[Proxy] Load quiz ${id} from server`);
		const response = await target.apply(thisArg, argList);

		quizCache.set(id, response);
		return response;
	},
});

export const updateQuiz = async (id, data) => {
	const response = await client.put(`/quizzes/${id}`, data);
	invalidateQuizCache(id);
	return response;
};

export const deleteQuiz = async (id) => {
	const response = await client.delete(`/quizzes/${id}`);
	invalidateQuizCache(id);
	return response;
};
