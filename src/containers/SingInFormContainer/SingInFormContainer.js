import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useForm } from 'react-hook-form';
import { actionsCreatorsUser } from '../../redux/redusers/user';

import { validationEmail, validationPassword } from '../../helpers/validation';

import SingInForm from '../../components/SingInForm';

function SingInFormContainer({
  singIn,
  isLoggin,
  history,
  isFetching,
  emailOrPasswordInvalid,
  clearSingUpErrors,
}) {
  const { register, handleSubmit } = useForm();

  const [emailInput, setEmailInput] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  useEffect(() => {
    clearSingUpErrors();
  }, [clearSingUpErrors]);

  if (isLoggin) {
    history.push('/articles/page/1');
    return null; // ?? это не проблема??
  }

  const onSubmit = (data) => {
    if (!validationEmail(emailInput, setEmailErrorMessage)) return;
    if (!validationPassword(passwordInput, setPasswordErrorMessage)) return;

    const newUserObj = {
      email: data.email,
      password: data.password,
    };
    singIn(newUserObj);
  };

  // handleSubmit(onSubmit)

  return (
    <SingInForm
      onSubmit={handleSubmit(onSubmit)}
      emailInput={emailInput}
      emailErrorMessage={emailErrorMessage}
      setEmailInput={setEmailInput}
      passwordInput={passwordInput}
      passwordErrorMessage={passwordErrorMessage}
      setPasswordInput={setPasswordInput}
      isFetching={isFetching}
      emailOrPasswordInvalid={emailOrPasswordInvalid}
      ref={register}
    />
  );
}

SingInFormContainer.propTypes = {
  singIn: PropTypes.func.isRequired,
  isLoggin: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  emailOrPasswordInvalid: PropTypes.bool.isRequired,
  clearSingUpErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const props = {
    isLoggin: state.user.isLoggin,
    isFetching: state.user.isLogginFetching,
    emailOrPasswordInvalid: false,
  };

  if (state.user.errors) {
    props.emailOrPasswordInvalid = true;
  }

  return props;
};

const mapDispatchToProps = (dispatch) => ({
  singIn: (user) => actionsCreatorsUser.singIn(dispatch, user),
  clearSingUpErrors: () => dispatch(actionsCreatorsUser.clearSingUpErrors()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingInFormContainer)
);
