import Option from "./Option.jsx";

export default function Question({ id, ...props }) {
	console.log("Question id:", id);
	return (
		<>
			<div id={id} {...props}>
				<h1>Sample Question</h1>
				<Option id="0" name={id} />
				<Option id="1" name={id} />
				<Option id="2" name={id} />
			</div>
		</>
	);
}
