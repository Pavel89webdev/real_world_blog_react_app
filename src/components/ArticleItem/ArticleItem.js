import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import classNames from 'classnames';

import { Popconfirm /* message */ } from 'antd';

import realWorldService from '../../services/RealWorldService';

import Button from '../Button';

import actionsCreators from '../../services/actionsCreators';

import classes from './ArticleItem.module.sass';

import avatar from '../../img/avatar.png';

const text = 'Are you sure to delete this task?';

function ArticleItem({
  title,
  likesCount,
  tags,
  username,
  publishDate,
  avatarUrl,
  description,
  body,
  id,
  logginUsername,
  favorited,
  deleteArticle,
  isLoggin,
}) {
  const [isActive, setActive] = useState(false);
  const [isLiked, setLiked] = useState(favorited);
  const [likesCountState, setLikesCountState] = useState(likesCount);

  if (!title && !likesCount && !tags && !username && !publishDate && !avatarUrl && !description && !body) {
    return <div className={classes.article}>No data :(</div>;
  }

  const clickHandler = (state) => setActive(!state);

  function confirm() {
    deleteArticle(id);
  }

  function onLike() {
    if (isLiked) {
      setLikesCountState(likesCountState - 1);
      setLiked(false);
      realWorldService.unLikeArticle(id);
      return;
    }
    if (!isLiked) {
      setLikesCountState(likesCountState + 1);
      setLiked(true);
      realWorldService.likeArticle(id);
    }
  }

  const bodyClasses = isActive ? classNames(classes.body, classes.active) : classes.body;
  const link = `/article/${id}`;

  const renderTags = () => tags.map((tag) => <p key={tag}>{tag}</p>);
  const renderPublishDate = () => {
    const date = new Date(publishDate);
    return format(date, 'd, MMM yyyy');
  };

  return (
    <div className={classes.article}>
      <header className={classes.header}>
        <div>
          <div className={classes.wrapper}>
            <Link to={link}>
              <div className={classes.title}>{title} </div>
            </Link>

            {isLoggin && (
              <div
                className={classNames(classes.likes, isLiked ? classes.liked : null)}
                tabIndex="0"
                role="button"
                onKeyPress={(e) => {
                  if (e.code === 'Enter') onLike();
                }}
                onClick={onLike}
              >
                {likesCountState}
              </div>
            )}

            {!isLoggin && <div className={classNames(classes.likes, classes['likes-disabled'])}>{likesCountState}</div>}
          </div>
          <div className={classes.tags}>{renderTags()}</div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.published}>
            <div className={classes.name}>{username}</div>
            <div className={classes.date}>{renderPublishDate()}</div>
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
            clickHandler(isActive);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') clickHandler(isActive);
          }}
        >
          {description}
        </div>
        {username === logginUsername && (
          <div className={classes.wrapper}>
            <Popconfirm placement="rightTop" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
              <Button style={['outlined', 'red']}>Delete</Button>
            </Popconfirm>

            <Link to={`/article/${id}/edit`}>
              <Button style={['outlined', 'green']}>Edit</Button>
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

ArticleItem.propTypes = {
  title: PropTypes.string,
  likesCount: PropTypes.number,
  tags: PropTypes.array,
  username: PropTypes.string,
  publishDate: PropTypes.string,
  avatarUrl: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.string,
  logginUsername: PropTypes.string,
  deleteArticle: PropTypes.func.isRequired,
  isLoggin: PropTypes.bool.isRequired,
  favorited: PropTypes.bool.isRequired,
};

ArticleItem.defaultProps = {
  title: 'title',
  likesCount: 0,
  tags: ['Tag1', 'Tag2'],
  username: 'username',
  publishDate: '2021-02-15T10:20:29.238Z',
  avatarUrl: avatar,
  description: 'decription',
  body: 'body',
  id: 'id',
  logginUsername: '',
};

const mapStateToProps = (state) => ({
  logginUsername: state.user.user.username,
  isLoggin: state.user.isLoggin,
});

const mapDispatchToProps = (dispatch) => ({
  deleteArticle: (id) => actionsCreators.deleteArticle(dispatch, id),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem);
