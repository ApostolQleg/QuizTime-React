export const getDateFromObjectId = (objectId) => {
	if (!objectId) return null;

	const timestamp = parseInt(objectId.substring(0, 8), 16) * 1000;

	return new Date(timestamp);
};
