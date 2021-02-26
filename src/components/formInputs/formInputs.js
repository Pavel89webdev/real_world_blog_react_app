import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FormErrorMessage from '../FormErrorMessage';
import Button from '../Button';

import classes from './formInputs.module.sass';

const Input = React.forwardRef(
  ({ value, type, minLength, maxLength, placeholder, required, errorMessage, name, onInput }, ref) => (
    <>
      <input
        name={name}
        type={type}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        className={classNames(classes.input, errorMessage ? classes['input-invalid'] : null)}
        placeholder={placeholder}
        ref={ref}
        onInput={(e) => {
          onInput(e.target.value);
        }}
        value={value}
      />
      {errorMessage && <FormErrorMessage serverError={errorMessage} />}
    </>
  )
);

Input.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onInput: PropTypes.func.isRequired,
};

Input.defaultProps = {
  placeholder: 'text',
  required: false,
  errorMessage: '',
  value: '',
  type: 'text',
  minLength: 0,
  maxLength: null,
};

const TextArea = React.forwardRef(
  ({ value, minLength, maxLength, placeholder, required, errorMessage, name, onInput }, ref) => (
    <>
      <textarea
        name={name}
        rows="8"
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        className={classNames(classes.input, errorMessage ? classes['input-invalid'] : null)}
        placeholder={placeholder}
        ref={ref}
        onInput={(e) => {
          onInput(e.target.value);
        }}
        value={value}
      />
      {errorMessage && <FormErrorMessage serverError={errorMessage} />}
    </>
  )
);

TextArea.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onInput: PropTypes.func.isRequired,
};

TextArea.defaultProps = {
  placeholder: 'text',
  required: false,
  errorMessage: '',
  value: '',
  minLength: 0,
  maxLength: null,
};

const TagInput = React.forwardRef(({ value, name, widthAddButton, onDelete, onAdd, onInput }, ref) => (
  <div className={classes['tag-wrapper']}>
    <input
      name={name}
      type="text"
      className={classNames(classes.input, classes['input-tag'])}
      placeholder="Tag"
      ref={ref}
      onInput={(e) => {
        onInput(e.target.value);
      }}
      value={value}
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
));

TagInput.propTypes = {
  widthAddButton: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  value: PropTypes.string,
  onInput: PropTypes.func.isRequired,
};

TagInput.defaultProps = {
  widthAddButton: false,
  value: '',
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

export { Checkbox, TextArea, TagInput, Input };
