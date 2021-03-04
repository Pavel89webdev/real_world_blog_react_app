import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionsCreators from '../../services/actionsCreators';
import deleteUserfromLocaleStorage from '../../services/deleteUserfromLocaleStorage';

import Button from '../Button';
import avatar from '../../img/avatar.png';

import classes from './Header.module.sass';

function Header({ isLoggin, userName, imgUrl, logOut }) {
  const img = imgUrl || avatar;

  function loggingOut() {
    logOut();
    deleteUserfromLocaleStorage();
  }

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.title}>Realworld Blog</div>
      </Link>
      <div className={classes.wrapper}>
        {isLoggin && (
          <>
            <Link to="/my-articles">
              <Button style={['outlined', 'blue', 'text-blue', 'small', 'margin-right']}>My articles</Button>
            </Link>
            <Link to="/new-article">
              <Button style={['outlined', 'green', 'small', 'margin-right']}>Create article</Button>
            </Link>
            <div className={classes.username}>{userName}</div>
            <Link to="/profile">
              <div className={classes.avatar}>
                <img src={img} alt="avatar" />
              </div>
            </Link>
            <Button style={['outlined']} onClick={loggingOut}>
              Log Out
            </Button>
          </>
        )}

        {!isLoggin && (
          <>
            <Link to="/sing-in">
              <Button>Sing In</Button>
            </Link>
            <Link to="/sing-up">
              <Button style={['outlined', 'green']}>Sing Up</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  isLoggin: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  imgUrl: PropTypes.string,
  logOut: PropTypes.func.isRequired,
};

Header.defaultProps = {
  userName: '',
  imgUrl: '',
};

const mapStateToProps = (state) => {
  const props = {
    isLoggin: state.user.isLoggin,
  };

  if (state.user.user) {
    props.userName = state.user.user.username;
    props.imgUrl = state.user.user.image || '';
  }

  return props;
};

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(actionsCreators.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
