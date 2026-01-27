import Container from "../components/UI/Container.jsx";

export default function NotFound() {
	return (
		<Container>
			<div className="text-center col-span-full text-2xl font-bold text-(--col-text-main)">
				<span className="text-(--col-danger)">404</span> - Page Not Found
			</div>
		</Container>
	);
}