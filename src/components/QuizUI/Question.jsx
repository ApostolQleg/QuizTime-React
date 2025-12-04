import Option from "./Option.jsx";

export default function Question({ question }) {
	const options = question.options;
	return (
		<>
			<div>
				{question.text}
				{options.map((option, index) => (
					<Option
						key={index}
						id={`${option.id}-${question.id}`}
						name={question.text}
						text={option.text}
					/>
				))}
			</div>
		</>
	);
}
