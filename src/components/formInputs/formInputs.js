import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FormErrorMessage from '../FormErrorMessage';
import Button from '../Button';

import classes from './formInputs.module.sass';

// my custom hook to text inputs:

const useLocalStorage = (name) => {
  const [currentValue, setValue] = useState('');

  useEffect(() => {
    if (currentValue !== '') {
      window.localStorage.setItem(name, currentValue);
    }
    if (currentValue === '') {
      const valueFromLocalStorage = window.localStorage.getItem(name);
      if (valueFromLocalStorage !== null && valueFromLocalStorage.length > 1) setValue(valueFromLocalStorage);
    }
  }, [setValue, currentValue, name]);

  return [currentValue, setValue];
};

const TextInput = React.forwardRef(({ placeholder, required, errorMessage, name }, ref) => {
  const [currentValue, setValue] = useLocalStorage(name);
  const [isValidate, setValidate] = useState(true);

  return (
    <>
      <input
        name={name}
        type="text"
        minLength="1"
        required={required}
        className={classNames(classes.input, isValidate ? null : classes['input-invalid'])}
        placeholder={placeholder}
        ref={ref}
        onInput={(e) => {
          const { value } = e.target;
          setValue(value);
          setValidate(value.length > 0);
        }}
        value={currentValue}
      />
      {!errorMessage && !isValidate && <FormErrorMessage serverError="write some" />}
      {errorMessage && <FormErrorMessage serverError={errorMessage} />}
    </>
  );
});

TextInput.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
  placeholder: 'text',
  required: false,
  errorMessage: '',
};

const TextArea = React.forwardRef(({ placeholder, required, errorMessage, name }, ref) => {
  const [currentValue, setValue] = useLocalStorage(name);
  const [isValidate, setValidate] = useState(true);

  return (
    <>
      <textarea
        name={name}
        type="text"
        minLength="1"
        rows="8"
        required={required}
        className={classNames(classes.input, isValidate ? null : classes['input-invalid'])}
        placeholder={placeholder}
        ref={ref}
        onInput={(e) => {
          const { value } = e.target;
          setValue(value);
          setValidate(value.length > 0);
        }}
        value={currentValue}
      />
      {!errorMessage && !isValidate && <FormErrorMessage serverError="write some" />}
      {errorMessage && <FormErrorMessage serverError={errorMessage} />}
    </>
  );
});

TextArea.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
};

TextArea.defaultProps = {
  placeholder: 'text',
  required: false,
  errorMessage: '',
};

const TagInput = React.forwardRef(({ name, widthAddButton, onDelete, onAdd }, ref) => {
  const [currentValue, setValue] = useState('');

  return (
    <div className={classes['tag-wrapper']}>
      <input
        name={name}
        type="text"
        className={classNames(classes.input, classes['input-tag'])}
        placeholder="Tag"
        ref={ref}
        onInput={(e) => {
          const { value } = e.target;
          setValue(value);
        }}
        value={currentValue}
      />
      <Button
        style={['margin-right-small', 'red', 'outlined', 'wide-padding']}
        onClick={() => {
          onDelete(name);
        }}
      >
        Delete
      </Button>
      {widthAddButton && (
        <Button style={['blue', 'outlined', 'text-blue', 'wide-padding']} onClick={onAdd}>
          Add tag
        </Button>
      )}
    </div>
  );
});

TagInput.propTypes = {
  widthAddButton: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

TagInput.defaultProps = {
  widthAddButton: false,
};

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

export { EmailInput, PasswordInput, UsernameInput, Checkbox, ConfirmPasswordInput, TextInput, TextArea, TagInput };
