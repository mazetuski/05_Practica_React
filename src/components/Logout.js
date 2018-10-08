import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logoutUser} from "../actions";

class Logout extends Component{
  componentWillMount(){
    this.props.logout();

  }
  render(){
    return <div>
      {
        this.props.isLogin
            ? <p>Saliendo de la cuenta...</p>
            : <Redirect to={{ pathname: '/'}} />
      }
    </div>
  }
}

export default connect(state => ({
  isLogin: state.auth.isLogin
}), dispatch => ({
  logout: () => dispatch(logoutUser)
}))(Logout);