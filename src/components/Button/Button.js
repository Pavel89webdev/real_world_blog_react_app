import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './Button.module.sass';

function Button({ children, style }) {
  let styles = null;
  if (Array.isArray(style)) {
    styles = style.map((i) => classes[i]);
  }

  const resultClass = classNames(classes.base, styles);

  return (
    <button className={resultClass} type="button">
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  style: PropTypes.array,
};

Button.defaultProps = {
  children: 'Click Me',
  style: [],
};

export default Button;
