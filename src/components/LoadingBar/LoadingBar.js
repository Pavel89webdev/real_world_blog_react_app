import React from 'react';
import { Spin } from 'antd';

import classes from './LoadingBar.module.sass';

function LoadingBar() {
  return (
    <div className={classes.loading}>
      <Spin size="large" />
    </div>
  );
}

export default LoadingBar;
