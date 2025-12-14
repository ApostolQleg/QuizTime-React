export default function Radio({
	label,
	className = "",
	id,
	name,
	checked = null,
	onChange = () => {},
	...props
}) {
	return (
		<div className={className}>
			<input
				type="radio"
				id={id}
				name={name}
				checked={checked}
				onChange={onChange}
				{...props}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	);
}
