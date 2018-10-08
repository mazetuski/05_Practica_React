// Dependencies
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import Login from './components/Login';
import Loading from './components/Loading';
import {Link} from 'react-router-dom';

class AppConnected extends Component {
  render() {
    console.log(this.props.isLogin);
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
          </header>
          {
            // Show loading if is not login and is loading
            !this.props.isLogin && this.props.isLoading
            && <Loading/>
          }
          {
            // Show login if not auth and not loading
            !this.props.isLogin && !this.props.isLoading &&
            <Login/>
          }
          {
            this.props.isLogin && <Link to="/logout">Logout</Link>
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
