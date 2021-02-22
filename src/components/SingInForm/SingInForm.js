import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useForm } from 'react-hook-form';
import actionsCreators from '../../services/actionsCreators';

import classes from './SingInForm.module.sass';
import Button from '../Button';
import FormErrorMessage from '../FormErrorMessage';

import { EmailInput, PasswordInput } from '../formInputs';

function SingInForm({ singIn, isLoggin, history, isFetching, emailOrPasswordInvalid }) {
  // eslint-disable-next-line prefer-const
  const { register, handleSubmit } = useForm();

  if (isLoggin) history.push('/articles/page/1');

  const onSubmit = (data) => {
    const newUserObj = {
      email: data.email,
      password: data.password,
    };
    singIn(newUserObj);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>Sing In</div>
      <div className={classes['input-title']}>Email address</div>
      <EmailInput ref={register} required />
      <div className={classes['input-title']}>Password</div>
      <PasswordInput ref={register} required />
      <Button submit style={['wide', 'blue', 'margin-bottom']} disabled={isFetching} loading={isFetching}>
        Login
      </Button>
      {emailOrPasswordInvalid && <FormErrorMessage serverError="email or password is invalid" />}
      <div className={classes['sing-up']}>
        Don’t have an account? <Link to="/sing-up">Sign Up.</Link>
      </div>
    </form>
  );
}

SingInForm.propTypes = {
  singIn: PropTypes.func.isRequired,
  isLoggin: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  emailOrPasswordInvalid: PropTypes.bool,
};

SingInForm.defaultProps = {
  emailOrPasswordInvalid: false,
};

const mapStateToProps = (state) => {
  const props = {
    isLoggin: state.user.isLoggin,
    isFetching: state.isFetching,
  };

  if (state.user.errors) {
    props.emailOrPasswordInvalid = true;
  }

  return props;
};

const mapDispatchToProps = (dispatch) => ({
  singIn: (user) => actionsCreators.singIn(dispatch, user),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingInForm));
