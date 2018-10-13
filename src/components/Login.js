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
        <h3>Para loguearte usa una cuenta de <a href="https://randomuser.me/api?results=20&seed=abc" target="_blank">aquí</a></h3>
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
    </div>
  }
}

export default connect(state => ({
  isLogin: state.auth.isLogin,
}), dispatch => ({
  auth: (username, password) => dispatch(authByApi(username, password)),
}))(styled(ConnectedLogin)`
  min-height: 60vh;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  
  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 95%;
    
    & > div > label {
      display: block;
    }
    
    & div, & label, & input, & button{
      width: 100%;
    }
    
    @media only screen and (min-width: 900px){
      width: 50%;
    }
    
    @media only screen and (min-width: 1200px){
      width: 30%;
    }
  }
`);