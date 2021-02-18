import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import actionsCreators from '../../services/actionsCreators';

import classes from './SingInForm.module.sass';
import Button from '../Button';
import FormErrorMessage from '../FormErrorMessage';

function SingInForm({ singIn, isLoggin, history, isFetching, emailOrPasswordInvalid }) {
  const [email, setEmail] = useState('');
  const [validateEmail, setValidateEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [validatePassword, setValidatePassword] = useState(true);

  const { register, handleSubmit } = useForm();

  if (isLoggin) history.push('/articles/page/1');

  // добавить условие ели пользователь залогине - линковать его на главную (артикли)
  // проверять и в локалсторадже

  const onSubmit = (data) => {
    // if (!checkConfirmPassword || inValidUserName) return; тут проверка клиентской валидации
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
      <input
        name="email"
        type="email"
        minLength="3"
        maxLength="20"
        required
        className={classNames(classes.input, validateEmail ? null : classes['input-invalid'])}
        placeholder="Email"
        ref={register}
        onInput={(e) => {
          const { value } = e.target;
          setEmail(value);
          setValidateEmail(value.legth > 3 || value.includes('@', 0));
        }}
        value={email}
      />
      {!validateEmail && <FormErrorMessage serverError='email should contain "@"' />}
      <div className={classes['input-title']}>Password</div>
      <input
        name="password"
        type="password"
        minLength="8"
        maxLength="40"
        required
        className={classNames(classes.input, validatePassword ? null : classes['input-invalid'])}
        placeholder="Password"
        ref={register}
        onInput={(e) => {
          const { value } = e.target;
          setPassword(value);
          setValidatePassword(value.length > 7);
        }}
        value={password}
      />
      {!validatePassword && <FormErrorMessage serverError="password should be longer that 7 letters" />}

      <Button submit style={['wide', 'blue', 'margin-bottom']} disabled={isFetching} loading={isFetching}>
        Login
      </Button>
      {emailOrPasswordInvalid && <FormErrorMessage serverError="email or password is invalid" />}
      <div className={classes['sing-up']}>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </div>
    </form>
  );
}

SingInForm.propTypes = {
  singIn: PropTypes.func.isRequired,
  isLoggin: PropTypes.bool.isRequired,
  history: PropTypes.func.isRequired,
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
