import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import ArticleItem from '../ArticleItem';
import LoadingBar from '../LoadingBar';
import actionsCreators from '../../services/actionsCreators';
import ErrorMessage from '../ErrorMessage';

function ArticleItemWithService({ articles, id, getArticleById, isFetching, error, errorMessage, logginUsername }) {
  const article = articles.find((item) => item.slug === id);

  if (article) {
    const { title, favoritesCount, tagList, author, updatedAt, description, slug, body } = article;
    return (
      <ArticleItem
        title={title}
        likesCount={favoritesCount}
        tags={tagList}
        username={author.username}
        publishDate={updatedAt}
        avatarUrl={author.image}
        description={description}
        body={body}
        key={slug}
        id={slug}
        logginUsername={logginUsername}
      />
    );
  }

  const throttleGetArticleById = throttle(() => {
    if (article === undefined) {
      return getArticleById(id);
    }
    return null;
  }, 300);

  if (article === undefined && !isFetching && !error) {
    throttleGetArticleById();
  }

  if (isFetching) {
    return <LoadingBar />;
  }

  if (error) {
    return <ErrorMessage description={errorMessage} />;
  }

  return <div>No data :((</div>;
}

const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  isFetching: state.isFetching,
  error: state.errors.error,
  errorMessage: state.errors.message,
  logginUsername: state.user.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  getArticleById: (id) => actionsCreators.getOneArticle(dispatch, id),
});

ArticleItemWithService.propTypes = {
  articles: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  getArticleById: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  logginUsername: PropTypes.string,
};

ArticleItemWithService.defaultProps = {
  error: false,
  errorMessage: 'no error',
  logginUsername: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItemWithService);
