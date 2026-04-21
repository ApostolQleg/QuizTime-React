import { AUTH_URL, client } from "@/shared/api/client.js";

const omitEmpty = (obj) => {
	return Object.fromEntries(
		Object.entries(obj).filter(
			([, value]) => value !== undefined && value !== null && value !== "",
		),
	);
};

export const registerUser = (data) => {
	const payload = omitEmpty(data);
	return client.post(`${AUTH_URL}/register`, payload);
};

export const loginUser = (data) => {
	return client.post(`${AUTH_URL}/login`, data);
};

export const loginWithGoogle = async (credential) => {
	try {
		return await client.post(`${AUTH_URL}/google`, { token: credential });
	} catch (error) {
		if (error && error.status === 404) {
			throw new Error("USER_NOT_FOUND");
		}

		throw error;
	}
};

export const extractGoogleData = (credential) => {
	return client.post(`${AUTH_URL}/google-extract`, { token: credential });
};

export const sendVerificationCode = (email) => {
	return client.post(`${AUTH_URL}/send-code`, { email });
};

export const linkGoogleAccount = (credential) => {
	return client.post(`${AUTH_URL}/link-google`, { token: credential });
};
