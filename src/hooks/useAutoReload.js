import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import { isTokenExpired } from "../utils/jwtUtil.js";

export default function useAutoReload(onRefresh, timeoutMs = 5 * 60 * 1000) {
	const lastLeaveTime = useRef(null);
	const location = useLocation();
	const { token, logout } = useAuth();

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === "hidden") {
				lastLeaveTime.current = Date.now();
			} else if (document.visibilityState === "visible") {
				if (lastLeaveTime.current) {
					const now = Date.now();
					const timeAway = now - lastLeaveTime.current;

					const isEditing =
						location.pathname.startsWith("/create") ||
						location.pathname.startsWith("/manage");

					if (timeAway > timeoutMs) {
						if (isEditing) {
							console.log(
								"Welcome back. Session refresh ignored to protect unsaved work.",
							);
							return;
						}

						if (isTokenExpired(token)) {
							console.log("Session expired. Logging out...");
							logout();
							return;
						}

						console.log("Updating data...");
						if (onRefresh) onRefresh();
					}
				}
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [timeoutMs, location.pathname, token, logout, onRefresh]);
}
