import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Button from '../Button';
import { EmailInput, PasswordInput, UsernameInput, Checkbox, ConfirmPasswordInput } from '../formInputs/formInputs';

import actionsCreators from '../../services/actionsCreators';

import classes from './RegistrationForm.module.sass';

//  переделать все так чтобы ошбки приходили как пропсы из стора!

function RegistrationForm({ singUp, userNameError, emailError, passwordError, isFetching, isLoggin, history }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(false);

  const { register, handleSubmit } = useForm();

  if (isLoggin) {
    history.push('/articles/page/1');
  }

  const onSubmit = (data) => {
    if (!confirmPassword) return;
    const newUserObj = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    singUp(newUserObj);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.title}>Create new account</div>
      <div className={classes['input-title']}>Username</div>
      <UsernameInput ref={register} required errorMessage={userNameError} />

      <div className={classes['input-title']}>Email address</div>
      <EmailInput ref={register} required errorMessage={emailError} />
      <div className={classes['input-title']}>Password</div>
      <PasswordInput
        ref={register}
        required
        errorMessage={passwordError}
        setPassword={setPassword}
        password={password}
      />
      <div className={classes['input-title']}>Confirm password</div>
      <ConfirmPasswordInput required password={password} setConfirmPassword={setConfirmPassword} />

      <hr />
      <Checkbox description="I agree to the processing of my personal information" required />

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
