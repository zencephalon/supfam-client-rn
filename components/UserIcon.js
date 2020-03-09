import * as React from "react";
import { Image } from "react-native";

export default UserIcon = props => {
  return (
    <Image
      source={{ uri: props.uri }}
      style={{ width: 50, height: 50, borderRadius: 50 }}
    />
  );
};
