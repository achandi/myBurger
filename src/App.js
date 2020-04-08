import React, { useEffect, Suspense } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/CheckOut/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/auth';
// import asyncComponent from './hoc/asyncComponent';

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});
const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});
const Checkout = React.lazy(() => {
  return import('./containers/CheckOut/Checkout');
});

const app = (props) => {
  const { authCheckState } = props;
  useEffect(() => {
    props.authCheckState();
  }, [authCheckState]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route exact path="/" component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route exact path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    authCheckState: () => dispatch(authCheckState()),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.auth.token ? true : false,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
