import React from 'react';

import classes from './NoDataMessage.module.sass';

function NoDataMessage() {
  return (
    <div className={classes.message}>
      <h2>No data yet :(</h2>
    </div>
  );
}

export default NoDataMessage;
