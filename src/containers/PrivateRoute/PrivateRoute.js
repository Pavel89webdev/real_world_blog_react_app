import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { getTokenFromLocaleStorage } from '../../helpers/localStorageForUser/localStorageForUser';

function PrivateRoute({ component: Component, ...rest }) {
  const token = getTokenFromLocaleStorage();
  if (!token) {
    return <Redirect to="/sing-in" />;
  }

  if (Component) {
    return <Route {...rest} component={Component} />;
  }
  return <Route {...rest} />;
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.bool, PropTypes.elementType]),
};

PrivateRoute.defaultProps = {
  component: false,
};

export default PrivateRoute;
