import React, { Fragment } from 'react';
import AuthToken from '~/lib/AuthToken';

import { API_URL } from '~/lib/constants';

import { connect } from 'react-redux';

import { ActionCable, Cable } from '@kesha-antonov/react-native-action-cable';

import { queryCache } from 'react-query';

class CableContainer extends React.Component {
  constructor(props) {
    super(props);
    ActionCable.startDebugging();
    const URL = `${API_URL}cable?token=${AuthToken.get()}`;

    this.consumer = ActionCable.createConsumer(URL);
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
      const { user } = data;
      queryCache.setQueryData('friends', friends => {
        return friends.map(friend => (user.id === friend.id ? user : friend));
      });
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
