import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router';
import actionsCreators from '../../services/actionsCreators';

import Button from '../Button';
import { EmailInput, UsernameInput, PasswordInput } from '../formInputs';

import classes from './Profile.module.sass';

function Profile({
  username,
  email,
  isLoggin,
  history,
  token,
  setNewUserData,
  isFetching,
  usernameError,
  emailError,
  passwordError,
  imageError,
}) {
  const { register, handleSubmit } = useForm();

  if (!isLoggin) {
    history.push('/sing-in');
  }

  const onSubmit = (data) => {
    console.log(data);
    for (const key in data) {
      if (data[key].length === 0) delete data[key];
    }
    setNewUserData(data, token);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>Profile</div>
      <div className={classes['input-title']}>Username</div>
      <UsernameInput placeholder={username} errorMessage={usernameError} ref={register} />
      <div className={['input-title']}>Email address</div>
      <EmailInput placeholder={email} errorMessage={emailError} ref={register} />
      <div className={classes['input-title']}>New password</div>
      <PasswordInput errorMessage={passwordError} ref={register} />

      <div className={classes['input-title']}>Avatar image (url)</div>
      <UsernameInput errorMessage={imageError} ref={register} name="image" />

      <Button submit style={['wide', 'blue', 'margin-bottom']} disabled={isFetching} loading={isFetching}>
        Save
      </Button>
    </form>
  );
}

Profile.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  isLoggin: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  token: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  setNewUserData: PropTypes.func.isRequired,
  usernameError: PropTypes.string,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  imageError: PropTypes.string,
};

Profile.defaultProps = {
  username: 'no username',
  email: 'no email',
  token: '',
  usernameError: '',
  emailError: '',
  passwordError: '',
  imageError: '',
};

const mapStateToProps = (state) => {
  const props = {
    isLoggin: false,
    isFetching: state.isFetching,
  };

  if (state.user.errors) {
    const { errors } = state.user;
    if (errors.username) props.usernameError = errors.username;
    if (errors.email) props.emailError = errors.email;
    if (errors.password) props.passwordError = errors.password;
    if (errors.image) props.imageError = errors.image;
  }

  const userInState = state.user.user;
  const { isLoggin } = state.user;

  if (userInState && isLoggin) {
    props.username = userInState.username;
    props.email = userInState.email;
    props.isLoggin = isLoggin;
    props.token = userInState.token;
  }

  return props;
};

const mapDispatchToProps = (dispatch) => ({
  setNewUserData: (userObj, token) => actionsCreators.updateUser(dispatch, userObj, token),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
