import client from "@/shared/api/client";

export async function getResults(skip = 0, limit = 36, search = "", sort = "newest") {
	const params = new URLSearchParams({ skip: String(skip), limit: String(limit), sort });
	if (search) params.append("search", search);

	return client.get(`/results?${params.toString()}`);
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
