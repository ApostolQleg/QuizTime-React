import { colorGenerator } from "./colorGenerator.js";
import { consumeIteratorWithTimeout } from "./iterator.js";

/**
 * Explosion Animation
 * @param {function} onUpdateReactState - Callback function to update React state with the current color and scale
 * @param {function} onFinishReactState - Callback function to update React state when the animation finishes with the final color
 */
export function startExplosionAnimation(onUpdateReactState, onFinishReactState) {
	const colorIterator = colorGenerator();

	return consumeIteratorWithTimeout(
		colorIterator,
		2000,
		(color, progress) => {
			// Create an oscillation effect that peaks at the middle of the animation
			const oscillation = Math.sin(progress * Math.PI * 6) * (1 - progress);

			// Scale the explosion from 1 to 2 and back to 1, with an oscillation effect
			const scale = 1 + Math.abs(oscillation);

			onUpdateReactState(color, scale);
		},
		(finalColor) => {
			onFinishReactState(finalColor);
		},
	);
}
