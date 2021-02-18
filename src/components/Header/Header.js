import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../Button';
import avatar from '../../img/avatar.png';

import classes from './Header.module.sass';

function Header({ isLoggin, userName, imgUrl }) {
  const img = imgUrl || avatar;
  return (
    <header className={classes.header}>
      <div className={classes.title}>Realworld Blog</div>
      <div className={classes.wrapper}>
        {isLoggin && (
          <>
            <Button style={['outlined', 'green', 'small', 'margin-right']}>Create article</Button>
            <div className={classes.username}>{userName}</div>
            <div className={classes.avatar}>
              <img src={img} alt="avatar" />
            </div>
            <Button style={['outlined']}>Log Out</Button>
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
};

Header.defaultProps = {
  userName: '',
  imgUrl: '',
};

const mapStateToProps = (state) => ({
  isLoggin: state.user.isLoggin,
  userName: state.user.user.username,
  imgUrl: state.user.user.image || '',
});

export default connect(mapStateToProps)(Header);
