// Dependencies
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import Login from './components/Login';
import Loading from './components/Loading';

class AppConnected extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
          </header>
          {
            // Show loading if is not login and is loading
            !this.props.isLogin && this.props.isLoading &&
            <Loading/>
          }
          {
            // Show login if not auth and not loading
            !this.props.isLogin && !this.props.isLoading &&
            <Login/>
          }
        </div>
    );
  }
}

const App = connect(state => ({
  isLogin: state.auth.isLogin,
  isLoading: state.auth.isAuthenticating
}))(AppConnected);

export default App;
