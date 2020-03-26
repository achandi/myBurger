import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/CheckOut/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/auth';
import asyncComponent from './hoc/asyncComponent';

const asyncAuthComp = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});
const asyncOrdersComp = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const asyncCheckoutComp = asyncComponent(() => {
  return import('./containers/CheckOut/Checkout');
});

class App extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuthComp} />
        <Route exact path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/auth" component={asyncAuthComp} />
          <Route path="/checkout" component={asyncCheckoutComp} />
          <Route path="/orders" component={asyncOrdersComp} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={BurgerBuilder} />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch(authCheckState())
  };
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.auth.token ? true : false
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
