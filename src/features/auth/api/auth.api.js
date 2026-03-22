import { client, AUTH_URL } from "@/shared/api/client.js";

export const registerUser = (data) => client.post(`${AUTH_URL}/register`, data);

export const loginUser = (data) => {
	return client.post(`${AUTH_URL}/login`, data);
};

export const loginWithGoogle = (credential) => {
	return client.post(`${AUTH_URL}/google`, { token: credential });
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
