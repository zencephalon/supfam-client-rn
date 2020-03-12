import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import SfTextInput from './SfTextInput';

const statusStates = {
  AWAY: 'AWAY',
  BUSY: 'BUSY',
  FREE: 'FREE',
  OPEN: 'OPEN',
};

class StatusCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  editMessage = message => {
    this.setState({ message });
  };

  setAway = () => {
    this.props.PUT('me', { color: 0 });
  };
  setBusy = () => {
    this.props.PUT('me', { color: 1 });
  };
  setFree = () => {
    this.props.PUT('me', { color: 2 });
  };
  setOpen = () => {
    this.props.PUT('me', { color: 3 });
  };

  render() {
    const { message } = this.state;
    return (
      <View>
        <SfTextInput
          placeholder={this.props.status.message}
          value={message}
          onChangeText={this.editMessage}
        />
        <View style={styles.tabBarInfoContainer}>
          <TouchableOpacity
            style={{ ...styles.statusButton, backgroundColor: Colors.AWAY }}
            onPress={this.setAway}
          >
            <MonoText>Away</MonoText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.statusButton, backgroundColor: Colors.BUSY }}
            onPress={this.setBusy}
          >
            <MonoText>Busy</MonoText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.statusButton, backgroundColor: Colors.FREE }}
            onPress={this.setFree}
          >
            <MonoText>Free</MonoText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.statusButton, backgroundColor: Colors.OPEN }}
            onPress={this.setOpen}
          >
            <MonoText>Open</MonoText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusButton: {
    padding: 10,
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 0,
  },
  tabBarInfoContainer: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default StatusCenter;
