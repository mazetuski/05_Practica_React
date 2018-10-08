import React from 'react';
import Header from './Header';

export default (props) =>
    <div className='App'>
      <Header />
      {props.children}
    </div>