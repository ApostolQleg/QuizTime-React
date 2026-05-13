import { useEffect } from "react";
import { sseClient } from "@/shared/api/sseClient.js";

export function useSSE(eventType, callback) {
	useEffect(() => {
		if (!eventType || typeof callback !== "function") return;

		const unsubscribe = sseClient.subscribe(eventType, callback);

		return () => {
			unsubscribe();
		};
	}, [eventType, callback]);
}
