import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/auth';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touching: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touching: false
      }
    },
    isSignup: true
  };
  checkValidity = (value, rules) => {
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

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  switchToLoginHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };
  signUpHandler = event => {
    event.preventDefault();

    console.log('price', this.props);

    const controls = { ...this.state.controls };

    const controlsEdit = Object.keys(controls).reduce(
      (acc, key) => ({ ...acc, [key]: controls[key].value }),
      {}
    );

    this.props.auth(
      controlsEdit.email,
      controlsEdit.password,
      this.state.isSignup
    );

    console.log(this.props);
  };

  changeHandler = event => {
    const controls = { ...this.state.controls };
    const values = {
      ...controls[event.target.name],
      value: event.target.value,
      valid: this.checkValidity(
        event.target.value,
        controls[event.target.name].validation
      ),
      touching: true
    };
    const controlsUpdate = { ...controls, [event.target.name]: values };
    let isValid = true;
    for (let key in controlsUpdate) {
      isValid = controlsUpdate[key].valid && isValid;
    }

    this.setState({ controls: controlsUpdate, formValid: isValid });
  };

  render() {
    let form = (
      <form onSubmit={this.signUpHandler}>
        {Object.keys(this.state.controls).map(key => {
          return (
            <Input
              key={key}
              name={key}
              value={this.state.controls[key].value}
              elementType={this.state.controls[key].elementType}
              elementConfig={this.state.controls[key].elementConfig}
              change={this.changeHandler}
              invalid={!this.state.controls[key].valid}
              touched={this.state.controls[key].touching}
            />
          );
        })}
        <Button
          btnType={!this.state.formValid ? 'Danger' : 'Success'}
          disabled={!this.state.formValid}
        >
          {!this.state.isSignup ? 'LOGIN' : 'SIGN UP'}
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }
    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        <h4> Enter your {!this.state.isSignup ? 'LOGIN' : 'SIGN UP'} Data</h4>
        {errorMessage}
        {form}
        {authRedirect}
        <Button btnType="Success" clicked={this.switchToLoginHandler}>
          Switch to {this.state.isSignup ? 'LOGIN' : 'SIGN UP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.auth.token ? true : false,
    building: state.burBuild.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
