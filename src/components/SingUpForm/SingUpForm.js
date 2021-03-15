import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '../Button';
import { Checkbox, Input } from '../formInputs';

import classes from './SingUpForm.module.sass';

const SingUpForm = React.forwardRef(
  (
    {
      usernameInput,
      setUsernameInput,
      usernameError,
      onSubmit,
      emailInput,
      emailError,
      setEmailInput,
      passwordInput,
      passwordError,
      setPasswordInput,
      confirmPasswordInput,
      confirmPasswordInputErrorMessage,
      setConfirmPasswordInput,
      isFetching,
    },
    ref
  ) => (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.title}>Create new account</div>
      <div className={classes['input-title']}>Username</div>
      <Input
        name="username"
        value={usernameInput}
        type="text"
        minLength="3"
        maxLength="20"
        required
        placeholder="Username"
        onInput={setUsernameInput}
        errorMessage={usernameError}
        ref={ref}
      />

      <div className={classes['input-title']}>Email address</div>
      <Input
        name="email"
        type="email"
        minLength="3"
        placeholder="Email"
        ref={ref}
        required
        value={emailInput}
        errorMessage={emailError}
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
        errorMessage={passwordError}
        onInput={setPasswordInput}
        required
        ref={ref}
      />
      <div className={classes['input-title']}>Confirm password</div>
      <Input
        name="confirm password"
        type="password"
        minLength="8"
        maxLength="40"
        placeholder="Confirm password"
        value={confirmPasswordInput}
        errorMessage={confirmPasswordInputErrorMessage}
        onInput={setConfirmPasswordInput}
        required
      />
      <hr />
      <Checkbox
        description="I agree to the processing of my personal information"
        required
      />

      <Button
        type="submit"
        addClasses={['wide', 'blue', 'margin-bottom']}
        disabled={isFetching}
        loading={isFetching}
      >
        Create
      </Button>
      <div className={classes['sing-in']}>
        Already have an account? <Link to="/sing-in">Sign In.</Link>
      </div>
    </form>
  )
);

SingUpForm.propTypes = {
  usernameInput: PropTypes.string,
  setUsernameInput: PropTypes.func.isRequired,
  usernameError: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  emailInput: PropTypes.string,
  emailError: PropTypes.string,
  setEmailInput: PropTypes.func.isRequired,
  passwordInput: PropTypes.string,
  passwordError: PropTypes.string,
  setPasswordInput: PropTypes.func.isRequired,
  confirmPasswordInput: PropTypes.string,
  confirmPasswordInputErrorMessage: PropTypes.string,
  setConfirmPasswordInput: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

SingUpForm.defaultProps = {
  usernameInput: '',
  usernameError: '',
  emailInput: '',
  emailError: '',
  passwordInput: '',
  passwordError: '',
  confirmPasswordInput: '',
  confirmPasswordInputErrorMessage: '',
  isFetching: false,
};

export default SingUpForm;
