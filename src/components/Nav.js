import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';

const Nav = (props) => <nav className={props.className}>
  <Link to="/">Home</Link>
  <Link to="/my-profile">Profile</Link>
  <Link to="/logout">Logout</Link>
</nav>;

export default connect(state => ({
  id: state.auth.user.login.uuid
}))(styled(Nav)`
  & a {
    color: white;
    font-size: 1.5rem;
    padding: 0 1rem;
  
    &:hover{
      text-decoration: underline;
      color: white;
    }
  }
`);