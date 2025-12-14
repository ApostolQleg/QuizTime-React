import Radio from "../UI/Radio.jsx";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";

export default function Option({ id, name, text, onDelete, onChange }) {
	return (
		<>
			<div id={id} className="flex flex-row gap-3 items-center">
				<Radio id={id} name={name} />
				<Input placeholder="Enter option text here..." value={text} onChange={onChange} />
				<Button onClick={onDelete}>Delete</Button>
			</div>
		</>
	);
}
