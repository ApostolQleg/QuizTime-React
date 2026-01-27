import { useParams, useNavigate } from "react-router";
import { getQuizById, saveResult, getResultById } from "../services/storage.js";
import { useState, useEffect } from "react";
import Question from "../components/Quiz/Question.jsx";
import Button from "../components/UI/Button.jsx";
import Container from "../components/UI/Container.jsx";

export default function Quiz() {
	const navigate = useNavigate();
	const { quizId, resultIdParam } = useParams();

	const [loading, setLoading] = useState(true);

	const [quizData, setQuizData] = useState(null);
	const [resultData, setResultData] = useState(null);

	const [answers, setAnswers] = useState([]);
	const [errors, setErrors] = useState({});

	const isResultPage = Boolean(resultIdParam);

	useEffect(() => {
		setLoading(true);
		setQuizData(null);
		setResultData(null);
		setAnswers([]);
		setErrors({});

		const loadData = async () => {
			try {
				if (isResultPage) {
					const res = await getResultById(resultIdParam);
					setResultData(res);
					setQuizData({
						title: res.quizTitle,
						questions: res.questions,
					});
				} else {
					const quiz = await getQuizById(quizId);
					setQuizData(quiz);
				}
			} catch (error) {
				console.error("Failed to load data", error);
				navigate("/not-found");
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, [quizId, resultIdParam, isResultPage, navigate]);

	const handleRadioUpdate = (qIndex, oIndex) => {
		const newAnswers = [...answers];
		newAnswers[qIndex] = [oIndex];
		setAnswers(newAnswers);
		if (errors[qIndex]) {
			setErrors((prev) => ({ ...prev, [qIndex]: false }));
		}
	};

	const handleSubmit = async () => {
		if (!quizData) return;

		let allAnswered = true;
		const newErrors = {};

		quizData.questions.forEach((_, i) => {
			if (!answers[i] || answers[i].length === 0) {
				allAnswered = false;
				newErrors[i] = true;
			}
		});

		setErrors(newErrors);
		if (!allAnswered) return;

		let score = 0;
		quizData.questions.forEach((question, qIndex) => {
			const correctIds = question.options.filter((o) => o.isCorrect).map((o) => o.id);
			const selectedIds = answers[qIndex] || [];

			if (
				correctIds.length === selectedIds.length &&
				correctIds.every((id) => selectedIds.includes(id))
			) {
				score++;
			}
		});

		const summary = {
			score,
			correct: score,
			total: quizData.questions.length,
		};

		const payload = {
			quizId: quizData.id || quizId,
			answers,
			summary,
			timestamp: Math.floor(Date.now() / 1000),
		};

		try {
			const response = await saveResult(payload);
			navigate(`/result/${quizId}/${response.resultId}`);
		} catch (error) {
			console.error("Save error", error);
			alert("Failed to save result");
		}
	};

	if (loading) {
		return <Container className="text-slate-200 text-center">Loading...</Container>;
	}

	if (!quizData) return null;

	return (
		<Container className={"flex flex-col items-center gap-6"}>
			<div className="text-3xl font-bold text-indigo-400 text-center drop-shadow-md pb-2 border-b border-slate-800 w-full">
				{quizData.title}
			</div>

			{isResultPage && resultData && (
				<div className="text-xl font-semibold text-emerald-400 bg-emerald-400/10 px-6 py-2 rounded-full border border-emerald-400/20">
					Your Result: {resultData.summary?.score} / {quizData.questions.length}
				</div>
			)}

			<div className="w-full flex flex-col gap-6">
				{quizData.questions.map((question, index) => (
					<Question
						question={question}
						key={index}
						className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg shadow-black/20 transition-all hover:border-slate-600"
						isResultPage={isResultPage}
						onOptionSelect={(optionId) =>
							!isResultPage && handleRadioUpdate(index, optionId)
						}
						error={errors[index]}
						selected={isResultPage ? resultData?.answers?.[index] : answers[index]}
					>
						{question.text}
					</Question>
				))}
			</div>

			{!isResultPage ? (
				<Button
					onClick={handleSubmit}
					className="w-full md:w-auto min-w-[200px] text-lg shadow-xl shadow-indigo-500/20"
				>
					Submit
				</Button>
			) : (
				<Button onClick={() => navigate("/")} className="w-full md:w-auto">
					Back to Home
				</Button>
			)}
		</Container>
	);
}