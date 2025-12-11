import { useState } from "react";
import Input from "./Input.jsx";
import Option from "./Option.jsx";

export default function Question({ id, onDelete }) {
	const [options, setOptions] = useState([
		{ id: 0, text: "Так" },
		{ id: 1, text: "Ні" },
	]);

	const handleAddOption = () => {
		const newId = options.length ? options[options.length - 1].id + 1 : 0;
		setOptions([...options, { id: newId, text: "" }]);
	};

	const handleOptionDelete = (id) => {
		setOptions(options.filter((option) => option.id !== id));
	};

	return (
		<div className="p-4 border border-gray-300 rounded flex flex-col gap-2" id={id}>
			<div className="flex flex-row justify-between items-center">
				<Input
					placeholder="Enter question text here..."
					className="border border-gray-300 rounded text-white p-2 m-2 w-3/4"
				/>
				<button
					className="bg-pink-600 text-black rounded-2xl transition hover:bg-pink-500 flex items-center justify-center px-4 py-2"
					onClick={onDelete}
				>
					Delete
				</button>
			</div>
			{options.map((option) => (
				<Option
					key={option.id}
					id={option.id}
					name={id}
					text={option.text}
					onDelete={() => handleOptionDelete(option.id)}
				/>
			))}
			<button
				type="button"
				className="bg-pink-600 text-black rounded-2xl transition hover:bg-pink-500 flex items-center justify-center px-4 py-2"
				onClick={handleAddOption}
			>
				Add Option
			</button>
		</div>
	);
}
