import React, { Fragment } from 'react';

import { connect } from 'react-redux';

import cable from '~/lib/Cable';

class CableContainer extends React.Component {
  componentDidMount() {
    cable.init();
  }

  componentWillUnmount() {
    cable.disconnect();
  }

  render() {
    return <Fragment />;
  }
}

export default connect()(CableContainer);
