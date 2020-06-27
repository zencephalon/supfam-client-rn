import React from 'react';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';

import SfText from '~/c/SfText';
import SfTopBar from '~/c/SfTopBar';

import useLight from '~/h/useLight';

import ProfileIcon from '~/c/ProfileIcon';

export default function ConversationTopBar({
  profileId,
  name,
  navigation,
  statusMessage,
}) {
  const { foregrounds } = useLight();
  return (
    <SfTopBar style={{ justifyContent: 'space-between' }}>
      <TouchableOpacity
        style={{ paddingTop: 4, paddingBottom: 4, paddingRight: 24 }}
        onPress={() => navigation.pop()}
      >
        <Ionicons name="ios-arrow-back" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          maxWidth: '60%',
        }}
      >
        <ProfileIcon profileId={profileId} />
        <View>
          <SfText
            style={{ fontSize: 16, marginLeft: 8, color: foregrounds[1] }}
          >
            {name}
          </SfText>
          <SfText
            style={{
              fontSize: 12,
              marginLeft: 8,
              color: foregrounds[1],
              overflow: 'hidden',
            }}
            numberOfLines={1}
          >
            {statusMessage}
          </SfText>
        </View>
      </View>
      <TouchableOpacity style={{ padding: 4 }}>
        <MaterialIcons name="settings" size={24} color={foregrounds[1]} />
      </TouchableOpacity>
    </SfTopBar>
  );
}
