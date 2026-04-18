import { useCallback, useEffect, useState } from "react";

export function useInfiniteList(loadPage, extraParams = null) {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const load = useCallback(
		async (pageToLoad, isInitialLoad = false) => {
			try {
				if (!isInitialLoad) {
					setIsLoadingMore(true);
				}

				const result = await loadPage({ pageToLoad, isInitialLoad, ...extraParams });
				const nextItems = result?.items ?? [];
				const nextHasMore = result?.hasMore ?? false;

				setItems((prevItems) => (isInitialLoad ? nextItems : [...prevItems, ...nextItems]));
				setHasMore(nextHasMore);
			} finally {
				setLoading(false);
				setIsLoadingMore(false);
			}
		},
		[loadPage, extraParams],
	);

	useEffect(() => {
		setItems([]);
		setPage(1);
		setHasMore(true);
		setLoading(true);
		load(1, true);
	}, [load]);

	const handleLoadMore = useCallback(() => {
		setPage((currentPage) => {
			const nextPage = currentPage + 1;
			load(nextPage, false);
			return nextPage;
		});
	}, [load]);

	return {
		items,
		setItems,
		loading,
		page,
		hasMore,
		isLoadingMore,
		handleLoadMore,
	};
}
