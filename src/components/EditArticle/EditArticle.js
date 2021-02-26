import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';

import actionsCreators from '../../services/actionsCreators';

import LoadingBar from '../LoadingBar';
import ErrorMessage from '../ErrorMessage';
import NewArticle from '../NewArticle';

function EditArticle({ articles, id, getArticleById, isFetching, error, errorMessage, isLoggin }) {
  const article = articles.find((item) => item.slug === id);

  if (article) {
    const { title, description, body, tagList } = article;

    return (
      <NewArticle
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

EditArticle.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isLoggin: PropTypes.bool.isRequired,
  getArticleById: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

EditArticle.defaultProps = {
  error: false,
  errorMessage: '',
};

const mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  isLoggin: state.user.isLoggin,
  articles: state.articles.articles,
  error: state.errors.error,
  errorMessage: state.errors.message,
});

const mapDispatchToProps = (dispatch) => ({
  getArticleById: (id) => actionsCreators.getOneArticle(dispatch, id),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
