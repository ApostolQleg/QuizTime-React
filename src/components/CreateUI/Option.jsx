import Radio from "../UI/Radio.jsx";
import Input from "./Input.jsx";
import { useState } from "react";


export default function Option({ id, name, text, onDelete }) {
	const [value, setValue] = useState(text || "");

	return (
		<>
			<div id={id} className="flex flex-row gap-3 items-center">
				<Radio id={id} name={name} />
				<Input
					placeholder="Enter option text here..."
					className="border border-gray-300 rounded text-white p-1 w-1/2"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<button
					type="button"
					className="bg-pink-600 text-black rounded-2xl transition hover:bg-pink-500 flex items-center justify-center px-4 py-2"
					onClick={() => {
						onDelete();
					}}
				>
					Delete
				</button>
			</div>
		</>
	);
}
