import { getStorage } from "../services/storage";
import "../pages/quizzes.scss";
import addIcon from "../assets/plus-icon.png";
import { Link } from "react-router";

export default function Quizzes() {
	return (
		<>
			<div className="container">
				<Link to="/create" id={`quiz-add`} className="quiz-button">
					<img src={addIcon} alt="Add Quiz" />
				</Link>
				{getStorage().quizzes.map((quiz, index) => (
					<Link to={`/quiz/${quiz.id}`} key={index} className="quiz-button">
						{" "}
						{quiz.title}
						<br />
						{`Questions: ${quiz.questions.length}`}{" "}
					</Link>
				))}
			</div>
		</>
	);
}
