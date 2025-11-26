import { getQuizzes, getSelected, setSelected } from "../services/storage";
import "../pages/quizzes.scss";
import addIcon from "../assets/plus-icon.png";

export default function Quizzes() {
	return (
		<>
			<div className="container">
				<button id={`quiz-add`} className="quiz-button">
					<img src={addIcon} alt="Add Quiz" />
				</button>
				{getQuizzes().quizzes.map((quiz, index) => (
					<button key={index} id={`quiz-${index}`} className="quiz-button">
						{" "}
						{quiz.title}
						<br />
						{`Questions: ${quiz.questions.length}`}{" "}
					</button>
				))}
			</div>
		</>
	);
}
