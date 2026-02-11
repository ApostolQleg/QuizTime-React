import { API_URL, getHeaders } from "./api";

export async function getResults(skip = 0, limit = 36) {
	const res = await fetch(`${API_URL}/results?skip=${skip}&limit=${limit}`, {
		headers: getHeaders(),
	});

	const json = await res.json();
	if (!res.ok) throw new Error("Failed to load results");
	return json;
}

export async function getResultById(id) {
	const res = await fetch(`${API_URL}/results/${id}`, {
		headers: getHeaders(),
	});

	const json = await res.json();
	if (!res.ok) throw new Error("Failed to load result details");
	return json;
}

export async function saveResult(resultData) {
	const res = await fetch(`${API_URL}/results`, {
		method: "POST",
		headers: getHeaders(),
		body: JSON.stringify(resultData),
	});

	const json = await res.json();
	if (!res.ok) {
		if (res.status === 403) {
			console.warn("User not logged in, result not saved");
			return null;
		}
		throw new Error("Failed to save result");
	}
	return json;
}
