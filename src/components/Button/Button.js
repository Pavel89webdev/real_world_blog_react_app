import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './Button.module.sass';

function Button({ children, style, submit, disabled, loading, onClick }) {
  let styles = null;

  if (Array.isArray(style)) {
    styles = style.map((i) => classes[i]);
  }

  const resultClass = classNames(classes.base, styles);

  return (
    <button className={resultClass} type={submit ? 'submit' : 'button'} disabled={disabled} onClick={onClick}>
      {loading ? 'loading' : children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  style: PropTypes.array,
  submit: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: 'Click Me',
  style: [],
  submit: false,
  disabled: false,
  loading: false,
  onClick: () => {},
};

export default Button;
