import { useDispatch } from 'react-redux';

import { SELECT } from '~/apis/profile/actions';

export default function useProfileSelect() {
  const dispatch = useDispatch();

  return (profileId) => {
    dispatch(SELECT(profileId));
  };
}
