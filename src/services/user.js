import { API_URL, getHeaders } from "./api.js";

export async function verifySession() {
	const res = await fetch(`${API_URL}/user`, {
		method: "GET",
		headers: getHeaders(),
	});

	const json = await res.json();
	if (!res.ok) throw new Error("Session invalid");
	return json;
}
