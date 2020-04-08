import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/auth';

const auth = (props) => {
  const { building, authRedirectPath, onSetAuthRedirectPath } = props;
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email Address',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touching: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touching: false,
    },
  });
  const [formValid, setFormValid] = useState(false);
  const [isSignup, setIsSignup] = useState(true);

  useEffect(() => {
    if (!props.building && props.authRedirectPath !== '/') {
      props.onSetAuthRedirectPath();
    }
  }, [building, authRedirectPath, onSetAuthRedirectPath]);
  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  const switchToLoginHandler = () => {
    setIsSignup((prevState) => !prevState);
  };
  const signUpHandler = (event) => {
    event.preventDefault();

    const controlsCopy = { ...controls };

    const controlsEdit = Object.keys(controls).reduce(
      (acc, key) => ({ ...acc, [key]: controlsCopy[key].value }),
      {}
    );
    props.auth(controlsEdit.email, controlsEdit.password, isSignup);
  };

  const changeHandler = (event) => {
    const controlsCopy = { ...controls };
    const values = {
      ...controlsCopy[event.target.name],
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        controls[event.target.name].validation
      ),
      touching: true,
    };
    const controlsUpdate = { ...controlsCopy, [event.target.name]: values };
    let isValid = true;
    for (let key in controlsUpdate) {
      isValid = controlsUpdate[key].valid && isValid;
    }
    setControls(controlsUpdate);
    setFormValid(isValid);
  };

  let form = (
    <form onSubmit={signUpHandler}>
      {Object.keys(controls).map((key) => {
        return (
          <Input
            key={key}
            name={key}
            value={controls[key].value}
            elementType={controls[key].elementType}
            elementConfig={controls[key].elementConfig}
            change={changeHandler}
            invalid={!controls[key].valid}
            touched={controls[key].touching}
          />
        );
      })}
      <Button btnType={!formValid ? 'Danger' : 'Success'} disabled={!formValid}>
        {!isSignup ? 'LOGIN' : 'SIGN UP'}
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error}</p>;
  }
  let authRedirect = null;
  if (props.isAuth) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }
  return (
    <div className={classes.Auth}>
      <h4> Enter your {!isSignup ? 'LOGIN' : 'SIGN UP'} Data</h4>
      {errorMessage}
      {form}
      {authRedirect}
      <Button btnType="Success" clicked={switchToLoginHandler}>
        Switch to {isSignup ? 'LOGIN' : 'SIGN UP'}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.auth.token ? true : false,
    building: state.burBuild.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
