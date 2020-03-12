import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StatusActions from '~/apis/status/actions';

class StatusMeContainer extends Component {
  componentDidMount() {
    const {
      actions: { GET },
    } = this.props;
    GET('me');
  }

  render() {
    const { confirmed, requested, failed, status, children } = this.props;
    return (
      <React.Fragment>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            status,
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
  const {
    data: status,
    GET: { confirmed, requested, failed },
  } = state.statuses.http.things['me'] || {
    data: {},
    GET: {
      confirmed: false,
      requested: true,
      failed: false,
    },
  };

  return {
    status,
    confirmed,
    requested,
    failed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(StatusActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusMeContainer);
