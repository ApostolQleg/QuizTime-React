import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
	createQuiz,
	getQuizById,
	updateQuiz,
	clearAllQuizzesCache,
} from "@/features/quizzes/api/quizzes.api.js";
import { useEffect } from "react";
import Question from "@/features/quizzes/components/edit/QuestionEditor.jsx";
import useQuizEditorValidation from "@/features/quizzes/hooks/useQuizEditorValidation.js";
import { useQuizEditorStore } from "@/features/quizzes/stores/quizEditorStore.js";
import Button from "@/shared/ui/Button.jsx";
import Container from "@/shared/ui/Container.jsx";
import Input from "@/shared/ui/Input.jsx";
import ModalConfirm from "@/shared/ui/ModalConfirm.jsx";
import Textarea from "@/shared/ui/Textarea.jsx";
import { QUIZ_CONSTRAINTS } from "@/shared/config/config.js";
import { useToastStore } from "@/shared/ui/toast/toastStore.js";

export default function Edit() {
	const navigate = useNavigate();
	const { quizId } = useParams();
	const location = useLocation();

	const isManagePage = location.pathname.startsWith("/manage");
	const loading = useQuizEditorStore((state) => state.loading);
	const alertInfo = useQuizEditorStore((state) => state.alertInfo);
	const title = useQuizEditorStore((state) => state.title);
	const description = useQuizEditorStore((state) => state.description);
	const counter = useQuizEditorStore((state) => state.counter);
	const errors = useQuizEditorStore((state) => state.errors);
	const questions = useQuizEditorStore((state) => state.questions);
	const initEditor = useQuizEditorStore((state) => state.initEditor);
	const loadQuiz = useQuizEditorStore((state) => state.loadQuiz);
	const resetEditor = useQuizEditorStore((state) => state.resetEditor);
	const setTitle = useQuizEditorStore((state) => state.setTitle);
	const clearTitle = useQuizEditorStore((state) => state.clearTitle);
	const setDescription = useQuizEditorStore((state) => state.setDescription);
	const addQuestion = useQuizEditorStore((state) => state.addQuestion);
	const { validate, showSaveError, closeAlert } = useQuizEditorValidation();
	const addToast = useToastStore((state) => state.addToast);

	useEffect(() => {
		resetEditor();
		initEditor(isManagePage);
	}, [isManagePage, initEditor, resetEditor]);

	useEffect(() => {
		if (isManagePage && quizId) {
			getQuizById(quizId)
				.then((foundQuiz) => {
					loadQuiz(foundQuiz.quiz);
				})
				.catch((err) => {
					console.error(err);
					navigate("/not-found");
				});
		}
	}, [isManagePage, quizId, loadQuiz, navigate]);

	const handleSaveQuiz = async () => {
		const isValid = validate();
		if (!isValid) return;

		const { title, description, questions } = useQuizEditorStore.getState();

		try {
			const quizPayload = {
				title,
				description,
				questions,
				...(isManagePage ? {} : { id: Date.now().toString() }),
			};

			if (isManagePage) {
				await updateQuiz(quizId, quizPayload);
				addToast("Your quiz has been updated.");
			} else {
				await createQuiz(quizPayload);
				addToast("Your quiz has been created.");
			}
			clearAllQuizzesCache();

			navigate("/");
		} catch (error) {
			console.error("Error saving quiz: ", error);
			showSaveError("Failed to save quiz. Please try again later.");
		}
	};

	if (loading) {
		return <Container className="text-center text-(--col-text-main)">Loading...</Container>;
	}

	return (
		<Container className={"flex flex-col gap-4 flex-1"}>
			<div className="w-full flex flex-row justify-between items-center p-4 rounded-xl border bg-(--col-bg-input-darker) border-(--col-border)">
				<Input
					placeholder="Enter quiz title here..."
					className={`text-xs lg:text-lg font-bold w-3/4 ${errors.title ? "error" : ""}`}
					value={title}
					onChange={(event) => {
						const newValue = event.target.value.slice(
							0,
							QUIZ_CONSTRAINTS.TITLE_MAX_LENGTH,
						);
						setTitle(newValue);
					}}
					maxLength={QUIZ_CONSTRAINTS.TITLE_MAX_LENGTH}
				/>

				<div className="font-bold m-1 text-xs sm:text-lg text-(--col-text-muted)">
					{counter}/{QUIZ_CONSTRAINTS.TITLE_MAX_LENGTH}
				</div>
				<Button onClick={clearTitle}>Clear</Button>
			</div>

			<Textarea
				placeholder="Enter quiz description here..."
				className={`resize-y w-full font-bold text-xs lg:text-lg ${errors.description ? "error" : ""}`}
				value={description}
				onChange={(event) => setDescription(event.target.value)}
			/>

			<div className="flex flex-col gap-4">
				{questions.map((question, index) => (
					<Question key={question.id} questionId={question.id} index={index} />
				))}
			</div>

			<Button
				onClick={addQuestion}
				className="bg-(--col-bg-input) hover:bg-(--col-border) shadow-none"
			>
				Add Question
			</Button>

			<Button className="self-center mt-auto min-w-full shadow-xl" onClick={handleSaveQuiz}>
				Save Quiz
			</Button>
			<ModalConfirm
				isOpen={alertInfo.isOpen}
				onClose={closeAlert}
				title="Error"
				message={alertInfo.message}
				isAlert={true}
				isDanger={true}
			/>
		</Container>
	);
}
