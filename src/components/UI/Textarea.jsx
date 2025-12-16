export default function Textarea({ placeholder, className = "", onChange, ...props }) {
	return (
		<>
			<textarea
				placeholder={placeholder}
				className={`${className} input`}
				{...props}
				onChange={(area) => {
					area.target.style.height = "auto";
					area.target.style.height = area.target.scrollHeight + "px";
					onChange(area);
				}}
			/>
		</>
	);
}
