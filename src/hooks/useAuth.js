import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";

export const useAuth = () => {
	return useContext(AuthContext);
};
