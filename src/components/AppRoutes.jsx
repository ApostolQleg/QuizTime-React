import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useAutoReload from "../hooks/useAutoReload.js";

import Quizzes from "../pages/Quizzes.jsx";
import Results from "../pages/Results.jsx";
import Help from "../pages/Help.jsx";
import Quiz from "../pages/Quiz.jsx";
import Edit from "../pages/Edit.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound.jsx";

export default function AppRoutes() {
	const { pathname } = useLocation();
	const [refreshKey, setRefreshKey] = useState(0);

	const handleSoftRefresh = () => {
		setRefreshKey((prev) => prev + 1);
	};

	useAutoReload(handleSoftRefresh);

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	}, [pathname]);

	return (
		<div key={refreshKey} className="flex-1 flex flex-col w-full">
			<Routes>
				<Route exact path="/" element={<Quizzes />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/results" element={<Results />} />
				<Route path="/help" element={<Help />} />
				<Route path="/quiz/:quizId" element={<Quiz />} />
				<Route path="/result/:quizId/:resultIdParam" element={<Quiz />} />
				<Route path="/create" element={<Edit />} />
				<Route path="/manage/:quizId" element={<Edit />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}
