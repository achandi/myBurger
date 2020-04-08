import React, { useState } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const layout = (props) => {
  const [showSideDrawer, showSideDrawerToggle] = useState(false);
  const SideDrawerOpenHandler = () => {
    showSideDrawerToggle(true);
  };
  const SideDrawerClosedHandler = () => {
    showSideDrawerToggle(false);
  };
  return (
    <Aux>
      <Toolbar isAuth={props.isAuth} openBtn={SideDrawerOpenHandler} />
      <SideDrawer
        isAuth={props.isAuth}
        open={showSideDrawer}
        closed={SideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.auth.token ? true : false,
  };
};

export default connect(mapStateToProps)(layout);
