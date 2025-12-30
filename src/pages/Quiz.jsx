import { useParams, useNavigate } from "react-router";
import { getStorage, setStorage } from "../services/storage.js";
import { useState, useEffect, useMemo } from "react";
import Question from "../components/Quiz/Question.jsx";
import Button from "../components/UI/Button.jsx";
import Container from "../components/UI/Container.jsx";

export default function Quiz() {
	const navigate = useNavigate();
	const { quizId, timestamp } = useParams();

	const [storage, setLocalStorage] = useState(null);
	const [loading, setLoading] = useState(true);

	const [answers, setAnswers] = useState([]);
	const [localResult, setLocalResult] = useState(null);
	const [errors, setErrors] = useState({});

	const isResultPage = Boolean(timestamp);

	useEffect(() => {
		getStorage()
			.then((data) => {
				setLocalStorage(data);
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
				navigate("/not-found");
			});
	}, [navigate]);

	const quiz = useMemo(() => {
		if (!storage) return null;
		return storage.quizzes.find((q) => q.id.toString() === quizId) || null;
	}, [storage, quizId]);

	const historicalResult = useMemo(() => {
		if (!storage || !isResultPage) return null;
		return storage.results.find((r) => r.timestamp.toString() === timestamp) || null;
	}, [storage, isResultPage, timestamp]);

	const activeResult = historicalResult || localResult;

	useEffect(() => {
		if (!loading && !quiz) {
			navigate("/not-found");
		}
	}, [loading, quiz, navigate]);

	const handleRadioUpdate = (qIndex, oIndex) => {
		const newAnswers = [...answers];
		newAnswers[qIndex] = [oIndex];
		setAnswers(newAnswers);
		// Скидаємо помилку при виборі
		if (errors[qIndex]) {
			setErrors((prev) => ({ ...prev, [qIndex]: false }));
		}
	};

	const handleSubmit = async () => {
		// Перевірка, чи всі питання мають відповіді
		let allAnswered = true;
		const newErrors = {};

		quiz.questions.forEach((_, i) => {
			if (!answers[i] || answers[i].length === 0) {
				allAnswered = false;
				newErrors[i] = true;
			}
		});

		setErrors(newErrors);
		if (!allAnswered) return;

		// Підрахунок результату
		let summary = 0;
		quiz.questions.forEach((question, qIndex) => {
			const correctIds = question.options.filter((o) => o.isCorrect).map((o) => o.id);
			const selectedIds = answers[qIndex] || [];

			if (
				correctIds.length === selectedIds.length &&
				correctIds.every((id) => selectedIds.includes(id))
			) {
				summary++;
			}
		});

		const newResultData = {
			timestamp: Math.floor(Date.now() / 1000),
			id: quiz.id,
			title: quiz.title,
			summary,
			answers,
			questions: quiz.questions,
		};

		// Оновлюємо сторедж
		const newStorage = {
			...storage,
			results: [...storage.results, newResultData],
		};

		await setStorage(newStorage);
		setLocalStorage(newStorage);
		setLocalResult(newResultData);

		navigate(`/result/${quiz.id}/${newResultData.timestamp}`);
	};

	if (loading) {
		return <Container className="text-white text-center">Loading...</Container>;
	}

	if (!quiz) return null;

	return (
		<Container className={"flex flex-col items-center"}>
			<div className="text-white pb-5 text-[18px] text-center">{quiz.title}</div>

			{isResultPage && activeResult && (
				<div className="text-white mb-5">
					Your Result is {activeResult.summary} / {quiz.questions.length}
				</div>
			)}

			{quiz.questions.map((question, index) => (
				<Question
					question={question}
					key={index}
					className="w-[95%] m-0 mx-auto mb-5 bg-[rgb(146,6,146)] p-5 rounded-2xl shadow-[0_0_10px_rgba(114,0,104,0.692)]"
					isResultPage={isResultPage}
					onOptionSelect={(optionId) =>
						!isResultPage && handleRadioUpdate(index, optionId)
					}
					error={errors[index]}
					selected={isResultPage ? activeResult?.answers?.[index] : answers[index]}
				>
					{question.text}
				</Question>
			))}

			{!isResultPage ? (
				<Button onClick={handleSubmit}>Submit</Button>
			) : (
				<Button onClick={() => navigate("/")}>Back to Home</Button>
			)}
		</Container>
	);
}
