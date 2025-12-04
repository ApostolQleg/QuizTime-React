export default function Input({ placeholder, ...props }) {
	return (
		<>
			<input type="text" placeholder={placeholder} {...props} />
		</>
	);
}
