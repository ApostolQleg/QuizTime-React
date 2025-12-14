import Option from "./Option.jsx";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";

export default function Question({
	id,
	text,
	errors,
	options,
	onDelete,
	onChange,
	onOptionAdd,
	onOptionDelete,
	onOptionChange,
	onCorrect,
}) {
	return (
		<div className="w-[95%] p-4 rounded-2xl flex flex-col gap-2 border border-gray-300" id={id}>
			<div className="flex flex-row justify-between items-center">
				<Input
					placeholder="Enter question text here..."
					className={`m-2 w-3/4 ${errors?.hasError ? "input-error" : ""}`}
					value={text}
					onChange={onChange}
				/>
				<Button onClick={onDelete}>Delete</Button>
			</div>

			{options.map((option) => (
				<Option
					key={option.id}
					id={option.id}
					name={id}
					text={option.text}
					isCorrect={option.isCorrect}
					errors={errors.options?.[option.id] || {}}
					onDelete={() => onOptionDelete(option.id)}
					onChange={(e) => onOptionChange(option.id, e.target.value)}
					onCorrect={() => onCorrect(option.id)}
				/>
			))}
			<Button onClick={onOptionAdd}>Add Option</Button>
		</div>
	);
}
