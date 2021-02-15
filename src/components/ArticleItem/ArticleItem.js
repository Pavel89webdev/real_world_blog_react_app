import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import classNames from 'classnames';

import classes from './ArticleItem.module.sass';

import avatar from '../../img/avatar.png';

function ArticleItem({ title, likesCount, tags, userName, publishDate, avatarUrl, description, body, id }) {
  const [isActive, setActive] = useState(false);

  if (!title && !likesCount && !tags && !userName && !publishDate && !avatarUrl && !description && !body) {
    return <div className={classes.article}>No data :(</div>;
  }

  const clickHandler = (state) => setActive(!state);

  const bodyClasses = isActive ? classNames(classes.body, classes.active) : classes.body;
  const link = `/article/${id}`;

  const renderTags = () => tags.map((tag) => <p key={tag}>{tag}</p>);
  const renderPublishDate = () => {
    const date = new Date(publishDate);
    return format(date, 'd, MMM yyyy');
  };

  return (
    <div
      className={classes.article}
      role="button"
      tabIndex="0"
      onClick={() => {
        clickHandler(isActive);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') clickHandler(isActive);
      }}
    >
      <header className={classes.header}>
        <div>
          <div className={classes.wrapper}>
            <Link to={link}>
              <div className={classes.title}>{title} </div>
            </Link>
            <div className={classes.likes}>{likesCount}</div>
          </div>
          <div className={classes.tags}>{renderTags()}</div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.published}>
            <div className={classes.name}>{userName}</div>
            <div className={classes.date}>{renderPublishDate()}</div>
          </div>
          <div className={classes.avatar}>
            <img src={avatarUrl} alt="avatar" />
          </div>
        </div>
      </header>
      <div className={classes.description}>{description}</div>
      <div className={bodyClasses}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}

ArticleItem.propTypes = {
  title: PropTypes.string,
  likesCount: PropTypes.number,
  tags: PropTypes.array,
  userName: PropTypes.string,
  publishDate: PropTypes.string,
  avatarUrl: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.string,
};

ArticleItem.defaultProps = {
  title: 'title',
  likesCount: 1,
  tags: ['Tag1', 'Tag2'],
  userName: 'userName',
  publishDate: '2021-02-15T10:20:29.238Z',
  avatarUrl: avatar,
  description: 'decription',
  body: 'body',
  id: 'id',
};

export default ArticleItem;
