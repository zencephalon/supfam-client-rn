export default function processMessage(message) {
  if (message.type === 0) {
    return message;
  }
  if (message.type === 1) {
    return {
      ...message,
      image: JSON.parse(message.message),
    };
  }
}
