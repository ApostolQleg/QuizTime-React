import { getQuizzesList } from "../services/quizzes.js";
import { getResults } from "../services/results.js";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import addIcon from "../assets/plus-icon.png";
import Description from "../components/Home/Description.jsx";
import Container from "../components/UI/Container.jsx";
import QuizCard from "../components/Home/QuizCard.jsx";

export default function Home() {
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useAuth();

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const ITEMS_PER_PAGE = 36;
	const ITEMS_PER_PAGE_AUTH = 35;
	const isResultsPage = location.pathname === "/results";

	const loadData = useCallback(
		async (pageToLoad, isInitialLoad = false) => {
			try {
				if (!isInitialLoad) setIsLoadingMore(true);

				let data = [];

				if (isResultsPage) {
					if (user) {
						data = await getResults();
						setHasMore(false);
					} else {
						data = [];
					}
				} else {
					let currentLimit = ITEMS_PER_PAGE;
					let currentSkip = 0;

					if (user) {
						if (pageToLoad === 1) {
							currentLimit = ITEMS_PER_PAGE_AUTH;
							currentSkip = 0;
						} else {
							currentLimit = ITEMS_PER_PAGE;
							currentSkip = ITEMS_PER_PAGE_AUTH + (pageToLoad - 2) * ITEMS_PER_PAGE;
						}
					} else {
						currentLimit = ITEMS_PER_PAGE;
						currentSkip = (pageToLoad - 1) * ITEMS_PER_PAGE;
					}

					data = await getQuizzesList(currentSkip, currentLimit);

					if (data.length < currentLimit) {
						setHasMore(false);
					}
				}

				setItems((prev) => (isInitialLoad ? data : [...prev, ...data]));
			} catch (err) {
				console.error("Failed to load data", err);
			} finally {
				setLoading(false);
				setIsLoadingMore(false);
			}
		},
		[isResultsPage, user, ITEMS_PER_PAGE, ITEMS_PER_PAGE_AUTH],
	);

	useEffect(() => {
		setItems([]);
		setPage(1);
		setHasMore(true);
		setLoading(true);

		loadData(1, true);
	}, [isResultsPage, user, loadData]);

	const handleLoadMore = () => {
		const nextPage = page + 1;
		setPage(nextPage);
		loadData(nextPage, false);
	};

	if (loading) {
		return <Container className="text-center text-(--col-text-main)">Loading...</Container>;
	}

	return (
		<Container>
			{(items.length > 0 || (!isResultsPage && user)) && (
				<div
					className={
						"grid gap-6 lg:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 items-center justify-items-center mb-8"
					}
				>
					{!isResultsPage && user && (
						<Link to="/create" id={`quiz-add`} className="quiz-card group">
							<img
								src={addIcon}
								alt="Add Quiz"
								className="w-1/2 h-1/2 group-hover:rotate-90 transition-transform duration-300"
							/>
						</Link>
					)}

					{items.map((item, index) => (
						<QuizCard
							key={`${item._id}-${index}`}
							item={item}
							isResultsPage={isResultsPage}
							onClick={
								isResultsPage
									? () => navigate(`/result/${item.quizId}/${item._id}`)
									: () => setSelectedQuiz(item)
							}
						/>
					))}
				</div>
			)}

			{!isResultsPage && hasMore && items.length > 0 && (
				<div className="flex justify-center pb-4">
					<button
						onClick={handleLoadMore}
						disabled={isLoadingMore}
						className="button px-8 py-3 text-lg"
					>
						{isLoadingMore ? "Loading..." : "Load More Quizzes"}
					</button>
				</div>
			)}

			{selectedQuiz && (
				<Description quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
			)}

			{!loading && items.length === 0 && (
				<div className="text-center col-span-full text-(--col-text-main) flex flex-col gap-2">
					{isResultsPage ? (
						user ? (
							"You have no quiz results yet."
						) : (
							<>
								<span className="text-xl font-bold">
									History is available for registered users.
								</span>
								<Link
									to="/login"
									className="text-(--col-primary) hover:underline text-base"
								>
									Log in to save your progress
								</Link>
							</>
						)
					) : (
						"No quizzes found."
					)}
				</div>
			)}
		</Container>
	);
}
