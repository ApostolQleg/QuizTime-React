import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUserState } from "@/features/auth/hooks/useAuth.js";
import { getResults } from "@/features/results/api/results.api.js";
import { useResultsListStore } from "@/features/results/stores/resultsListStore.js";
import { API_CONFIG } from "@/shared/config/config.js";
import { useDebounce } from "@/shared/hooks/useDebounce.js";
import { getPaginationRange } from "@/shared/libs/pagination.js";
import Grid from "@/widgets/quiz-grid/ui/Grid.jsx";
import ToolBar from "@/widgets/quiz-toolbar/ui/ToolBar.jsx";

const ITEMS_PER_PAGE = API_CONFIG.ITEMS_PER_PAGE_RESULTS;

export default function Results() {
	const navigate = useNavigate();
	const { user } = useAuthUserState();

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedQuery = useDebounce(searchQuery, 500);

	const [sortOption, setSortOption] = useState("newest");

	const {
		items,
		loading,
		page,
		hasMore,
		setItems,
		appendItems,
		setLoading,
		setPage,
		setHasMore,
		clear,
	} = useResultsListStore();

	const fetchResults = useCallback(
		async (pageToLoad) => {
			if (!user) {
				setItems([]);
				setHasMore(false);
				setLoading(false);
				return;
			}

			setLoading(true);
			try {
				const { skip, limit } = getPaginationRange(pageToLoad, ITEMS_PER_PAGE);
				const data = await getResults(skip, limit, debouncedQuery, sortOption);
				const fetchedResults = data.results;
				const moreAvailable = fetchedResults.length >= limit;

				if (pageToLoad === 1) {
					setItems(fetchedResults);
				} else {
					appendItems(fetchedResults);
				}

				setHasMore(moreAvailable);
				setPage(pageToLoad);
			} catch (err) {
				console.error("Failed to load results", err);
				setHasMore(false);
			} finally {
				setLoading(false);
			}
		},
		[appendItems, debouncedQuery, setHasMore, setItems, setLoading, setPage, sortOption, user],
	);

	useEffect(() => {
		clear();
		fetchResults(1);
	}, [clear, fetchResults]);

	const handleLoadMore = useCallback(() => {
		if (!loading && hasMore) {
			fetchResults(page + 1);
		}
	}, [fetchResults, hasMore, loading, page]);

	const emptyMessage = user ? (
		"You have no quiz results yet."
	) : (
		<>
			<span className="text-xl font-bold">
				History is available only for registered users
			</span>
			<Link to="/register" className="text-(--col-primary) hover:underline text-base">
				Sign up to save your progress
			</Link>
		</>
	);

	return (
		<div className="flex flex-col items-center justify-between gap-3">
			<ToolBar
				search={{ value: searchQuery, onChange: setSearchQuery }}
				sort={{ value: sortOption, onChange: setSortOption }}
				placeholder="Search for results..."
			/>
			<Grid
				items={items}
				loading={loading && page === 1}
				hasMore={hasMore}
				onLoadMore={handleLoadMore}
				isLoadingMore={loading && page > 1}
				showAddButton={false}
				isResultsPage={true}
				onCardClick={(item) => navigate(`/result/${item.quizId}/${item._id}`)}
				emptyMessage={emptyMessage}
			/>
		</div>
	);
}
