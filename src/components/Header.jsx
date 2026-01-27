import logoImage from "../assets/logo-icon.png";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<>
			<header className="bg-slate-900 text-slate-100 border-slate-800 shadow-2xl shadow-black/50 justify-center flex flex-row items-center gap-4 p-6 min-h-24 text-4xl top-0 w-full">
				<img src={logoImage} alt="logo" className="h-12 w-12 object-contain" />
				<span className="tracking-wide drop-shadow-lg">QuizTime bitches!</span>
			</header>
			<nav className="justify-center flex flex-row space-x-8 text-2xl m-6 font-medium text-slate-500">
				<Link to="/" className="hover:text-indigo-400 transition-colors duration-300">Quizzes</Link>
				<Link to="/results" className="hover:text-indigo-400 transition-colors duration-300">Results</Link>
				<Link to="/help" className="hover:text-indigo-400 transition-colors duration-300">Help</Link>
			</nav>
		</>
	);
}