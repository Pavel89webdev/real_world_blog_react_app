import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from '../LoadingBar';

function PrivateRoute({ isFetching, isLoggin, Component, render, ...rest }) {
  if (isFetching === true) {
    return <LoadingBar />;
  }

  if (isLoggin === true) {
    if (Component !== false) {
      return <Route {...rest} render={() => <Component />} />;
    }
    if (Component === false) {
      return <Route {...rest} />;
    }
  }

  if (isLoggin === false) {
    return <Redirect to="/sing-in" />;
  }
}

PrivateRoute.propTypes = {
  isLoggin: PropTypes.bool.isRequired,
  Component: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  render: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  isFetching: PropTypes.bool.isRequired,
};

PrivateRoute.defaultProps = {
  Component: false,
  render: false,
};

const mapStateToProps = (state) => ({
  isLoggin: state.user.isLoggin,
  isFetching: state.isFetching,
});

export default connect(mapStateToProps)(PrivateRoute);
