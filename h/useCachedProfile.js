import { useQuery } from 'react-query';

export default function useCachedUser(userId) {
  const { data: user } = useQuery(['friend', userId], () => {}, {
    staleTime: Infinity,
  });

  return user;
}
