import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";

import { MonoText } from "../components/StyledText";
import UserStatus from "../components/UserStatus";

import Colors from "../constants/Colors";

const statusStates = {
  AWAY: "AWAY",
  BUSY: "BUSY",
  FREE: "FREE",
  OPEN: "OPEN"
};

const userData = [
  {
    displayName: "Dad",
    displayImage: "https://justus-faces.s3.amazonaws.com/dad.jpg",
    locationState: "1200 mi",
    lastUpdate: "2d3h45m", // eventually a timestamp
    statusText: "Donald Drumpf needs to go away",
    messagePreview: "I look forward to hearing back from you about that",
    messageUnreadCount: 6,
    statusState: statusStates.FREE
  },
  {
    displayName: "Huff",
    displayImage: "https://justus-faces.s3.amazonaws.com/huff.jpg",
    locationState: "Home - 0.3 mi",
    lastUpdate: "25m", // eventually a timestamp
    statusText: "Groovin' to that funk",
    messagePreview: "Want to hit up Jillian's event?",
    messageUnreadCount: 1,
    statusState: statusStates.BUSY
  },
  {
    displayName: "Eleni",
    displayImage: "https://justus-faces.s3.amazonaws.com/eleni.jpg",
    locationState: "2 mi",
    lastUpdate: "8m", // eventually a timestamp
    statusText: "Anyone seen the new contrapoints?",
    messagePreview: "See you at the castle later tonight?",
    messageUnreadCount: 2,
    statusState: statusStates.FREE
  },
  {
    displayName: "Daria",
    displayImage: "https://justus-faces.s3.amazonaws.com/daria.jpg",
    locationState: "Unity - 3.2 mi",
    lastUpdate: "5m", // eventually a timestamp
    statusText: "Doing jits",
    messagePreview: "Could U send me the address for later?",
    messageUnreadCount: 1,
    statusState: statusStates.AWAY
  },
  {
    displayName: "Mark",
    displayImage: "https://justus-faces.s3.amazonaws.com/mark.jpg",
    locationState: "3.8 mi",
    lastUpdate: "3s", // eventually a timestamp
    statusText: "Any dinner plans?",
    messagePreview: null,
    messageUnreadCount: 0,
    statusState: statusStates.OPEN
  },
  {
    displayName: "Stedman",
    displayImage: "https://justus-faces.s3.amazonaws.com/stedman.jpg",
    locationState: "HF House 0.1 mi",
    lastUpdate: "10m", // eventually a timestamp
    statusText: "Working in The Salon chez Stedman",
    messagePreview: "Check out this",
    messageUnreadCount: 1,
    statusState: statusStates.BUSY
  },
  {
    displayName: "Mom",
    displayImage: "https://justus-faces.s3.amazonaws.com/mom.jpg",
    locationState: "Bunday Home 1500 mi",
    lastUpdate: "1m", // eventually a timestamp
    statusText: "Taking a walk",
    messagePreview: null,
    messageUnreadCount: 0,
    statusState: statusStates.OPEN
  }
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {userData.map(user => (
          <UserStatus key={user.displayName} user={user} />
        ))}
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <TouchableOpacity
          style={{ ...styles.statusButton, backgroundColor: Colors.AWAY }}
        >
          <MonoText>Away</MonoText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.statusButton, backgroundColor: Colors.BUSY }}
        >
          <MonoText>Busy</MonoText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.statusButton, backgroundColor: Colors.FREE }}
        >
          <MonoText>Free</MonoText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.statusButton, backgroundColor: Colors.OPEN }}
        >
          <MonoText>Open</MonoText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  statusButton: {
    padding: 10,
    flexGrow: 1,
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 0
  },
  tabBarInfoContainer: {
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 0,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  }
});
