const API_URL = "https://quiztime-react-backend.vercel.app/api/storage";

export async function getStorage() {
	const res = await fetch(API_URL);

	if (!res.ok) {
		throw new Error("Failed to load quizzes");
	}

	return await res.json();
}

export async function setStorage(allData) {
	const res = await fetch(API_URL, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(allData),
	});

	if (!res.ok) {
		throw new Error("Failed to save quiz");
	}

	return await res.json();
}
