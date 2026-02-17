import { generator } from "./generator.js";
import getHue from "./colorFormatter.js";

export function startColorAnimation(onUpdateReactState, onFinishReactState, initialColor) {
	const gen = generator();

	const startHue = getHue(initialColor);

	let targetHue = gen.next().value;

	const duration = 1000;

	let delta = targetHue - startHue;

	if (Math.abs(delta) < 180) {
		if (delta > 0) {
			targetHue -= 360;
		} else {
			targetHue += 360;
		}
	}

	const finalDelta = targetHue - startHue;

	let startTime = null;
	let animationFrameId;

	const step = (timestamp) => {
		if (!startTime) startTime = timestamp;

		const elapsed = timestamp - startTime;
		const progress = Math.min(elapsed / duration, 1);

		const currentHue = startHue + finalDelta * progress;

		const colorString = `hsl(${currentHue}, 90%, 55%)`;

		const scale = 1 + Math.sin(progress * Math.PI) * 0.3;

		onUpdateReactState(colorString, scale);

		if (progress < 1) {
			animationFrameId = requestAnimationFrame(step);
		} else {
			const finalHue = targetHue % 360;
			const finalColorString = `hsl(${finalHue}, 90%, 55%)`;
			onFinishReactState(finalColorString);
		}
	};

	animationFrameId = requestAnimationFrame(step);

	return () => cancelAnimationFrame(animationFrameId);
}
