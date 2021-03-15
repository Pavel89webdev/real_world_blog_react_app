import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Input } from '../formInputs';
import Button from '../Button';
import FormErrorMessage from '../FormErrorMessage';

import classes from './SingInForm.module.sass';

const SingInForm = React.forwardRef(
  (
    {
      onSubmit,
      emailInput,
      emailErrorMessage,
      setEmailInput,
      passwordInput,
      passwordErrorMessage,
      setPasswordInput,
      isFetching,
      emailOrPasswordInvalid,
    },
    ref
  ) => (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.title}>Sing In</div>
      <div className={classes['input-title']}>Email address</div>
      <Input
        name="email"
        type="email"
        minLength="3"
        placeholder="Email"
        ref={ref}
        required
        value={emailInput}
        errorMessage={emailErrorMessage}
        onInput={setEmailInput}
      />
      <div className={classes['input-title']}>Password</div>
      <Input
        name="password"
        type="password"
        minLength="8"
        maxLength="40"
        placeholder="Password"
        value={passwordInput}
        errorMessage={passwordErrorMessage}
        onInput={setPasswordInput}
        ref={ref}
        required
      />
      <Button
        type="submit"
        addClasses={['wide', 'blue', 'margin-bottom']}
        disabled={isFetching}
        loading={isFetching}
      >
        Login
      </Button>
      {emailOrPasswordInvalid && (
        <FormErrorMessage serverError="email or password is invalid" />
      )}
      <div className={classes['sing-up']}>
        Don’t have an account? <Link to="/sing-up">Sign Up.</Link>
      </div>
    </form>
  )
);

SingInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  emailInput: PropTypes.string,
  emailErrorMessage: PropTypes.string,
  setEmailInput: PropTypes.func.isRequired,
  passwordInput: PropTypes.string,
  passwordErrorMessage: PropTypes.string,
  setPasswordInput: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  emailOrPasswordInvalid: PropTypes.bool,
};

SingInForm.defaultProps = {
  emailInput: '',
  emailErrorMessage: '',
  passwordInput: '',
  passwordErrorMessage: '',
  isFetching: false,
  emailOrPasswordInvalid: false,
};

export default SingInForm;
