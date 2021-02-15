import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actionsCreators from '../../services/actionsCreators';

import ArticleItem from '../ArticleItem';
import Pagination from '../Pagination';
import LoadingBar from '../LoadingBar';

import classes from './ArticleList.module.sass';

import pageSize from '../Pagination/pageSize';

function ArticleList({ articles, isFetching, getArticles, page }) {
  const getArticlesCallback = useCallback(() => {
    const offset = (page - 1) * pageSize;
    return getArticles(offset);
  }, [page, getArticles]);

  useEffect(() => {
    if (!isFetching && articles.length === 0) {
      getArticlesCallback();
    }
  }, [articles.length, isFetching, getArticlesCallback, page]);

  if (isFetching) {
    return <LoadingBar />;
  }

  if (!articles.length && !isFetching) {
    return <div>No data :((</div>;
  }

  const renderArticle = ({ title, favoritesCount, tagList, author, updatedAt, description, slug, body }) => (
    <li className={classes.li} key={slug}>
      <ArticleItem
        title={title}
        likesCount={favoritesCount}
        tags={tagList}
        userName={author.username}
        publishDate={updatedAt}
        avatarUrl={author.image}
        description={description}
        body={body}
        key={slug}
        id={slug}
      />
    </li>
  );

  const renderArticleList = () => articles.map((article) => renderArticle(article));

  return (
    <>
      <ul className={classes.ul}>{renderArticleList()}</ul>
      <Pagination />
    </>
  );
}

const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  isFetching: state.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getArticles: (offset) => actionsCreators.getArticles(dispatch, offset),
});

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getArticles: PropTypes.func.isRequired,
  page: PropTypes.number,
};

ArticleList.defaultProps = {
  page: 1,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
