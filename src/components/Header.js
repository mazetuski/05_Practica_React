import React from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Header = (props) =>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h1 className="App-title">Welcome to React</h1>
      {props.isLogin && <Link to="/logout">Logout</Link>}
    </header>;

export default connect(state => ({
  isLogin: state.auth.isLogin
}))(Header);