import { create } from "zustand";
import { verifySession } from "@/features/profile/api/user.api.js";
import { isTokenExpired } from "@/shared/libs/jwt.js";

let sessionCheckPromise = null;
let sessionCheckedToken = null;

const getStoredUser = () => {
	try {
		const savedUser = localStorage.getItem("user");
		return savedUser ? JSON.parse(savedUser) : null;
	} catch (error) {
		console.error("Error parsing user from local storage", error);
		return null;
	}
};

const getStoredToken = () => localStorage.getItem("token") || null;

const persistAuth = (user, token) => {
	if (user) {
		localStorage.setItem("user", JSON.stringify(user));
	} else {
		localStorage.removeItem("user");
	}

	if (token) {
		localStorage.setItem("token", token);
	} else {
		localStorage.removeItem("token");
	}
};

export const useAuthStore = create((set, get) => ({
	user: getStoredUser(),
	token: getStoredToken(),
	isSessionChecking: false,

	login: (userData, authToken) => {
		persistAuth(userData, authToken);
		sessionCheckedToken = authToken;
		set({ user: userData, token: authToken });
	},

	logout: () => {
		sessionCheckPromise = null;
		sessionCheckedToken = null;
		persistAuth(null, null);
		set({ user: null, token: null, isSessionChecking: false });
	},

	checkSession: async ({ force = false } = {}) => {
		const { token, logout } = get();

		if (!token) return false;
		if (isTokenExpired(token)) {
			logout();
			return false;
		}

		if (!force && sessionCheckedToken === token) {
			return true;
		}

		if (sessionCheckPromise && !force) {
			return sessionCheckPromise;
		}

		set({ isSessionChecking: true });

		sessionCheckPromise = verifySession()
			.then((data) => {
				if (data?.user) {
					persistAuth(data.user, token);
					set({ user: data.user });
				}
				sessionCheckedToken = token;
				return true;
			})
			.catch(() => {
				logout();
				return false;
			})
			.finally(() => {
				sessionCheckPromise = null;
				set({ isSessionChecking: false });
			});

		return sessionCheckPromise;
	},
}));

export default useAuthStore;
