import Option from "./Option.jsx";
import { useQuizSessionStore } from "@/features/quizzes/stores/quizSessionStore.js";

export default function Question({ questionId, index }) {
	const question = useQuizSessionStore((state) =>
		state.quizData?.questions?.find((item) => item.id === questionId),
	);
	const hasError = useQuizSessionStore((state) => Boolean(state.errors[index]));
	const mode = useQuizSessionStore((state) => state.mode);

	if (!question) {
		return null;
	}

	const options = question.options;
	const className =
		"p-6 rounded-xl border shadow-lg transition-all bg-(--col-bg-input) border-(--col-border) hover:border-(--col-border)";

	return (
		<div className={hasError ? `quiz-error ${className}` : className}>
			{question.text}
			{options.map((option) => (
				<Option
					key={option.id}
					questionId={question.id}
					optionId={option.id}
					questionIndex={index}
					disabled={mode === "result"}
				/>
			))}
		</div>
	);
}
