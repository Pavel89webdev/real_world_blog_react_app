import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingBar from '../../components/LoadingBar';
import ProfileContainer from '../ProfileContainer';

function ProfileContainerWithLoader({ username, ...rest }) {
  if (!username) {
    return <LoadingBar />;
  }
  return <ProfileContainer {...rest} />;
}

ProfileContainerWithLoader.propTypes = {
  username: PropTypes.string,
};

ProfileContainerWithLoader.defaultProps = {
  username: '',
};

const mapStateToProps = (state) => ({
  username: state.user.user.username,
});

export default connect(mapStateToProps)(ProfileContainerWithLoader);
