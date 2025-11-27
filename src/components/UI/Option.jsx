import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Radio from "./Radio.jsx";

export default function Option({ id, name }) {
	return (
		<>
			<div>
				<Radio id={id} name={name} />
				<Input name={name} />
				<Button onClick={() => console.log(`Delete option with id: ${id}`)} text="Delete" />
			</div>
		</>
	);
}
