import { useAuthStore } from "@/features/auth/stores/authStore.js";

export const useAuth = () => {
	return useAuthStore();
};
