import { useAuthStore } from "@/features/auth/stores/authStore.js";

export const useAuth = (selector = (state) => state) => {
	return useAuthStore(selector);
};
