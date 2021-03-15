import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Pagination as AntdPagination } from 'antd';

import { actionsCreatorsArticle } from '../../redux/redusers/articles';
import { actionsCreatorsPagination } from '../../redux/redusers/pagination';

import './Pagination.sass';

import { PAGE_SIZE } from '../../constants';

function Pagination({ total, page, history }) {
  return (
    <AntdPagination
      size="small"
      total={total}
      current={page}
      pageSize={PAGE_SIZE}
      showSizeChanger={false}
      onChange={(newPage) => {
        history.push(`/articles/page/${newPage}`);
      }}
    />
  );
}

Pagination.propTypes = {
  total: PropTypes.number,
  page: PropTypes.number,
  history: PropTypes.object.isRequired,
};

Pagination.defaultProps = {
  total: 20,
  page: 1,
};

const mapStateToProps = (state) => ({
  total: state.articles.totalCount,
});

const mapDispatchToProps = (dispatch) => ({
  onChangePage: (newPage) =>
    dispatch(actionsCreatorsPagination.changePage(newPage)),
  getNewArticles: (offset) =>
    actionsCreatorsArticle.getArticles(dispatch, offset),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Pagination)
);
