import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getResults } from "../services/results.js";
import { useAuth } from "../hooks/useAuth";
import Grid from "../components/Home/Grid.jsx";

export default function Results() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchResults() {
			if (!user) {
				setLoading(false);
				return;
			}
			try {
				const data = await getResults();
				setItems(data);
			} catch (err) {
				console.error("Failed to load results", err);
			} finally {
				setLoading(false);
			}
		}
		fetchResults();
	}, [user]);

	const emptyMessage = user ? (
		"You have no quiz results yet."
	) : (
		<>
			<span className="text-xl font-bold">
				History is available only for registered users
			</span>
			<Link to="/login" className="text-(--col-primary) hover:underline text-base">
				Sign in to save your progress
			</Link>
		</>
	);

	return (
		<Grid
			items={items}
			loading={loading}
			hasMore={false}
			onLoadMore={() => {}}
			isLoadingMore={false}
			showAddButton={false}
			isResultsPage={true}
			onCardClick={(item) => navigate(`/result/${item.quizId}/${item._id}`)}
			emptyMessage={emptyMessage}
		/>
	);
}
