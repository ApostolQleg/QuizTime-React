import { deleteQuiz } from "../../services/storage.js";
import Button from "../UI/Button.jsx";

export default function Description({ quiz, onClose }) {
	const handleDelete = async () => {
		try {
			await deleteQuiz(quiz.id);
			onClose();
			window.location.reload();
		} catch (error) {
			console.error("Error deleting quiz: ", error);
			alert("Failed to delete quiz. Please try again later.");
		}
	};

	return (
		<>
			<div
				className="fixed inset-0 backdrop-blur-sm z-20 transition-opacity bg-slate-950/80"
				onClick={onClose}
			/>
			<div
				className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                    flex flex-col min-h-[60vh] max-h-[80vh] w-[80vw] 
                    rounded-2xl p-8 z-30 shadow-2xl shadow-black/50 border bg-(--col-bg-card) border-(--col-border) text-(--col-text-main)"
			>
				<div className="flex flex-col flex-1 overflow-y-auto gap-4">
					<div className="text-5xl font-bold drop-shadow-md text-(--col-text-accent)">
						{quiz.title}
					</div>
					<div className="text-2xl w-full break-all leading-relaxed border-t pt-4 text-(--col-text-muted) border-(--col-border)">
						{quiz.description}
					</div>
				</div>

				<div className="flex justify-between items-center pt-6 mt-2">
					<Button to={`/manage/${quiz.id}`}>Manage</Button>
					<Button to={`/quiz/${quiz.id}`}>Start Quiz</Button>
					<Button onClick={handleDelete}>Delete</Button>
				</div>
			</div>
		</>
	);
}