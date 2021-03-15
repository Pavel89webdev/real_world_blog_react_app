import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '../formInputs';
import Button from '../Button';

import classes from './ProfileForm.module.sass';

const ProfileForm = React.forwardRef(
  (
    {
      onSubmit,
      usernameInput,
      setUsernameInput,
      usernameError,
      emailInput,
      emailError,
      setEmailInput,
      passwordInput,
      passwordError,
      setPasswordInput,
      imageInput,
      setImageInput,
      imageError,
      isFetching,
      isProfileEdit,
    },
    ref
  ) => (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.title}>Profile</div>
      <div className={classes['input-title']}>Username</div>
      <Input
        name="username"
        value={usernameInput}
        type="text"
        minLength="3"
        maxLength="20"
        placeholder=""
        onInput={setUsernameInput}
        errorMessage={usernameError /* || usernameErrorMessage */}
        ref={ref}
      />
      <div className={['input-title']}>Email address</div>
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
      <div className={classes['input-title']}>New password</div>
      <Input
        name="password"
        type="password"
        minLength="8"
        maxLength="40"
        placeholder="Password"
        value={passwordInput}
        errorMessage={passwordError}
        onInput={setPasswordInput}
        ref={ref}
      />

      <div className={classes['input-title']}>Avatar image (url)</div>
      <Input
        name="image"
        type="text"
        minLength="3"
        placeholder="Avatar URL"
        ref={ref}
        value={imageInput}
        errorMessage={imageError}
        onInput={setImageInput}
      />

      <Button
        type="submit"
        addClasses={['wide', 'blue', 'margin-bottom']}
        disabled={isFetching}
        loading={isFetching}
      >
        Save
      </Button>
      {!isProfileEdit && (
        <div className={classes['input-title']}>Nothing to change</div>
      )}
    </form>
  )
);

ProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  usernameInput: PropTypes.string,
  setUsernameInput: PropTypes.func.isRequired,
  usernameError: PropTypes.string,
  emailInput: PropTypes.string,
  emailError: PropTypes.string,
  setEmailInput: PropTypes.func.isRequired,
  passwordInput: PropTypes.string,
  passwordError: PropTypes.string,
  setPasswordInput: PropTypes.func.isRequired,
  imageInput: PropTypes.string,
  setImageInput: PropTypes.func.isRequired,
  imageError: PropTypes.string,
  isFetching: PropTypes.bool,
  isProfileEdit: PropTypes.bool,
};

ProfileForm.defaultProps = {
  usernameInput: '',
  usernameError: '',
  emailInput: '',
  emailError: '',
  passwordInput: '',
  passwordError: '',
  imageInput: '',
  imageError: '',
  isFetching: '',
  isProfileEdit: true,
};

export default ProfileForm;
