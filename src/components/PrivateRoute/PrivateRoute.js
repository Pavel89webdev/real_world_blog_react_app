import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ isLoggin, Component, render, ...rest }) {
  if (isLoggin === true) {
    if (Component !== false) {
      return <Route {...rest} render={() => <Component />} />;
    }
    if (Component === false) {
      return <Route {...rest} render={render} />;
    }
  }

  if (isLoggin === false) {
    return <Redirect to="/sing-in" />;
  }
}

PrivateRoute.propTypes = {
  isLoggin: PropTypes.bool.isRequired,
  Component: PropTypes.oneOf([PropTypes.func, PropTypes.bool]),
  render: PropTypes.oneOf([PropTypes.func, PropTypes.bool]),
};

PrivateRoute.defaultProps = {
  Component: false,
  render: false,
};

const mapStateToProps = (state) => ({
  isLoggin: state.user.isLoggin,
});

export default connect(mapStateToProps)(PrivateRoute);
