import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import UserIcon from "./UserIcon";

import { View, Text } from "react-native";

export default function StatusStripe(props) {
  return (
    <View
      style={{ width: 5, backgroundColor: Colors[props.statusState] }}
    ></View>
  );
}
