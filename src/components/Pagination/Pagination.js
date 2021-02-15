import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Pagination as AntdPagination } from 'antd';

import actionsCreators from '../../services/actionsCreators';

import './Pagination.sass';

import pageSize from './pageSize';

function Pagination({ total, onChangePage, page, history, getNewArticles }) {
  return (
    <AntdPagination
      size="small"
      total={total}
      current={page}
      pageSize={pageSize}
      showSizeChanger={false}
      onChange={(newPage) => {
        onChangePage(newPage);
        history.push(`/articles/page/${newPage}`);
        const offset = (newPage - 1) * pageSize;
        getNewArticles(offset);
      }}
    />
  );
}

Pagination.propTypes = {
  total: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number,
  history: PropTypes.object.isRequired,
  getNewArticles: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  total: 20,
  page: 1,
};

const mapStateToProps = (state) => ({
  total: state.articles.totalCount,
  page: state.page,
});

const mapDispatchToProps = (dispatch) => ({
  onChangePage: (newPage) => dispatch(actionsCreators.changePage(newPage)),
  getNewArticles: (offset) => actionsCreators.getArticles(dispatch, offset),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pagination));
