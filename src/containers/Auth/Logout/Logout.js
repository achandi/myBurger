import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/auth';

const logout = (props) => {
  const { onLogout } = props;
  useEffect(() => {
    props.onLogout();
  }, [onLogout]);
  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logOut()),
  };
};
export default connect(null, mapDispatchToProps)(logout);
