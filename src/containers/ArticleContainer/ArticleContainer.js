import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import ArticleService from '../../services/RealWorldService/ArticleService';

import Article from '../../components/Article';

import { actionsCreatorsArticle } from '../../redux/redusers/articles';

import avatar from '../../img/avatar.png';
import NoDataMessage from '../../components/NoDataMessage';

const deleteConfirmText = 'Are you sure to delete this task?';

function ArticleContainer({
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

  if (!id) {
    return <NoDataMessage />;
  }

  const changeActive = () => setActive(!isActive);

  function onDelete() {
    deleteArticle(id);
  }

  function onLike() {
    if (isLiked) {
      setLikesCountState(likesCountState - 1);
      setLiked(false);
      ArticleService.unLikeArticle(id);
      return;
    }
    if (!isLiked) {
      setLikesCountState(likesCountState + 1);
      setLiked(true);
      ArticleService.likeArticle(id);
    }
  }

  const link = `/article/${id}`;

  const renderPublishDate = () => {
    const date = new Date(publishDate);
    return format(date, 'd, MMM yyyy');
  };

  return (
    <Article
      link={link}
      title={title}
      isLoggin={isLoggin}
      isLiked={isLiked}
      onLike={onLike}
      likesCountState={likesCountState}
      tags={tags}
      username={username}
      date={renderPublishDate()}
      avatarUrl={avatarUrl}
      isActiveClickHandler={changeActive}
      isActive={isActive}
      description={description}
      logginUsername={logginUsername}
      deleteConfirmText={deleteConfirmText}
      onDelete={onDelete}
      id={id}
      body={body}
    />
  );
}

ArticleContainer.propTypes = {
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

ArticleContainer.defaultProps = {
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
  deleteArticle: (id) => actionsCreatorsArticle.deleteArticle(dispatch, id),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer);
