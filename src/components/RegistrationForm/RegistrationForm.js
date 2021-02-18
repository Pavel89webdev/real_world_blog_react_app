import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import Button from '../Button';
import FormErrorMessage from '../FormErrorMessage';

import actionsCreators from '../../services/actionsCreators';

import classes from './RegistrationForm.module.sass';

//  переделать все так чтобы ошбки приходили как пропсы из стора!

function RegistrationForm({ singUp, userNameError, emailError, passwordError, isFetching, isLoggin, history }) {
  const [userName, setUserName] = useState('');
  const [inValidUserName, setInvalidUserName] = useState(false);
  const [email, setEmail] = useState('');
  const [currentPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(true);

  const { register, handleSubmit } = useForm();

  if (isLoggin) {
    history.push('/articles/page/1');
  }

  const onSubmit = (data) => {
    if (!checkConfirmPassword || inValidUserName) return;
    const newUserObj = {
      username: data.userName,
      email: data.email,
      password: data.password,
    };
    singUp(newUserObj);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>Create new account</div>
      <div className={classes['input-title']}>Username</div>
      <input
        name="userName"
        type="text"
        minLength="3"
        maxLength="20"
        required
        onInput={(e) => {
          const { value } = e.target;
          setUserName(value);
          setInvalidUserName(value.length < 3 || value.length > 20);
        }}
        value={userName}
        className={classNames(classes.input, inValidUserName ? classes['input-invalid'] : null)}
        placeholder="Username"
        ref={register}
      />
      {inValidUserName && <FormErrorMessage serverError="username must be from 3 to 20 letters" />}
      {!inValidUserName && <FormErrorMessage serverError={userNameError} />}

      <div className={classes['input-title']}>Email address</div>
      <input
        name="email"
        type="email"
        required
        className={classes.input}
        placeholder="Email adress"
        onInput={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        ref={register}
      />
      <FormErrorMessage serverError={emailError} />

      <div className={classes['input-title']}>Password</div>
      <input
        name="password"
        type="password"
        minLength="8"
        maxLength="40"
        required
        onInput={(e) => {
          setPassword(e.target.value);
        }}
        value={currentPassword}
        className={classes.input}
        placeholder="Password"
        ref={register}
      />
      <FormErrorMessage serverError={passwordError} />

      <div className={classes['input-title']}>Repeat Password</div>
      <input
        name="confirm-password"
        type="password"
        required
        onInput={(e) => {
          setConfirmPassword(e.target.value);
          setCheckConfirmPassword(e.target.value === currentPassword);
        }}
        value={confirmPassword}
        className={classes.input}
        placeholder="Repeat Password"
      />
      {!checkConfirmPassword && <FormErrorMessage serverError="passwords are different" />}

      <hr />
      <label className={classes['checkbox-label']}>
        <input name="personal-data-agreement" className={classes.checkbox} type="checkbox" ref={register} required />
        <div className={classes['custom-checkbox']} />
        <p>I agree to the processing of my personal information</p>
      </label>

      <Button submit style={['wide', 'blue', 'margin-bottom']} disabled={isFetching} loading={isFetching}>
        Create
      </Button>
      <div className={classes['sing-in']}>
        Already have an account? <Link to="/sing-in">Sign In.</Link>
      </div>
    </form>
  );
}

RegistrationForm.propTypes = {
  singUp: PropTypes.func.isRequired,
  userNameError: PropTypes.string,
  emailError: PropTypes.string,
  passwordError: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  isLoggin: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

RegistrationForm.defaultProps = {
  userNameError: '',
  emailError: '',
  passwordError: '',
  isLoggin: false,
};

const mapStateToProps = (state) => {
  const { user } = state;
  const props = {
    isFetching: state.isFetching,
    isLoggin: user.isLoggin,
  };
  if (user.errors) {
    if (user.errors.username) props.userNameError = '' || user.errors.username[0];
    if (user.errors.email) props.emailError = '' || user.errors.email[0];
    if (user.errors.password) props.passwordError = '' || user.errors.password[0];
  }

  return props;
};

const mapDispatchToProps = (dispatch) => ({
  singUp: (user) => actionsCreators.singUp(dispatch, user),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm));
