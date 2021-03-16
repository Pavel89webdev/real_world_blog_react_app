import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArticleContainer from '../ArticleContainer';
import LoadingBar from '../../components/LoadingBar';
import { actionsCreatorsArticle } from '../../redux/redusers/articles';
import ErrorMessage from '../../components/ErrorMessage';
import NoDataMessage from '../../components/NoDataMessage';

function ArticleWithService({
  articles,
  id,
  getArticleById,
  isFetching,
  errorMessage,
  logginUsername,
}) {
  const article = articles.find((item) => item.slug === id);

  if (article && !errorMessage) {
    const {
      title,
      favoritesCount,
      tagList,
      author,
      updatedAt,
      description,
      slug,
      body,
      favorited,
    } = article;
    return (
      <ArticleContainer
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
        favorited={favorited}
      />
    );
  }

  if (!article && !isFetching && !errorMessage) {
    getArticleById(id);
  }

  if (isFetching) {
    return <LoadingBar />;
  }
  if (errorMessage) {
    return <ErrorMessage description={errorMessage} />;
  }

  return <NoDataMessage />;
}

const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  isFetching: state.articles.isFetching,
  errorMessage: state.articles.error,
  logginUsername: state.user.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  getArticleById: (id) => actionsCreatorsArticle.getOneArticle(dispatch, id),
});

ArticleWithService.propTypes = {
  articles: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  getArticleById: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  logginUsername: PropTypes.string,
};

ArticleWithService.defaultProps = {
  errorMessage: '',
  logginUsername: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleWithService);
