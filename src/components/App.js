// Dependencies
import React, {Component} from 'react';
import '../App.css';
import {connect} from 'react-redux';
import Login from './Login';
import Loading from './Loading';
import Main from './Main';
import {Link} from 'react-router-dom';

class AppConnected extends Component {
  render() {
    console.log(this.props.isLogin);
    return (
        <Main>
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
        </Main>
    );
  }
}

const App = connect(state => ({
  isLogin: state.auth.isLogin,
  isLoading: state.auth.isAuthenticating
}))(AppConnected);

export default App;
