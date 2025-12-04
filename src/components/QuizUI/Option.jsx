import Radio from "./Radio.jsx";

export default function Option({ id, name, text }) {
	return (
		<>
			<div>
				<Radio id={id} name={name} />
				<label htmlFor={id}>{text}</label>
			</div>
		</>
	);
}
