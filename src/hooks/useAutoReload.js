import { useEffect, useRef } from "react";

export default function useAutoReload(timeoutMs = 5 * 60 * 1000) {
	const lastLeaveTime = useRef(null);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === "hidden") {
				lastLeaveTime.current = Date.now();
			} else if (document.visibilityState === "visible") {
				if (lastLeaveTime.current) {
					const now = Date.now();
					const timeAway = now - lastLeaveTime.current;

					if (timeAway > timeoutMs) {
						console.log("Session expired while away. Reloading...");
						window.location.reload();
					}
				}
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [timeoutMs]);
}
