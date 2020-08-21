import { useSelector } from 'react-redux';

export default function useConversationId() {
  return useSelector((state) => state.conversation.conversationId);
}
