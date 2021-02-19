import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router';
import actionsCreators from '../../services/actionsCreators';

import Button from '../Button';
import FormErrorMessage from '../FormErrorMessage';

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
  const [newUsername, setNewUsername] = useState('');
  const [validateNewUsername, setValidateNewUsername] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [validateNewEmail, setValidateNewEmail] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [validateNewPassword, setValidateNewPassword] = useState(true);
  const [newAvatar, setNewAvatar] = useState('');
  const [validateNewAvatar, setValidateNewAvatar] = useState(true);

  const { register, handleSubmit } = useForm();

  if (!isLoggin) {
    history.push('/sing-in');
  }

  const onSubmit = (data) => {
    if (!validateNewAvatar || !validateNewPassword || !validateNewEmail || !validateNewUsername) return;
    for (const key in data) {
      if (data[key].length === 0) delete data[key];
    }
    console.log(data);
    setNewUserData(data, token);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>Profile</div>
      <div className={classes['input-title']}>Username</div>
      <input
        name="username"
        type="text"
        minLength="3"
        maxLength="20"
        className={classNames(classes.input, !validateNewUsername && classes['input-invalid'])}
        placeholder={username}
        ref={register}
        onInput={(e) => {
          const { value } = e.target;
          setNewUsername(value);
          setValidateNewUsername(value.length === 0 || (value.length > 3 && value.length < 20));
        }}
        value={newUsername}
      />
      {!validateNewUsername && <FormErrorMessage serverError="username should be longer 3 letters" />}
      {usernameError && <FormErrorMessage serverError={usernameError} />}
      <div className={['input-title']}>Email address</div>
      <input
        name="email"
        type="email"
        minLength="3"
        className={classNames(classes.input, !validateNewEmail && classes['input-invalid'])}
        placeholder={email}
        ref={register}
        onInput={(e) => {
          const { value } = e.target;
          setNewEmail(value);
          setValidateNewEmail(value.length === 0 || (value.length > 3 && value.includes('@', 0)));
        }}
        value={newEmail}
      />
      {!validateNewEmail && <FormErrorMessage serverError='email should contain "@"' />}
      {emailError && <FormErrorMessage serverError={emailError} />}
      <div className={classes['input-title']}>New password</div>
      <input
        name="password"
        type="password"
        minLength="8"
        maxLength="40"
        className={classNames(classes.input, !validateNewPassword && classes['input-invalid'])}
        placeholder="New password"
        ref={register}
        onInput={(e) => {
          const { value } = e.target;
          setNewPassword(value);
          setValidateNewPassword(value.length === 0 || (value.length > 7 && value.length < 40));
        }}
        value={newPassword}
      />
      {!validateNewPassword && <FormErrorMessage serverError="password should be from 8 to 40 letters" />}
      {passwordError && <FormErrorMessage serverError={passwordError} />}

      <div className={classes['input-title']}>Avatar image (url)</div>
      <input
        name="image"
        type="text"
        minLength="8"
        className={classNames(classes.input, !validateNewAvatar && classes['input-invalid'])}
        placeholder="Avatar image"
        ref={register}
        onInput={(e) => {
          const { value } = e.target;
          setNewAvatar(value);
          setValidateNewAvatar(value.length > 3 || value.length === 0);
        }}
        value={newAvatar}
      />
      {!validateNewAvatar && <FormErrorMessage serverError="url is too short" />}
      {imageError && <FormErrorMessage serverError={imageError} />}

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
    isLoggin: true,
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
