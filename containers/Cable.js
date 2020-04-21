import React, { Fragment, useEffect } from 'react';

import { connect } from 'react-redux';

import cable from '~/lib/Cable';

function CableContainer() {
  useEffect(() => {
    // cable.init();
    // return () => {
    //   cable.disconnect();
    // };
  }, []);

  return null;
}

export default connect()(CableContainer);
