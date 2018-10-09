import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Nav = (props) => <nav>
  <Link to="/">Home</Link>
  <Link to="/my-profile">Profile</Link>
  <Link to="/logout">Logout</Link>
</nav>;

export default connect(state => ({
  id: state.auth.user.login.uuid
}))(Nav);