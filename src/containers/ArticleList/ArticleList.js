import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArticleContainer from '../ArticleContainer';
import Pagination from '../Pagination';
import LoadingBar from '../../components/LoadingBar';
import NoDataMessage from '../../components/NoDataMessage';

import { actionsCreatorsArticle } from '../../redux/redusers/articles';

import classes from './ArticleList.module.sass';

import { PAGE_SIZE } from '../../constants';

function ArticleList({
  page,
  myArticles,
  getArticles,
  getMyArticles,
  isFetching,
  articles,
  articlesCount,
}) {
  useEffect(() => {
    const offset = (page - 1) * PAGE_SIZE;

    if (!myArticles) {
      getArticles(offset);
    }
    if (myArticles) {
      getMyArticles(offset);
    }
  }, [page, myArticles, getArticles, getMyArticles]);

  if (isFetching) {
    return <LoadingBar />;
  }

  if (!articles.length && !isFetching) {
    return <NoDataMessage />;
  }

  const renderArticle = ({
    title,
    favoritesCount,
    tagList,
    author,
    updatedAt,
    description,
    slug,
    body,
    favorited,
  }) => (
    <li className={classes.li} key={slug}>
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
        favorited={favorited}
      />
    </li>
  );

  const renderArticleList = () =>
    articles.map((article) => renderArticle(article));

  return (
    <>
      <ul className={classes.ul}>{renderArticleList()}</ul>
      {articlesCount > PAGE_SIZE && <Pagination page={page} />}
    </>
    // передавать в пагинацию часть роута чтобы все не шло на список статей */
  );
}

ArticleList.propTypes = {
  page: PropTypes.number,
  myArticles: PropTypes.bool,
  getArticles: PropTypes.func.isRequired,
  getMyArticles: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  articles: PropTypes.array,
  articlesCount: PropTypes.number,
};

ArticleList.defaultProps = {
  page: 1,
  myArticles: false,
  isFetching: true, // стоит ли так делать? иначе первым деалом вылезает <NoDataMessage/> ?
  articles: [],
  articlesCount: 1,
};

const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  isFetching: state.articles.isFetching,
  articlesCount: state.articles.totalCount,
});

const mapDispatchToProps = (dispatch) => ({
  getArticles: (offset) => actionsCreatorsArticle.getArticles(dispatch, offset),
  getMyArticles: (offset) =>
    actionsCreatorsArticle.getMyArticles(dispatch, offset),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
