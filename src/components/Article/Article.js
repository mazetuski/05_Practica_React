import React from 'react';
import styled from 'styled-components';

const Article = (props) => <div className={props.className}>
  <h3>{props.title}</h3>
  <p>{props.description}</p>
</div>;

export default styled(Article)`
  box-shadow: 0 3px 5px darkgrey;
    padding: 2rem;
    flex: 0 0 95%;
    margin: 5px;
    box-sizing: border-box;
    
    @media only screen and (min-width: 900px){
      flex: 0 0 30%;
    }
    
    @media only screen and (min-width: 1200px){
      flex: 0 0 23%;
    }
`;