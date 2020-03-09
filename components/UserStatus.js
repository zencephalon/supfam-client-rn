import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import UserIcon from "./UserIcon";
import StatusStripe from "./StatusStripe";
import TopText from "./TopText";

import { View, Text } from "react-native";

export default function UserStatus({ user }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignSelf: "stretch"
      }}
    >
      <StatusStripe statusState={user.statusState} />
      <View style={{ flexGrow: 1 }}>
        <TopText
          displayName={user.displayName}
          locationState={user.locationState}
          lastUpdate={user.lastUpdate}
        />
        <View style={{ flexDirection: "row" }}>
          <UserIcon uri={user.displayImage} />
          <View style={{ flexDirection: "column", flexGrow: 1 }}>
            <Text>{user.statusText}</Text>
            <Text style={{ textAlign: "right", alignSelf: "stretch" }}>
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
