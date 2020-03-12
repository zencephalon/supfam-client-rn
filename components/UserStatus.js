import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import UserIcon from './UserIcon';
import StatusStripe from './StatusStripe';
import TopText from './TopText';

import { View, Text } from 'react-native';

export default function UserStatus({ user }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'stretch',
      }}
    >
      <StatusStripe statusState={user.current_status.color} />
      <View style={{ flexGrow: 1 }}>
        <TopText
          displayName={user.name}
          locationState={user.name}
          lastUpdate={user.current_status.updated_at}
        />
        <View style={{ flexDirection: 'row' }}>
          <UserIcon uri={user.avatar_url} />
          <View style={{ flexDirection: 'column', flexGrow: 1 }}>
            <Text>{user.statusText}</Text>
            <Text style={{ textAlign: 'right', alignSelf: 'stretch' }}>
              {user.messagePreview}
            </Text>
          </View>
        </View>
      </View>
    </View>
    // <>
    //   <StatusStripe></StatusStripe>
    //   <MainBody>
    //     <TopText></TopText>
    //     <StatusContentBody>
    //       <UserIcon></UserIcon>
    //       <StatusTextBody>
    //         <StatusText></StatusText>
    //         <MessagePreview></MessagePreview>
    //       </StatusTextBody>
    //     </StatusContentBody>
    //   </MainBody>
    // </>
  );
}
