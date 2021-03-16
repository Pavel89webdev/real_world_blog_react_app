import React from 'react';
import PropTypes from 'prop-types';

import classes from './Ripple.module.sass';

function Ripple({ event, showNow }) {
  if (!showNow || event.target === undefined) return null;

  const button = event.target;
  const diameter = Math.max(
    Number.parseInt(button.offsetWidth, 10),
    Number.parseInt(button.offsetHeight, 10)
  );
  const width = `${diameter}px`;
  const height = width;
  const radius = diameter / 2;
  const left = `${event.nativeEvent.offsetX - radius}px`;
  const top = `${event.nativeEvent.offsetY - radius}px`;

  const style = {
    width,
    height,
    top,
    left,
  };

  return <span style={{ ...style }} className={classes.ripple} />;
}

Ripple.propTypes = {
  event: PropTypes.object.isRequired,
  showNow: PropTypes.bool,
};

Ripple.defaultProps = {
  showNow: false,
};

export default Ripple;
