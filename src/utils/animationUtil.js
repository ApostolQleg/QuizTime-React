import { generator } from "./generator.js";

// linear interpolation function
const lerp = (start, end, t) => start + (end - start) * t;

export function startColorAnimation(onUpdateReactState, onFinishReactState) {
	const hueSource = generator();
	const duration = 2000;

	const startHue = hueSource.next().value;
	const targetHue = hueSource.next().value;

	let startTime = null;
	let animationFrameId;

	const step = (timestamp) => {
		if (!startTime) startTime = timestamp;

		const elapsed = timestamp - startTime;
		const progress = Math.min(elapsed / duration, 1);

		const power = 0.5;
		const frequency = 2;

		const currentHue = lerp(startHue, targetHue, progress);
		const color = `hsl(${currentHue}, 90%, 55%)`;

		const scale = 1 + Math.abs(Math.sin(progress * frequency * Math.PI)) * power;

		onUpdateReactState(color, scale);

		if (progress < 1) {
			animationFrameId = requestAnimationFrame(step);
		} else {
			onFinishReactState(color);
		}
	};

	animationFrameId = requestAnimationFrame(step);

	return () => cancelAnimationFrame(animationFrameId);
}
