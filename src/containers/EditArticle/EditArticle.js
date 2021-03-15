import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import { withRouter } from 'react-router';

import { actionsCreatorsArticle } from '../../redux/redusers/articles';

import LoadingBar from '../../components/LoadingBar';
import ErrorMessage from '../../components/ErrorMessage';
import NewArticleContainer from '../NewArticleContainer';
import { getUsernameFromLocaleSorage } from '../../helpers/localStorageForUser/localStorageForUser';

function EditArticle({
  articles,
  id,
  getArticleById,
  isFetching,
  errorMessage,
  isLoggin,
  username,
  history,
}) {
  if (username === null) username = getUsernameFromLocaleSorage();

  const article = articles.find((item) => item.slug === id);

  if (article && article.author.username !== username) {
    history.push(`/article/${id}`);
    return null;
  }

  if (article) {
    const { title, description, body, tagList } = article;

    return (
      <NewArticleContainer
        title="Edit article"
        articleTitle={title}
        articleDescription={description}
        articleBody={body}
        loading={isFetching}
        isLoggin={isLoggin}
        id={id}
        articleTagList={tagList}
      />
    );
  }

  const throttleGetArticleById = throttle(() => {
    if (article === undefined) {
      return getArticleById(id);
    }
    return null;
  }, 300);

  if (article === undefined && !isFetching && !errorMessage) {
    throttleGetArticleById();
  }

  if (isFetching) {
    return <LoadingBar />;
  }

  if (errorMessage) {
    return <ErrorMessage description={errorMessage} />;
  }

  return <div>No data :((</div>;
}

EditArticle.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isLoggin: PropTypes.bool.isRequired,
  getArticleById: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  history: PropTypes.object.isRequired,
  username: PropTypes.string,
};

EditArticle.defaultProps = {
  errorMessage: '',
  username: null,
};

const mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  isLoggin: state.user.isLoggin,
  articles: state.articles.articles,
  errorMessage: state.articles.error,
  username: state.user.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  getArticleById: (id) => actionsCreatorsArticle.getOneArticle(dispatch, id),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditArticle)
);
