import { useQuery } from 'react-query';
import { getProfileDmConversation } from '~/apis/api';

export default function useProfileDmConversation(profileId) {
  const { data: conversation } = useQuery(
    ['dmWith', { profileId }],
    getProfileDmConversation,
    {
      enabled: profileId,
    }
  );

  return { conversation };
}
