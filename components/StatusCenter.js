import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import SfTextInput from './SfTextInput';

import StatusButton from '~/components/StatusButton';

class StatusCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  editMessage = message => {
    this.setState({ message });
  };

  setColor = color => {
    this.props.PUT('me', { color });
  };

  setMessage = () => {
    this.props
      .PUT('me', {
        color: this.props.status.color,
        message: this.state.message,
      })
      .then(() => {
        this.setState({ message: '' });
      })
      .catch(e => {});
  };

  render() {
    const { message } = this.state;
    const { status } = this.props;
    return (
      <React.Fragment>
        <SfTextInput
          placeholder={status.message}
          value={message}
          onChangeText={this.editMessage}
          onSubmitEditing={this.setMessage}
          style={styles.statusInput}
        />
        <View style={styles.tabBarInfoContainer}>
          {[0, 1, 2, 3].map(color => {
            return (
              <StatusButton
                color={color}
                setColor={this.setColor}
                key={`${color}`}
              />
            );
          })}
        </View>
      </React.Fragment>
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
  },
  contentContainer: {
    paddingTop: 0,
  },
  statusInput: {
    padding: 12,
    fontSize: 18,
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
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default StatusCenter;
