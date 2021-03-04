import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Pagination as AntdPagination } from 'antd';

import actionsCreators from '../../services/actionsCreators';

import './Pagination.sass';

import pageSize from './pageSize';

function Pagination({ total, page, history }) {
  return (
    <AntdPagination
      size="small"
      total={total}
      current={page}
      pageSize={pageSize}
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
  onChangePage: (newPage) => dispatch(actionsCreators.changePage(newPage)),
  getNewArticles: (offset) => actionsCreators.getArticles(dispatch, offset),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pagination));
