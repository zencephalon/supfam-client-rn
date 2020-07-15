import * as React from 'react';
import SfText from '~/c/SfText';

import ProfileName from '~/c/ProfileName';

import useProfileId from '~/h/useProfileId';

export default function GroupMemberNameSummary({ memberProfileIds, maxNames }) {
  if (!memberProfileIds) {
    return <></>;
  }

  const userProfileId = useProfileId();

  let filteredMemberIds = memberProfileIds.filter((profileId) => {
    return profileId != userProfileId;
  });
  const totalMembers = filteredMemberIds.length;
  filteredMemberIds = filteredMemberIds.slice(0, maxNames);
  return (
    <>
      {filteredMemberIds.map((profileId, index) => {
        return (
          <React.Fragment key={profileId}>
            <ProfileName profileId={profileId} style={{ fontSize: 16 }} />
            {index < filteredMemberIds.length - 2 ||
            (index < filteredMemberIds.length - 1 &&
              totalMembers > maxNames) ? (
              <SfText style={{ fontSize: 16 }}>{', '}</SfText>
            ) : null}
            {index == filteredMemberIds.length - 2 &&
            totalMembers <= maxNames ? (
              <SfText style={{ fontSize: 16 }}>{' & '}</SfText>
            ) : null}
            {index == filteredMemberIds.length - 1 &&
            totalMembers > maxNames ? (
              <SfText style={{ fontSize: 16 }}>{' & others'}</SfText>
            ) : null}
          </React.Fragment>
        );
      })}
    </>
  );
}
