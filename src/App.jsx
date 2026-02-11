import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AppRoutes from "./components/AppRoutes.jsx";

export default function App() {
	return (
		<div className="min-h-screen flex flex-col flex-1 bg-(--col-bg-main) text-(--col-text-main)">
			<Header />
			<AppRoutes />
			<Footer />
		</div>
	);
}
