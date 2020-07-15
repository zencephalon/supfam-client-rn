export default function processMessage(message) {
	// Images
	if (message.type === 1) {
		return {
			...message,
			image: JSON.parse(message.message),
		};
	}
	return message;
}
