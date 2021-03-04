import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import getTokenFromLocaleStorage from '../../services/getTokenFromLocaleStorage';

function PrivateRoute({ Component, render, ...rest }) {
  const token = getTokenFromLocaleStorage();
  if (token === '') {
    return <Redirect to="/sing-in" />;
  }

  if (Component !== false) {
    return <Route {...rest} component={Component} />;
  }
  if (Component === false) {
    return <Route {...rest} render={render} />;
  }
}

PrivateRoute.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  render: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

PrivateRoute.defaultProps = {
  Component: false,
  render: false,
};

export default PrivateRoute;
