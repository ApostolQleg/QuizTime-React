import client from "@/shared/api/apiClient.js";

export function getResults(skip = 0, limit = 36, search = "", sort = "newest") {
	return client.get("/results", {
		params: {
			skip,
			limit,
			sort,
			search: search || undefined,
		},
	});
}

export const getResultById = (id) => client.get(`/results/${id}`);

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
