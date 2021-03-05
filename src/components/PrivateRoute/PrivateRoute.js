import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import getTokenFromLocaleStorage from '../../services/getTokenFromLocaleStorage';

function PrivateRoute({ isLoggin, Component, render, ...rest }) {
  const token = getTokenFromLocaleStorage();
  if (isLoggin === false && token === '') {
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
  render: PropTypes.func,
};

PrivateRoute.defaultProps = {
  Component: false,
  render: () => {},
};

const mapStateToProps = (state) => ({
  isLoggin: state.user.isLoggin,
});

export default connect(mapStateToProps)(PrivateRoute);
