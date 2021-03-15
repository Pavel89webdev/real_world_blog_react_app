import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { getTokenFromLocaleStorage } from '../../helpers/localStorageForUser/localStorageForUser';

function PrivateRoute({ isLoggin, component: Component, ...rest }) {
  const token = getTokenFromLocaleStorage();
  if (isLoggin === false && token === '') {
    return <Redirect to="/sing-in" />;
  }

  if (Component) {
    return <Route {...rest} component={Component} />;
  }
  return <Route {...rest} />;
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  render: PropTypes.func,
  isLoggin: PropTypes.bool.isRequired,
};

PrivateRoute.defaultProps = {
  component: false,
  render: () => {},
};

const mapStateToProps = (state) => ({
  isLoggin: state.user.isLoggin,
});

export default connect(mapStateToProps)(PrivateRoute);
