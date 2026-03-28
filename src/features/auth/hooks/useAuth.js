import { useContext } from "react";
import { AuthContext } from "@/app/providers/AuthContext.jsx";

export const useAuth = () => {
	return useContext(AuthContext);
};
