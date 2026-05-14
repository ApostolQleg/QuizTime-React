import client from "@/shared/api/apiClient.js";
import { LogLevel, withLogger } from "@/shared/libs/logger.js";

const rawGetQuizList = (skip = 0, limit = 36, search = "", sort = "newest", authorId = "") => {
	return client.get("/quizzes", {
		params: {
			skip,
			limit,
			sort,
			search: search || undefined,
			authorId: authorId || undefined,
		},
	});
};

const rawCreateQuiz = (data) => client.post("/quizzes", data);

const rawUpdateQuiz = async (id, data) => {
	const response = await client.put(`/quizzes/${id}`, data);
	invalidateQuizCache(id);
	return response;
};

const rawDeleteQuiz = async (id) => {
	const response = await client.delete(`/quizzes/${id}`);
	invalidateQuizCache(id);
	return response;
};

const quizCache = new Map();

export const invalidateQuizCache = (id) => {
	if (quizCache.has(id)) {
		quizCache.delete(id);
		console.log(`[Proxy] Delete quiz ${id} from cache`);
	}
};

const rawGetQuizById = (id) => client.get(`/quizzes/${id}`);

const proxiedGetQuizById = new Proxy(rawGetQuizById, {
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

export const getQuizList = withLogger(rawGetQuizList, {
	level: LogLevel.INFO,
	actionName: "getQuizList",
});

export const createQuiz = withLogger(rawCreateQuiz, {
	level: LogLevel.DEBUG,
	actionName: "createQuiz",
});

export const getQuizById = withLogger(proxiedGetQuizById, {
	level: LogLevel.INFO,
	actionName: "getQuizById",
});

export const updateQuiz = withLogger(rawUpdateQuiz, {
	level: LogLevel.INFO,
	actionName: "updateQuiz",
});

export const deleteQuiz = withLogger(rawDeleteQuiz, {
	level: LogLevel.ERROR,
	actionName: "deleteQuiz",
});
