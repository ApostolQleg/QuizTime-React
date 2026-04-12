import { useState } from "react";
import { useToastStore } from "./toastStore.js";

import { TOAST_CONFIG } from "@/shared/config/config.js";
const { TOAST_LIFETIME, TOAST_ANIM_TIME } = TOAST_CONFIG;

export default function Toast({ id, message }) {
	const removeToast = useToastStore((state) => state.removeToast);
	const [isExiting, setIsExiting] = useState(false);

	const handleClose = () => {
		setIsExiting(true);
		setTimeout(() => {
			removeToast(id);
		}, TOAST_ANIM_TIME);
	};

	const styles = {
		"--toast-lifetime": `${TOAST_LIFETIME}ms`,
		"--toast-anim-duration": `${TOAST_ANIM_TIME}ms`,
	};

	return (
		<div
			className={`pointer-events-auto relative flex items-start overflow-hidden rounded-xl border border-(--col-border) bg-(--col-bg-card) p-4 text-(--col-text-main) shadow-lg ${
				isExiting ? "animate-toast-out" : "animate-toast-in"
			}`}
			style={styles}
		>
			<div className="flex w-full items-start gap-3">
				<p className="flex-1 p-1 text-sm">{message}</p>

				<button
					onClick={handleClose}
					className="shrink-0 p-1 text-(--col-text-muted) transition-colors hover:text-(--col-text-main)"
					aria-label="Close"
				>
					✕
				</button>
			</div>
			<div className="absolute bottom-0 left-0 h-1 w-full bg-(--col-primary) opacity-60 animate-shrink" />
		</div>
	);
}
