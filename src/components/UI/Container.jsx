export default function Container({ children, className = "" }) {
	return <button className={`${className} container`}>{children}</button>;
}
