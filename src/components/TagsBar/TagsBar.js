import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

function TagsBar({ tagsArr, onClick, disabled }) {
  const tags = tagsArr.map((item) => {
    const newItem = (
      <Button
        key={item}
        addClasses={['tag']}
        onClick={() => {
          onClick(item);
        }}
        type="button"
        disabled={disabled}
      >
        {item}
      </Button>
    );

    return newItem;
  });

  return <>{tags}</>;
}

TagsBar.propTypes = {
  tagsArr: PropTypes.array,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

TagsBar.defaultProps = {
  tagsArr: [],
  onClick: () => {},
  disabled: false,
};

export default TagsBar;
