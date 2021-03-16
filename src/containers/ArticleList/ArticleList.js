import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import ArticleContainer from '../ArticleContainer';
import Pagination from '../Pagination';
import LoadingBar from '../../components/LoadingBar';
import NoDataMessage from '../../components/NoDataMessage';

import classes from './ArticleList.module.sass';

import { PAGE_SIZE } from '../../constants';

import {
  articles as reduceArtiles,
  actionsCreatorsArticle,
  initialState,
} from '../../redux/redusers/articles';

function ArticleList({ page, myArticles }) {
  const [{ articles, isFetching, articlesCount }, dispatch] = useReducer(
    reduceArtiles,
    initialState
  );

  useEffect(() => {
    const offset = (page - 1) * PAGE_SIZE;

    if (!myArticles) {
      actionsCreatorsArticle.getArticles(dispatch, offset);
    }
    if (myArticles) {
      actionsCreatorsArticle.getMyArticles(dispatch, offset);
    }
  }, [page, myArticles]);

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
};

ArticleList.defaultProps = {
  page: 1,
  myArticles: false,
};

export default ArticleList;
