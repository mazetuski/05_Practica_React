//Dependencies
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authByApi} from "../actions";
import styled from 'styled-components';

class ConnectedLogin extends Component {
  state = {
    username: '',
    password: ''
  };

  handleInput = (event) => {
    this.setState({[event.target.id]: event.target.value});
  };

  handleSubmit = () => {
    this.props.auth(this.state.username, this.state.password)
  };

  render() {
    return <div className={this.props.className}>
      <div>
        <label htmlFor="">Username</label>
        <input type="text" id='username' value={this.state.username} onChange={this.handleInput}/>
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input type="password" id='password' value={this.state.password} onChange={this.handleInput}/>
      </div>
      <button onClick={this.handleSubmit}>Sign in</button>
    </div>
  }
}

export default connect(state => ({
  isLogin: state.auth.isLogin,
}), dispatch => ({
  auth: (username, password) => dispatch(authByApi(username, password)),
}))(styled(ConnectedLogin)`
  min-height: 80vh;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  & div {
    flex: 0 0 100%;
  }
`);