export function getPaginationRange(
	pageToLoad,
	pageSize,
	firstPageSize = pageSize,
	hasFirstPageBoost = false,
) {
	const page = Math.max(1, pageToLoad);

	if (!hasFirstPageBoost) {
		return {
			skip: (page - 1) * pageSize,
			limit: pageSize,
		};
	}

	if (page === 1) {
		return {
			skip: 0,
			limit: firstPageSize,
		};
	}

	return {
		skip: firstPageSize + (page - 2) * pageSize,
		limit: pageSize,
	};
}
