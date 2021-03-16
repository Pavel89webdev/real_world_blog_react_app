import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './Button.module.sass';

import Ripple from '../Ripple';

function Button({ children, addClasses, type, disabled, loading, onClick }) {
  const [rippleProps, setRippleProps] = useState({ event: {}, showNow: true });

  useEffect(() => {
    const hide = () => setRippleProps({ event: {}, showNow: false });
    if (rippleProps.showNow) {
      window.setTimeout(() => {
        hide();
      }, 600);
    }
  }, [rippleProps.showNow]);

  const resultClass = classNames(
    classes.base,
    addClasses.map((i) => classes[i])
  );

  return (
    <button
      className={resultClass}
      type={type === 'button' ? 'button' : 'submit'}
      disabled={disabled}
      onClick={(event) => {
        setRippleProps({ event, showNow: true });
        onClick();
      }}
    >
      {loading ? 'loading' : children}
      {<Ripple {...rippleProps} />}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  addClasses: PropTypes.array,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: 'Click Me',
  addClasses: [],
  type: 'submit',
  disabled: false,
  loading: false,
  onClick: () => {},
};

export default Button;
