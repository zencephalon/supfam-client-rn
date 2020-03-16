import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FriendActions from '~/apis/friend/actions';

import { orderBy } from 'lodash';

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
  const { data, confirmed, requested, failed } = state.friends.http.collections[
    'friends'
  ] || {
    data: [],
    confirmed: false,
  };

  const friends = orderBy(data, ['current_status.updated_at'], ['desc']);

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
