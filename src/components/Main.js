import React from 'react';
import Header from './Header';
import styled from 'styled-components';

const Main = (props) =>
    <div className={props.className + ' App'}>
      <Header />
      {props.children}
    </div>;

export default styled(Main)`
  input, textarea {
    border: 1px solid black;
    border-radius: 0;
    background-color: white;
    padding: .3rem 0;
    margin: .2rem 0;
  }
  
  label {
    margin-top: 1.5rem;
  }
  
  button{
    border: none;
    background-color: #222;
    color: white;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    margin: 1.5rem 0;
    cursor: pointer;
    
    &:hover{
      background-color: #3c3b3b;
    }
  }
`;