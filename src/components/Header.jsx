import logoImage from "../assets/logo-icon.png";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<>
			<header className="bg-[rgb(146,6,146)] justify-center flex flex-row p-4 min-h-20 text-4xl top-0 w-full rounded-b-[20%]">
				<img src={logoImage} alt="logo" className="max-h-12 max-w-12" />
				QuizTime bitches!
			</header>
			<nav className="justify-center flex flex-row space-x-8 text-2xl m-3">
				<Link to="/">Quizzes</Link>
				<Link to="/results">Results</Link>
				<Link to="/help">Help</Link>
			</nav>
		</>
	);
}
