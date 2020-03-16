import React, { Fragment } from 'react';
import AuthToken from '~/lib/AuthToken';
// import ActionCable from 'actioncable';
import * as FriendActions from '~/apis/friend/actions';

import { connect } from 'react-redux';

import { ActionCable, Cable } from '@kesha-antonov/react-native-action-cable';

class CableContainer extends React.Component {
  constructor(props) {
    super(props);
    ActionCable.startDebugging();
    this.consumer = ActionCable.createConsumer(
      `https://polar-peak-82709.herokuapp.com/cable?token=${AuthToken.get()}`
    );
    this.cable = new Cable({});
    this.channel = this.cable.setChannel(
      'family',
      this.consumer.subscriptions.create({
        channel: 'FamilyChannel',
        id: 1,
      })
    );

    this.channel.on('received', data => {
      console.log('received', data);
      this.props.dispatch(
        FriendActions.action.GET.CONFIRM(data.user.id, data.user)
      );
    });
    this.channel.on('connected', data => {
      console.log('connected', data);
    });
    this.channel.on('rejected', data => {
      console.log('rejected', data);
    });
    this.channel.on('disconnected', data => {
      console.log('disconnected', data);
    });
    this.channel.perform('hello', { data: 'yolo' });
  }

  render() {
    return <Fragment />;
  }
}

export default connect()(CableContainer);
