import { useState } from "react";

export default function Avatar({ src, name, size = "md", className = "" }) {
	const [error, setError] = useState(false);

	const sizeClasses = {
		sm: "w-8 h-8 text-xs",
		md: "w-10 h-10 text-sm",
		lg: "w-20 h-20 text-2xl",
		xl: "w-32 h-32 text-4xl",
	};

	if (!src || error) {
		const initial = name ? name.charAt(0).toUpperCase() : "U";
		return (
			<div
				className={`${sizeClasses[size]} ${className} rounded-full bg-(--col-primary) text-(--col-text-main) flex items-center justify-center font-bold select-none`}
			>
				{initial}
			</div>
		);
	}

	const secureSrc = src.replace("http://", "https://");

	return (
		<img
			src={secureSrc}
			alt={name || "User avatar"}
			className={`${sizeClasses[size]} ${className} rounded-full object-cover bg-(--col-bg-input)`}
			referrerPolicy="no-referrer"
			onError={() => setError(true)}
		/>
	);
}
