import React from 'react';
import Nav from './Nav';
import {connect} from 'react-redux';

const Header = (props) =>
    <header className="App-header">
      <h1>Miguel Ángel Zamora Blanco</h1>
      <h2 className="App-title">Practica 5</h2>
      {props.isLogin && <Nav/>}
    </header>;

export default connect(state => ({
  isLogin: state.auth.isLogin,
}))(Header);