import * as React from 'react';
import { StyleSheet } from 'react-native';
import SfText from '~/c/SfText';

import ProfileName from '~/c/ProfileName';

import useProfileId from '~/h/useProfileId';

export default React.memo(function GroupMemberNameSummary({
  memberProfileIds,
  maxNames,
}: {
  memberProfileIds: number[];
  maxNames: number;
}) {
  if (!memberProfileIds) {
    return null;
  }

  const userProfileId = useProfileId();

  let filteredMemberIds = memberProfileIds.filter((profileId) => {
    return profileId != userProfileId;
  });
  const totalMembers = filteredMemberIds.length;
  filteredMemberIds = filteredMemberIds.slice(0, maxNames);
  return (
    <SfText style={styles.text}>
      {filteredMemberIds.map((profileId, index) => {
        return (
          <React.Fragment key={profileId}>
            <ProfileName profileId={profileId} />
            {index < filteredMemberIds.length - 2 ||
            (index < filteredMemberIds.length - 1 && totalMembers > maxNames)
              ? ', '
              : null}
            {index == filteredMemberIds.length - 2 && totalMembers <= maxNames
              ? ' & '
              : null}
            {index == filteredMemberIds.length - 1 && totalMembers > maxNames
              ? ' & others'
              : null}
          </React.Fragment>
        );
      })}
    </SfText>
  );
});

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
