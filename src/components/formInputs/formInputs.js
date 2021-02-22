import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FormErrorMessage from '../FormErrorMessage';

import classes from './formInputs.module.sass';

const EmailInput = React.forwardRef(({ placeholder, required, errorMessage }, ref) => {
  const [currentValue, setValue] = useState('');
  const [isValidate, setValidate] = useState(true);

  return (
    <>
      <input
        name="email"
        type="email"
        minLength="3"
        required={required}
        className={classNames(classes.input, isValidate ? null : classes['input-invalid'])}
        placeholder={placeholder}
        ref={ref}
        onInput={(e) => {
          const { value } = e.target;
          setValue(value);
          setValidate(value.length > 3 && value.includes('@', 0));
        }}
        value={currentValue}
      />
      {!errorMessage && !isValidate && <FormErrorMessage serverError='email should contain "@"' />}
      {errorMessage && <FormErrorMessage serverError={errorMessage} />}
    </>
  );
});

EmailInput.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
};

EmailInput.defaultProps = {
  placeholder: 'Email',
  required: false,
  errorMessage: '',
};

const UsernameInput = React.forwardRef(({ placeholder, required, errorMessage, name }, ref) => {
  const [currentValue, setValue] = useState('');
  const [isValidate, setValidate] = useState(true);

  return (
    <>
      <input
        name={name}
        type="text"
        minLength="3"
        maxLength="20"
        required={required}
        className={classNames(classes.input, isValidate ? null : classes['input-invalid'])}
        placeholder={placeholder}
        ref={ref}
        onInput={(e) => {
          const { value } = e.target;
          setValue(value);
          setValidate(value.length > 2 && value.length < 21);
        }}
        value={currentValue}
      />
      {!errorMessage && !isValidate && <FormErrorMessage serverError="username should be from 3 to 20 letters" />}
      {errorMessage && <FormErrorMessage serverError={errorMessage} />}
    </>
  );
});

UsernameInput.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  name: PropTypes.string,
};

UsernameInput.defaultProps = {
  placeholder: 'Username',
  required: false,
  errorMessage: '',
  name: 'username',
};

const PasswordInput = React.forwardRef(({ placeholder, required, errorMessage, setPassword, password }, ref) => {
  const [isValidate, setValidate] = useState(true);

  return (
    <>
      <input
        name="password"
        type="password"
        minLength="8"
        maxLength="40"
        required={required}
        className={classNames(classes.input, isValidate ? null : classes['input-invalid'])}
        placeholder={placeholder}
        ref={ref}
        onInput={(e) => {
          const { value } = e.target;
          setPassword(value);
          setValidate(value.length > 7 && value.length < 41);
        }}
        value={password}
      />
      {!errorMessage && !isValidate && <FormErrorMessage serverError="passoword must be longer than 7 letters" />}
      {errorMessage && <FormErrorMessage serverError={errorMessage} />}
    </>
  );
});

PasswordInput.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  setPassword: PropTypes.func,
  password: PropTypes.string.isRequired,
};

PasswordInput.defaultProps = {
  placeholder: 'Password',
  required: false,
  errorMessage: '',
  setPassword: () => {},
};

const ConfirmPasswordInput = ({ placeholder, required, password, setConfirmPassword }) => {
  const [currentValue, setValue] = useState('');
  const [isValidate, setValidate] = useState(true);

  return (
    <>
      <input
        name="password"
        type="password"
        minLength="8"
        maxLength="40"
        required={required}
        className={classNames(classes.input, isValidate ? null : classes['input-invalid'])}
        placeholder={placeholder}
        onInput={(e) => {
          const { value } = e.target;
          setValue(value);
          setValidate(value === password);
          setConfirmPassword(value === password);
        }}
        value={currentValue}
      />
      {!isValidate && <FormErrorMessage serverError="passowords are different" />}
    </>
  );
};

ConfirmPasswordInput.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  password: PropTypes.string,
  setConfirmPassword: PropTypes.func,
};

ConfirmPasswordInput.defaultProps = {
  placeholder: 'Confirm password',
  required: false,
  password: '',
  setConfirmPassword: () => {},
};

const Checkbox = React.forwardRef(({ description, required }, ref) => (
  <label className={classes['checkbox-label']}>
    <input name="personal-data-agreement" className={classes.checkbox} type="checkbox" ref={ref} required={required} />
    <div className={classes['custom-checkbox']} />
    <p>{description}</p>
  </label>
));

Checkbox.propTypes = {
  description: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

Checkbox.defaultProps = {
  required: false,
};

export { EmailInput, PasswordInput, UsernameInput, Checkbox, ConfirmPasswordInput };
