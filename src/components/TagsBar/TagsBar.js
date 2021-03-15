import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

function TagsBar({ tagsArr, onClick }) {
  const tags = tagsArr.map((item) => {
    const newItem = (
      <Button
        addClasses={['tag']}
        onClick={() => {
          onClick(item);
        }}
        type="button"
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
};

TagsBar.defaultProps = {
  tagsArr: [],
  onClick: () => {},
};

export default TagsBar;
