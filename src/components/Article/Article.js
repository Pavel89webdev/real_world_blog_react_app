import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import { Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import TagsBar from '../TagsBar';
import Button from '../Button';

import classes from './Article.module.sass';

function Article({
  link,
  title,
  isLoggin,
  isLiked,
  onLike,
  likesCountState,
  tags,
  username,
  date,
  avatarUrl,
  isActiveClickHandler,
  isActive,
  description,
  logginUsername,
  deleteConfirmText,
  onDelete,
  id,
  body,
}) {
  const bodyClasses = isActive
    ? classNames(classes.body, classes.active)
    : classes.body;

  return (
    <div className={classes.article}>
      <header className={classes.header}>
        <div>
          <div className={classes.wrapper}>
            <Link to={link}>
              <div className={classes.title}>{title} </div>
            </Link>

            <button
              disabled={isLoggin === false}
              type="button"
              className={classNames(
                classes.likes,
                isLiked ? classes.liked : null
              )}
              onKeyPress={(e) => {
                if (e.code === 'Enter') onLike();
              }}
              onClick={onLike}
            >
              {likesCountState}
            </button>
          </div>
          <TagsBar tagsArr={tags} disabled />
        </div>
        <div className={classes.wrapper}>
          <div className={classes.published}>
            <div className={classes.name}>{username}</div>
            <div className={classes.date}>{date}</div>
          </div>
          <div className={classes.avatar}>
            <img src={avatarUrl} alt="avatar" />
          </div>
        </div>
      </header>
      <div className={classes['wrapper-between']}>
        <div
          className={classes.description}
          role="button"
          tabIndex="0"
          onClick={() => {
            isActiveClickHandler(isActive);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') isActiveClickHandler(isActive);
          }}
        >
          {description}
        </div>
        {username === logginUsername && (
          <div className={classes.wrapper}>
            <Popconfirm
              placement="rightTop"
              title={deleteConfirmText}
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button addClasses={['outlined', 'red']} type="button">
                Delete
              </Button>
            </Popconfirm>

            <Link to={`/article/${id}/edit`}>
              <Button addClasses={['outlined', 'green']} type="button">
                Edit
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className={bodyClasses}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
}

Article.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isLoggin: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  likesCountState: PropTypes.number.isRequired,
  tags: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  isActiveClickHandler: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  logginUsername: PropTypes.string.isRequired,
  deleteConfirmText: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default Article;
