import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "../services/user.js";

import Container from "../components/UI/Container.jsx";

export default function PublicProfile() {
	const navigate = useNavigate();
	const { userId } = useParams();

	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	console.log("PublicProfile: userId =", userId);

	useEffect(() => {
		if (userId) {
			getUserProfile(userId)
				.then((data) => {
					setUser(data.user);
				})
				.catch(() => {
					navigate("/");
				})
				.finally(() => setIsLoading(false));
		}
	}, [userId, navigate]);

	if (isLoading) return <Container className="text-center">Loading...</Container>;
	if (!user) return null;

	return <Container className="flex flex-col items-center gap-8">{user.nickname}</Container>;
}
