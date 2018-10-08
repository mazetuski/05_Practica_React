import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
         props.isLogin ?
            <Component {...props} /> : <Redirect to={{ pathname: '/login'}} />
    )} />
);

export default connect( state => ({
  isLogin: state.auth.isLogin
}))(ProtectedRoute);