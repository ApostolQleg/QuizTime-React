/**
 * Iterator with Timeout
 * @param {Iterator} iterator - The iterator to consume
 * @param {number} durationMs - The duration in milliseconds to consume the iterator
 * @param {function} onTick - Callback function called on each tick with the next value and progress
 * @param {function} onFinish - Callback function called when the iterator is finished
 * @returns {function} A function to stop the interval
 */
export function consumeIteratorWithTimeout(iterator, durationMs, onTick, onFinish) {
	const startTime = Date.now();

	const intervalId = setInterval(() => {
		// Check if the duration has elapsed
		const elapsed = Date.now() - startTime;

		// Calculate progress as a value between 0 and 1
		const progress = Math.min(elapsed / durationMs, 1);

		// If the duration has elapsed, stop the interval and call onFinish
		if (progress >= 1) {
			clearInterval(intervalId);
			const finalValue = iterator.next().value;
			if (onFinish) onFinish(finalValue);
			return;
		}

		// Get the next value from the iterator
		const nextValue = iterator.next().value;

		// Call the onTick callback with the next value and progress
		if (onTick) onTick(nextValue, progress);
	}, 50);

	return () => clearInterval(intervalId);
}
