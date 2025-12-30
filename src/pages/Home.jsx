import { getStorage } from "../services/storage.js";
import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router"; // Додав useLocation
import addIcon from "../assets/plus-icon.png";
import Description from "../components/Home/Description.jsx";
import Container from "../components/UI/Container.jsx";

export default function Home() {
	const navigate = useNavigate();
	const location = useLocation();

	const [storage, setLocalStorage] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selectedQuiz, setSelectedQuiz] = useState(null);

	const isResultsPage = location.pathname === "/results";
	const isHelpPage = location.pathname === "/help";

	useEffect(() => {
		getStorage()
			.then((data) => {
				setLocalStorage(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load storage", err);
				setLoading(false);
			});
	}, []);

	const quizzes = useMemo(() => {
		if (!storage) return [];
		return isResultsPage ? storage.results || [] : storage.quizzes || [];
	}, [storage, isResultsPage]);

	if (isHelpPage) {
		return (
			<Container>
				<div className="text-center text-white col-span-full">
					Here is an information section for new users.
				</div>
			</Container>
		);
	}

	if (loading) {
		return <Container className="text-white text-center">Loading...</Container>;
	}

	return (
		<Container
			className={
				"grid gap-6 lg:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center justify-items-center"
			}
		>
			{!isResultsPage && (
				<Link to="/create" id={`quiz-add`} className="quiz-card">
					<img src={addIcon} alt="Add Quiz" className="w-1/2 h-1/2" />
				</Link>
			)}

			{quizzes.map((quiz, qIndex) => (
				<button
					type="button"
					key={qIndex}
					className="quiz-card"
					onClick={
						isResultsPage
							? () => navigate(`/result/${quiz.id}/${quiz.timestamp}`)
							: () => setSelectedQuiz(quiz)
					}
				>
					{quiz.title}
					<br />
					{`Questions: ${quiz.questions?.length || 0}`}
				</button>
			))}

			{selectedQuiz && (
				<Description quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
			)}

			{isResultsPage && quizzes.length === 0 && (
				<div className="text-center text-white col-span-full">
					You have no quiz results yet. Take some quizzes first!
				</div>
			)}

			{!isResultsPage && quizzes.length === 0 && (
				<div className="text-center text-white col-span-full col-start-2">
					No quizzes found. Create one!
				</div>
			)}
		</Container>
	);
}
