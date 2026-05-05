import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	clearAllQuizzesCache,
	createQuiz,
	getQuizById,
	updateQuiz,
} from "@/features/quizzes/api/quizzes.api.js";
import Question from "@/features/quizzes/components/edit/QuestionEditor.jsx";
import useQuizEditorValidation from "@/features/quizzes/hooks/useQuizEditorValidation.js";
import {
	useQuizEditorActions,
	useQuizEditorContentState,
	useQuizEditorMetaState,
} from "@/features/quizzes/stores/quizEditorStore.js";
import { QUIZ_CONSTRAINTS } from "@/shared/config/config.js";
import Button from "@/shared/ui/Button.jsx";
import Container from "@/shared/ui/Container.jsx";
import Input from "@/shared/ui/Input.jsx";
import ModalConfirm from "@/shared/ui/ModalConfirm.jsx";
import Textarea from "@/shared/ui/Textarea.jsx";
import { useToastActions } from "@/shared/ui/toast/toastStore.js";

export default function Edit() {
	const navigate = useNavigate();
	const { quizId } = useParams();
	const location = useLocation();

	const isManagePage = location.pathname.startsWith("/manage");
	const { loading, alertInfo } = useQuizEditorMetaState();
	const { title, category, tags, description, counter, errors, questions } =
		useQuizEditorContentState();
	const editorActions = useQuizEditorActions();
	const { validate, showSaveError, closeAlert } = useQuizEditorValidation();
	const { addToast } = useToastActions();

	useEffect(() => {
		editorActions.resetEditor();
		editorActions.initEditor(isManagePage);
	}, [editorActions, isManagePage]);

	useEffect(() => {
		if (isManagePage && quizId) {
			getQuizById(quizId)
				.then((foundQuiz) => {
					editorActions.loadQuiz(foundQuiz.quiz);
				})
				.catch((err) => {
					console.error(err);
					navigate("/not-found");
				});
		}
	}, [editorActions, isManagePage, quizId, navigate]);

	const handleSaveQuiz = async () => {
		const isValid = validate();
		if (!isValid) return;

		try {
			const quizPayload = {
				title,
				category,
				tags: tags.map(tag => tag.text.trim()),
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
			<div className="w-full flex flex-col gap-4 p-4 rounded-xl border bg-(--col-bg-input-darker) border-(--col-border)">
				<div className="flex flex-row">
				<Input
					placeholder="Enter quiz title here..."
					className={`text-xs lg:text-lg font-bold w-3/4 ${errors.title ? "error" : ""}`}
					value={title}
					onChange={(event) => {
						const newValue = event.target.value.slice(
							0,
							QUIZ_CONSTRAINTS.TITLE_MAX_LENGTH,
						);
						editorActions.setTitle(newValue);
					}}
					maxLength={QUIZ_CONSTRAINTS.TITLE_MAX_LENGTH}
				/>

				<div className="font-bold m-1 text-xs sm:text-lg text-(--col-text-muted)">
					{counter}/{QUIZ_CONSTRAINTS.TITLE_MAX_LENGTH}
				</div>
				<Button onClick={editorActions.clearTitle}>Clear</Button>
                </div>
				<Input
					placeholder="Enter quiz category here..."
					className={`resize-y w-50 font-bold text-xs lg:text-lg ${errors.description ? "error" : ""}`}
					value={category}
					onChange={(event) => editorActions.setCategory(event.target.value)}
				/>

				<div className="flex flex-col gap-2 p-4 rounded-xl border bg-(--col-bg-input-darker) border-(--col-border)">
					<span className="font-bold text-xs sm:text-sm text-(--col-text-muted)">
						Tags:
					</span>
					<div className="flex flex-wrap gap-2 items-center">
						{tags.map((tag, index) => (
							<div key={tag.id} className="flex items-center gap-1">
								<Input
									placeholder="tag name"
									className="w-24 sm:w-32 text-xs lg:text-sm font-bold"
									value={tag.text}
									onChange={(event) =>
										editorActions.updateTag(index, { ...tag, text: event.target.value })
									}
								/>
								{tags.length > 1 && (
									<Button
										onClick={() => editorActions.deleteTag(index)}
										className="text-red-500 font-bold px-2 hover:text-red-700 transition-colors"
										title="Remove tag"
									>
										x
									</Button>
								)}
							</div>
						))}

						<Button
							onClick={editorActions.addTag}
							className="px-3 py-1 bg-(--col-bg-input) hover:bg-(--col-border) shadow-none"
							title="Add new tag"
						>
							+
						</Button>
					</div>
				</div>
			</div>

			<Textarea
				placeholder="Enter quiz description here..."
				className={`resize-y w-full font-bold text-xs lg:text-lg ${errors.description ? "error" : ""}`}
				value={description}
				onChange={(event) => editorActions.setDescription(event.target.value)}
			/>

			<div className="flex flex-col gap-4">
				{questions.map((question, index) => (
					<Question key={question.id} questionId={question.id} index={index} />
				))}
			</div>

			<Button
				onClick={editorActions.addQuestion}
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
