import { useSelector } from 'react-redux';

export default function useProfileId() {
  return useSelector((state) => state.profile.profileId);
}
