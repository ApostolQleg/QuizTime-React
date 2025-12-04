export default function Button({ onClick, text, ...props }) {
	return (
		<>
			<button type="button" onClick={onClick} {...props}>
				{text}
			</button>
		</>
	);
}
