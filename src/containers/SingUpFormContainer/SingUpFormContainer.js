import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router';
import SingUpForm from '../../components/SingUpForm';

import {
  validationEmail,
  validationPassword,
  validationUsername,
  confirmPassword,
} from '../../helpers/validation';

import { actionsCreatorsUser } from '../../redux/redusers/user';

function SingUpFormContainer({
  singUp,
  usernameError,
  emailError,
  passwordError,
  isFetching,
  isLoggin,
  history,
  clearSingUpErrors,
}) {
  const [emailInput, setEmailInput] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [usernameInput, setUsernameInput] = useState('');
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [
    confirmPasswordInputErrorMessage,
    setConfirmPasswordInputErrorMessage,
  ] = useState('');

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    clearSingUpErrors();
  }, [clearSingUpErrors]);

  if (isLoggin) {
    history.push('/articles/page/1');
  }

  const onSubmit = (data) => {
    if (
      !validationEmail(emailInput, setEmailErrorMessage) ||
      !validationPassword(passwordInput, setPasswordErrorMessage) ||
      !validationUsername(usernameInput, setUsernameErrorMessage) ||
      !confirmPassword(
        passwordInput,
        confirmPasswordInput,
        setConfirmPasswordInputErrorMessage
      )
    ) {
      return;
    }

    const newUserObj = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    singUp(newUserObj);
  };

  return (
    <SingUpForm
      usernameInput={usernameInput}
      setUsernameInput={setUsernameInput}
      usernameError={usernameError || usernameErrorMessage}
      onSubmit={handleSubmit(onSubmit)}
      emailInput={emailInput}
      emailError={emailError || emailErrorMessage}
      setEmailInput={setEmailInput}
      passwordInput={passwordInput}
      passwordError={passwordError || passwordErrorMessage}
      setPasswordInput={setPasswordInput}
      confirmPasswordInput={confirmPasswordInput}
      confirmPasswordInputErrorMessage={confirmPasswordInputErrorMessage}
      setConfirmPasswordInput={setConfirmPasswordInput}
      isFetching={isFetching}
      ref={register}
    />
  );
}

SingUpFormContainer.propTypes = {
  singUp: PropTypes.func.isRequired,
  usernameError: PropTypes.string,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  isLoggin: PropTypes.bool,
  history: PropTypes.object.isRequired,
  clearSingUpErrors: PropTypes.func.isRequired,
};

SingUpFormContainer.defaultProps = {
  usernameError: '',
  emailError: '',
  passwordError: '',
  isLoggin: false,
};

const mapStateToProps = (state) => {
  const { user } = state;
  const props = {
    isFetching: state.user.isLogginFetching,
    isLoggin: user.isLoggin,
  };
  if (user.errors) {
    if (user.errors.username) {
      props.usernameError = '' || user.errors.username[0];
    }
    if (user.errors.email) {
      props.emailError = '' || user.errors.email[0];
    }
    if (user.errors.password) {
      props.passwordError = '' || user.errors.password[0];
    }
  }

  return props;
};

const mapDispatchToProps = (dispatch) => ({
  singUp: (user) => actionsCreatorsUser.singUp(dispatch, user),
  clearSingUpErrors: () => dispatch(actionsCreatorsUser.clearSingUpErrors()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingUpFormContainer)
);
