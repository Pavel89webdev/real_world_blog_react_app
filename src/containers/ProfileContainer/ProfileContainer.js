import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router';
import { actionsCreatorsUser } from '../../redux/redusers/user';
import {
  validationEmail,
  validationPassword,
  validationImageUrl,
  validationUsername,
} from '../../helpers/validation';

import Profilefrom from '../../components/ProfileFrom';

function ProfileContainer({
  username,
  email,
  setNewUserData,
  isFetching,
  usernameError,
  emailError,
  passwordError,
  imageError,
  image,
}) {
  const { register, handleSubmit } = useForm();

  const [emailInput, setEmailInput] = useState(email);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [usernameInput, setUsernameInput] = useState(username);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');

  const [imageInput, setImageInput] = useState(image);
  const [imageInputErrorMessage, setImageInputErrorMessage] = useState('');

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [isProfileEdit, setIsProfileEdit] = useState(true);

  const prepareSubmit = (data) => {
    if (
      !validationEmail(emailInput, setEmailErrorMessage) ||
      !validationPassword(passwordInput, setPasswordErrorMessage) ||
      !validationUsername(usernameInput, setUsernameErrorMessage) ||
      !validationImageUrl(imageInput, setImageInputErrorMessage)
    ) {
      return;
    }

    const validImage = imageInput.length > 5 || imageInput.length === 0;
    if (validImage === false) {
      setImageInputErrorMessage('it is too short URL');
      return;
    }
    if (validImage === true) {
      setImageInputErrorMessage('');
    }

    for (const key in data) {
      if (data[key].length === 0) delete data[key];
    }

    if (
      emailInput === email &&
      usernameInput === username &&
      passwordInput.length === 0 &&
      imageInput === image
    ) {
      setIsProfileEdit(false);
      return;
    }

    setNewUserData(data);
  };

  const onSubmit = handleSubmit(prepareSubmit);

  return (
    <Profilefrom
      onSubmit={onSubmit}
      usernameInput={usernameInput}
      setUsernameInput={setUsernameInput}
      usernameError={usernameError || usernameErrorMessage}
      emailInput={emailInput}
      emailError={emailError || emailErrorMessage}
      setEmailInput={setEmailInput}
      passwordInput={passwordInput}
      passwordError={passwordError || passwordErrorMessage}
      setPasswordInput={setPasswordInput}
      imageInput={imageInput}
      setImageInput={setImageInput}
      imageError={imageError || imageInputErrorMessage}
      isFetching={isFetching}
      isProfileEdit={isProfileEdit}
      ref={register}
    />
  );
}

ProfileContainer.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  setNewUserData: PropTypes.func.isRequired,
  usernameError: PropTypes.string,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  imageError: PropTypes.string,
  image: PropTypes.string,
};

ProfileContainer.defaultProps = {
  username: 'no username',
  email: '',
  usernameError: '',
  emailError: '',
  passwordError: '',
  imageError: '',
  image: '',
};

const mapStateToProps = (state) => {
  const props = {
    isLoggin: false,
    isFetching: state.user.isLogginFetching,
  };

  if (state.user.errors) {
    console.log('case');
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
    props.image = userInState.image;
  }

  return props;
};

const mapDispatchToProps = (dispatch) => ({
  setNewUserData: (userObj) =>
    actionsCreatorsUser.updateUser(dispatch, userObj),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
);
