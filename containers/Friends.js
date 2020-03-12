import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FriendActions from '~/apis/friend/actions';
import { View } from 'react-native';

class FriendsContainer extends Component {
  componentDidMount() {
    const {
      actions: { INDEX },
    } = this.props;
    INDEX('friends');
  }

  render() {
    const { confirmed, requested, failed, friends, children } = this.props;
    return (
      <React.Fragment>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            friends,
            confirmed,
            requested,
            failed,
          })
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const { data: friends, confirmed, requested, failed } = state.friends.http
    .collections['friends'] || {
    data: [],
    confirmed: false,
  };

  return {
    friends,
    confirmed,
    requested,
    failed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(FriendActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
