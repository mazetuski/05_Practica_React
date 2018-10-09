import React from 'react';
import {Link} from 'react-router-dom';

export default (props) =>
    <Link to={"/profile/"+props.id}>
      <img src={props.image} alt=""/>
      <p>{props.name}</p>
    </Link>;