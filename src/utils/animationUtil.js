import { generator } from "./generator.js";

export function startColorAnimation(onUpdateReactState, onFinishReactState, initialColor) {
	const color = generator();
	const duration = 2000;

	const startColor = initialColor
		? parseInt(initialColor.split("(")[1].split(",")[0])
		: color.next().value;
	let targetColor = color.next().value;

	let colorDifference = Math.abs(targetColor - startColor);

	if (colorDifference < 180) {
		if (targetColor > startColor) {
			targetColor -= 360;
		} else {
			targetColor += 360;
		}
		colorDifference = Math.abs(targetColor - startColor);
	}

	let startTime = null;
	let animationFrameId;

	const step = (timestamp) => {
		if (!startTime) startTime = timestamp;

		const elapsed = timestamp - startTime;
		const progress = Math.min(elapsed / duration, 1);

		const currentColor = startColor + colorDifference * progress;
		const color = `hsl(${currentColor}, 90%, 55%)`;

		onUpdateReactState(color);

		if (progress < 1) {
			animationFrameId = requestAnimationFrame(step);
		} else {
			onFinishReactState(color);
		}
	};

	animationFrameId = requestAnimationFrame(step);

	return () => cancelAnimationFrame(animationFrameId);
}
