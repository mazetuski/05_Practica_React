import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  return <Route {...rest} render={(props) => (
      rest.isLogin ?
          <Component {...props} /> : <Redirect to={{pathname: '/'}}/>
  )}/>
};

export default connect(state => ({
  isLogin: state.auth.isLogin
}))(PrivateRoute);