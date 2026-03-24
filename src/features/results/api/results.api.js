import client from "@/shared/api/client.js";
import Memoizer from "@/shared/libs/memoizer.js";

const cache = new Memoizer();

function getAllResults(skip = 0, limit = 36, search = "", sort = "newest") {
	const params = new URLSearchParams({ skip: String(skip), limit: String(limit), sort });
	if (search) params.append("search", search);

	return client.get(`/results?${params.toString()}`);
}

export const getResults = cache.memoize(getAllResults, 180000);

const getResult = (id) => client.get(`/results/${id}`);

export const getResultById = cache.memoize(getResult);

export const clearAllResultsCache = () => {
	cache.clear(getAllResults);
	cache.clear(getResult);
};

export async function saveResult(resultData) {
	try {
		return await client.post("/results", resultData);
	} catch (error) {
		if (error.status === 403) {
			console.warn("User not logged in, result not saved");
		}
		throw error;
	}
}
