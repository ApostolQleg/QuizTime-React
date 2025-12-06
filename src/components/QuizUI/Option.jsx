import Radio from "./Radio.jsx";

export default function Option({ id, name, text, value }) {
	return (
		<>
			<div>
				<Radio id={id} name={name} value={value} />
				<label htmlFor={id}>{text}</label>
			</div>
		</>
	);
}
