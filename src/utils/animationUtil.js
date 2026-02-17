import { generator } from "./generator.js";

export function startColorAnimation(onUpdateReactState, onFinishReactState) {
	const color = generator();
	const duration = 2000;

	const startColor = color.next().value;
	let targetColor = color.next().value;

	if (targetColor - startColor > 180) {
		targetColor -= 360;
	} else if (startColor - targetColor > 180) {
		targetColor += 360;
	}
	const colorDifference = targetColor - startColor;

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
