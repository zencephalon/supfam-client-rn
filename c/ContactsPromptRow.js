import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactsPromptRow({ prompt }) {
  const [showRow, setShowRow] = React.useState(true);

  const importContacts = () => {
    Alert.alert(
      "Add contacts?",
      "The next dialogue will ask for your permission to import contacts, sound good?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Yes!", onPress: () => {
          console.log("yesss");
          (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
              const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Emails],
              });
      
              if (data.length > 0) {
                const contact = data[0];
                console.log(contact);
              }

              // TODO: Now hide this row.
              setShowRow(false)
            }
          })()
        } }
      ],
      { cancelable: false }
    );
  }

  if(!showRow) {
    return null;
  }

  return (
    <TouchableOpacity
      style={{
        ...styles.inviteFriendRow,
      }}
      onPress={() => importContacts()}
    >
      <View style={{ flexGrow: 1 }}>
        <View style={styles.prompt}>
          <Text style={styles.promptText}>
            {prompt.text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inviteFriendRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 12,
  },
  prompt: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    flex: 1,
    alignItems: 'center',
  },
  promptText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'blue',
  }
});
