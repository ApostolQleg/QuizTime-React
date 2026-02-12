/**
 * Date Utility
 * @param {number} timestamp - The timestamp to format
 * @returns {string} Formatted date string in the format "HH:mm, D MMM YYYY"
 */
export const formatDateTime = (timestamp) => {
	if (!timestamp) return "";
	const date = new Date(timestamp);

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const day = String(date.getDate());
	const year = date.getFullYear();

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const monthName = months[date.getMonth()];

	return `${hours}:${minutes}, ${day} ${monthName} ${year}`;
};
